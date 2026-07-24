import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as L from 'leaflet';
import { TrackService } from '../../../../core/services/track';

@Component({
  selector: 'app-route-map',
  imports: [],
  templateUrl: './route-map.html',
  styleUrl: './route-map.scss',
})
export class RouteMap implements AfterViewInit, OnDestroy {
  readonly gpxFile = input.required<string>();

  private readonly trackService = inject(TrackService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = viewChild.required<ElementRef<HTMLDivElement>>('map');

  private map?: L.Map;
  private trackLine?: L.Polyline;
  private resizeObserver?: ResizeObserver;

  constructor() {
    effect(() => {
      const file = this.gpxFile();
      if (this.map) {
        this.loadTrack(file);
      }
    });
  }

  ngAfterViewInit(): void {
    this.map = L.map(this.host().nativeElement, {
      attributionControl: false,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
    }).setView([55, 37], 5);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      subdomains: 'abcd',
    }).addTo(this.map);

    this.resizeObserver = new ResizeObserver(() => {
      this.map?.invalidateSize();
      if (this.trackLine) {
        this.map?.fitBounds(this.trackLine.getBounds(), { padding: [8, 8] });
      }
    });
    this.resizeObserver.observe(this.host().nativeElement);

    this.loadTrack(this.gpxFile());
  }

  private loadTrack(file: string): void {
    this.trackService
      .getTrack(file)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((points) => {
        const map = this.map;
        if (!map || points.length === 0) return;

        this.trackLine?.remove();
        this.trackLine = L.polyline(points, { color: '#16a34a', weight: 4 }).addTo(map);

        map.invalidateSize();
        map.fitBounds(this.trackLine.getBounds(), { padding: [8, 8] });
      });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.map?.remove();
  }
}
