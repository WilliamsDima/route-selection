import { Component, computed, input, OnDestroy, signal } from '@angular/core';
import { BikeRoute } from '../../../../core/models/bike-route';
import { Button } from '../../../../shared/components/button/button';
import { RouletteSegment } from '../roulette-segment/roulette-segment';
import { RouletteHub } from '../roulette-hub/roulette-hub';
import {
  ACTIVE_SCALE,
  SPIN_DURATION_MS,
  buildSegments,
  computeSpinTarget,
  indexUnderPointer,
  labelFontSize,
} from '../wheel.util';

@Component({
  selector: 'app-roulette-wheel',
  imports: [Button, RouletteSegment, RouletteHub],
  templateUrl: './roulette-wheel.html',
  styleUrl: './roulette-wheel.scss',
})
export class RouletteWheel implements OnDestroy {
  readonly routes = input<BikeRoute[]>([]);

  protected readonly rotation = signal(0);
  protected readonly spinning = signal(false);
  protected readonly selected = signal<BikeRoute | null>(null);
  protected readonly activeIndex = signal(-1);

  protected readonly scale = ACTIVE_SCALE;

  private rafId = 0;

  protected readonly fontSize = computed(() => labelFontSize(this.routes().length));
  protected readonly segments = computed(() => buildSegments(this.routes()));

  protected readonly activeSegment = computed(() => {
    const i = this.activeIndex();
    const segs = this.segments();
    return i >= 0 && i < segs.length ? segs[i] : null;
  });

  spin(): void {
    const routes = this.routes();
    if (this.spinning() || routes.length === 0) return;

    const winner = Math.floor(Math.random() * routes.length);
    const from = this.rotation();
    const to = computeSpinTarget(from, winner, routes.length);

    this.selected.set(null);
    this.spinning.set(true);

    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - start) / SPIN_DURATION_MS, 1);
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
        this.selected.set(routes[winner]);
      }
    };
    this.rafId = requestAnimationFrame(animate);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }
}
