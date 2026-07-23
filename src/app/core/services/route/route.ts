import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { ApiService } from '../api';
import { BikeRoute } from '../../models/bike-route';
import { API_PATHS } from '../../constants/api-paths';

@Injectable({ providedIn: 'root' })
export class RouteService {
  private readonly api = inject(ApiService);

  private readonly routes$ = this.api.get<BikeRoute[]>(API_PATHS.routes).pipe(shareReplay(1));

  getRoutes(): Observable<BikeRoute[]> {
    return this.routes$;
  }
}
