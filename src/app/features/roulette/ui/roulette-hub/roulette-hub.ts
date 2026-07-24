import { Component, input } from '@angular/core';
import { BikeRoute } from '../../../../core/models/bike-route';

@Component({
  selector: 'app-roulette-hub',
  imports: [],
  templateUrl: './roulette-hub.html',
  styleUrl: './roulette-hub.scss',
})
export class RouletteHub {
  readonly route = input<BikeRoute | null>(null);
  readonly spinning = input(false);
  readonly hasRoutes = input(false);
}
