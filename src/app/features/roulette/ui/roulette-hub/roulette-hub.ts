import { Component, input } from '@angular/core';
import { BikeRoute } from '../../../../core/models/bike-route';
import { LottiePlayer } from '../../../../shared/components/lottie-player/lottie-player';

@Component({
  selector: 'app-roulette-hub',
  imports: [LottiePlayer],
  templateUrl: './roulette-hub.html',
  styleUrl: './roulette-hub.scss',
})
export class RouletteHub {
  readonly route = input<BikeRoute | null>(null);
  readonly spinning = input(false);
  readonly hasRoutes = input(false);
}
