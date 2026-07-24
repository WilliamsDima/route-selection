import { Component, computed, ElementRef, inject, input } from '@angular/core';
import { BikeRoute, BIKE_ROUTE_TYPE_LABELS } from '../../../../core/models/bike-route';

@Component({
  selector: 'app-route-card',
  imports: [],
  templateUrl: './route-card.html',
  styleUrl: './route-card.scss',
  host: {
    role: 'button',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.aria-pressed]': 'active()',
    '(keydown.enter)': 'activate($event)',
    '(keydown.space)': 'activate($event)',
  },
})
export class RouteCard {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly route = input.required<BikeRoute>();
  readonly active = input(false);
  readonly disabled = input(false);

  protected readonly typeLabel = computed(() => BIKE_ROUTE_TYPE_LABELS[this.route().type]);

  protected activate(event: Event): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.host.nativeElement.click();
  }
}
