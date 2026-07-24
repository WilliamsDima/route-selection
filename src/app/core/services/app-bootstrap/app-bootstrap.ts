import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoaderService } from '../loader/loader';
import { RouteService } from '../route/route';

const MIN_BOOTSTRAP_DISPLAY_MS = 1200;

@Injectable({
  providedIn: 'root',
})
export class AppBootstrap {
  private readonly loader = inject(LoaderService);
  private readonly routeService = inject(RouteService);
  private readonly _error = signal<string | null>(null);

  readonly error = this._error.asReadonly();

  async init(): Promise<void> {
    this.loader.show();

    const minDisplayTime = new Promise((resolve) => setTimeout(resolve, MIN_BOOTSTRAP_DISPLAY_MS));

    try {
      await Promise.all([firstValueFrom(this.routeService.getRoutes())]);
    } catch (error) {
      this._error.set('Не удалось загрузить данные. Обновите страницу.');
      console.error('Ошибка инициализации:', error);
    } finally {
      await minDisplayTime;
      this.loader.hide();
    }
  }
}
