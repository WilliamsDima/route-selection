import { Component, computed, inject, signal } from '@angular/core';
import { BikeRoute } from '../../../core/models/bike-route';
import { RouteFacade, TypeFilter } from '../data-access/route-facade';
import { RouteList } from '../ui/route-list/route-list';
import { Chip } from '../../../shared/components/chip/chip';
import { SearchInput } from '../../../shared/components/search-input/search-input';

@Component({
  selector: 'app-routes-panel',
  imports: [RouteList, Chip, SearchInput],
  templateUrl: './routes-panel.html',
  styleUrl: './routes-panel.scss',
})
export class RoutesPanel {
  private readonly facade = inject(RouteFacade);

  protected readonly routes = this.facade.filteredRoutes;
  protected readonly search = this.facade.search;
  protected readonly activeType = this.facade.typeFilter;
  protected readonly sortDir = this.facade.sortDir;
  protected readonly spinning = this.facade.spinning;
  protected readonly count = computed(() => this.facade.filteredRoutes().length);
  protected readonly activeRouteId = computed(() => this.facade.selectedRoute()?.id ?? null);

  protected readonly expanded = signal(false);

  protected readonly typeButtons: ReadonlyArray<{ value: TypeFilter; label: string }> = [
    { value: 'all', label: 'Все' },
    { value: 'short', label: 'Короткие' },
    { value: 'long', label: 'Длинные' },
    { value: 'big', label: 'Большие' },
  ];

  toggle(): void {
    this.expanded.update((v) => !v);
  }

  onSearch(value: string): void {
    this.facade.setSearch(value);
  }

  selectType(type: TypeFilter): void {
    this.facade.setTypeFilter(type);
  }

  toggleSort(): void {
    this.facade.toggleSort();
  }

  selectRoute(route: BikeRoute): void {
    this.facade.selectRoute(route);
  }
}
