import { Component, inject } from '@angular/core';
import { RouteFacade, RoutesPanel } from '../../routes';
import { RouletteWheel } from '../ui/roulette-wheel/roulette-wheel';

@Component({
  selector: 'app-roulette-page',
  imports: [RouletteWheel, RoutesPanel],
  templateUrl: './roulette-page.html',
  styleUrl: './roulette-page.scss',
})
export class RoulettePage {
  private readonly facade = inject(RouteFacade);

  protected readonly routes = this.facade.filteredRoutes;
}
