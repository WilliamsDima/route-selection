import { inject, Injectable } from '@angular/core';
import { RouteService } from '../../../core/services/route/route';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class RouteFacade {
  private readonly routeService = inject(RouteService);

  readonly routes = toSignal(this.routeService.getRoutes(), { initialValue: [] });
}
