import { Component } from '@angular/core';
import { RoutesPanel } from '../../routes';
import { RouletteWheel } from '../ui/roulette-wheel/roulette-wheel';

@Component({
  selector: 'app-roulette-page',
  imports: [RouletteWheel, RoutesPanel],
  templateUrl: './roulette-page.html',
  styleUrl: './roulette-page.scss',
})
export class RoulettePage {}
