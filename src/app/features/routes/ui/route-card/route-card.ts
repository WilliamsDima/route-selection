import { Component, computed, input } from '@angular/core';
import { BikeRoute, BIKE_ROUTE_TYPE_LABELS } from '../../../../core/models/bike-route';

@Component({
  selector: 'app-route-card',
  imports: [],
  templateUrl: './route-card.html',
  styleUrl: './route-card.scss',
})
export class RouteCard {
  readonly route = input.required<BikeRoute>();
  readonly active = input(false);
  readonly disabled = input(false);

  protected readonly typeLabel = computed(() => BIKE_ROUTE_TYPE_LABELS[this.route().type]);
}
