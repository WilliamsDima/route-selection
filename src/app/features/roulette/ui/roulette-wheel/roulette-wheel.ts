import { Component, computed, effect, inject, input, OnDestroy, signal } from '@angular/core';
import { BikeRoute } from '../../../../core/models/bike-route';
import { RouteFacade } from '../../../routes';
import { Button } from '../../../../shared/components/button/button';
import { RouletteSegment } from '../roulette-segment/roulette-segment';
import { RouletteHub } from '../roulette-hub/roulette-hub';
import { RouteMap } from '../route-map/route-map';
import { LottiePlayer } from '../../../../shared/components/lottie-player/lottie-player';
import {
  ACTIVE_SCALE,
  DEFAULT_SPIN_DURATION_MS,
  MAX_SPIN_DURATION_MS,
  MIN_SPIN_DURATION_MS,
  buildSegments,
  computeSpinTarget,
  indexUnderPointer,
  labelFontSize,
  resolveLabelRotation,
} from '../wheel.util';

@Component({
  selector: 'app-roulette-wheel',
  imports: [Button, RouletteSegment, RouletteHub, RouteMap, LottiePlayer],
  templateUrl: './roulette-wheel.html',
  styleUrl: './roulette-wheel.scss',
})
export class RouletteWheel implements OnDestroy {
  private readonly facade = inject(RouteFacade);

  readonly routes = input<BikeRoute[]>([]);

  protected readonly rotation = signal(0);
  protected readonly spinning = signal(false);
  protected readonly selected = this.facade.selectedRoute;
  protected readonly activeIndex = signal(-1);
  protected readonly spinDurationMs = signal(DEFAULT_SPIN_DURATION_MS);
  protected readonly showCongrats = signal(false);

  private lastCelebratedRouteId: number | null = null;

  protected readonly scale = ACTIVE_SCALE;
  protected readonly minSpinDurationSec = MIN_SPIN_DURATION_MS / 1000;
  protected readonly maxSpinDurationSec = MAX_SPIN_DURATION_MS / 1000;

  private rafId = 0;

  protected readonly fontSize = computed(() => labelFontSize(this.routes().length));
  protected readonly segments = computed(() => buildSegments(this.routes()));

  protected readonly renderSegments = computed(() => {
    const rotation = this.rotation();
    return this.segments().map((s) => ({
      ...s,
      labelRotation: resolveLabelRotation(s.mid, rotation),
    }));
  });

  protected readonly activeSegment = computed(() => {
    const i = this.activeIndex();
    const segs = this.renderSegments();
    return i >= 0 && i < segs.length ? segs[i] : null;
  });

  protected readonly spinDurationSec = computed(() => this.spinDurationMs() / 1000);

  constructor() {
    effect(() => {
      const route = this.selected();
      if (this.spinning() || !route) return;

      const idx = this.routes().findIndex((r) => r.id === route.id);
      if (idx !== -1) this.activeIndex.set(idx);

      if (route.id !== this.lastCelebratedRouteId) {
        this.lastCelebratedRouteId = route.id;
        this.showCongrats.set(true);
      }
    });

    effect(() => {
      if (this.spinning()) this.showCongrats.set(false);
    });
  }

  onCongratsComplete(): void {
    this.showCongrats.set(false);
  }

  onDurationInput(event: Event): void {
    const seconds = (event.target as HTMLInputElement).valueAsNumber;
    const clamped = Math.min(Math.max(seconds, this.minSpinDurationSec), this.maxSpinDurationSec);
    this.spinDurationMs.set(clamped * 1000);
  }

  spin(): void {
    const routes = this.routes();
    if (this.spinning() || routes.length === 0) return;

    const winner = Math.floor(Math.random() * routes.length);
    const from = this.rotation();
    const to = computeSpinTarget(from, winner, routes.length);

    this.facade.selectRoute(null);
    this.spinning.set(true);

    const durationMs = this.spinDurationMs();
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      const value = from + (to - from) * eased;

      this.rotation.set(value);
      this.activeIndex.set(indexUnderPointer(value, routes.length));

      if (t < 1) {
        this.rafId = requestAnimationFrame(animate);
      } else {
        this.rotation.set(to);
        this.activeIndex.set(winner);
        this.spinning.set(false);
        this.facade.selectRoute(routes[winner]);
      }
    };
    this.rafId = requestAnimationFrame(animate);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }
}
