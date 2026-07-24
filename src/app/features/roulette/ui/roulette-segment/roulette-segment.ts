import { Component, input } from '@angular/core';
import { WheelSegment } from '../wheel-segment.model';

@Component({
  selector: '[appRouletteSegment]',
  imports: [],
  templateUrl: './roulette-segment.html',
  styleUrl: './roulette-segment.scss',
})
export class RouletteSegment {
  readonly segment = input.required<WheelSegment>();
}
