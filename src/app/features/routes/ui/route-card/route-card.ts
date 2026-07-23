import { Component, computed, input } from '@angular/core';
import { BikeRoute, BikeRouteType } from '../../../../core/models/bike-route';

const TYPE_LABELS: Record<BikeRouteType, string> = {
  short: 'Короткий',
  long: 'Длинный',
  big: 'Большой',
};

@Component({
  selector: 'app-route-card',
  imports: [],
  templateUrl: './route-card.html',
  styleUrl: './route-card.scss',
})
export class RouteCard {
  readonly route = input.required<BikeRoute>();

  protected readonly typeLabel = computed(() => TYPE_LABELS[this.route().type]);
}
