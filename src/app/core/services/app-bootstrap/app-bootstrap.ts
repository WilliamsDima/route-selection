import { inject, Injectable, signal } from '@angular/core';
import { LoaderService } from '../loader/loader';

@Injectable({
  providedIn: 'root',
})
export class AppBootstrap {
  private readonly loader = inject(LoaderService);
  private readonly _error = signal<string | null>(null);

  readonly error = this._error.asReadonly();

  async init(): Promise<void> {
    this.loader.show();

    const minDisplayTime = new Promise((resolve) => setTimeout(resolve, 1200));

    try {
      await Promise.all([]);
    } catch (error) {
      this._error.set('Не удалось загрузить данные. Обновите страницу.');
      console.error('Ошибка инициализации:', error);
    } finally {
      await minDisplayTime;
      this.loader.hide();
    }
  }
}
