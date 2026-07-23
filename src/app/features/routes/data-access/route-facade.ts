import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouteService } from '../../../core/services/route/route';
import { BikeRouteType } from '../../../core/models/bike-route';

export type TypeFilter = BikeRouteType | 'all';
export type SortDirection = 'asc' | 'desc';

@Injectable({ providedIn: 'root' })
export class RouteFacade {
  private readonly routeService = inject(RouteService);

  readonly routes = toSignal(this.routeService.getRoutes(), { initialValue: [] });

  private readonly _search = signal('');
  readonly search = this._search.asReadonly();

  private readonly _typeFilter = signal<TypeFilter>('all');
  readonly typeFilter = this._typeFilter.asReadonly();

  private readonly _sortDir = signal<SortDirection>('asc');
  readonly sortDir = this._sortDir.asReadonly();

  readonly filteredRoutes = computed(() => {
    const term = this._search().trim().toLowerCase();
    const type = this._typeFilter();
    const dir = this._sortDir();

    return this.routes()
      .filter((route) => type === 'all' || route.type === type)
      .filter((route) => route.name.toLowerCase().includes(term))
      .sort((a, b) => (dir === 'asc' ? a.distKm - b.distKm : b.distKm - a.distKm));
  });

  setSearch(value: string): void {
    this._search.set(value);
  }

  setTypeFilter(type: TypeFilter): void {
    this._typeFilter.set(type);
  }

  toggleSort(): void {
    this._sortDir.update((dir) => (dir === 'asc' ? 'desc' : 'asc'));
  }
}
