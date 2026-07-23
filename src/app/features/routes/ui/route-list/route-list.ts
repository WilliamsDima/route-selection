import { Component, input } from '@angular/core';
import { BikeRoute } from '../../../../core/models/bike-route';
import { RouteCard } from '../route-card/route-card';

@Component({
  selector: 'app-route-list',
  imports: [RouteCard],
  templateUrl: './route-list.html',
  styleUrl: './route-list.scss',
})
export class RouteList {
  readonly routes = input<BikeRoute[]>([]);
}
