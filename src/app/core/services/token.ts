// имитирую существование бэкэнда
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly _token = signal<string | null>(null);
  readonly token = this._token.asReadonly();

  setToken(value: string): void {
    this._token.set(value);
  }

  clear(): void {
    this._token.set(null);
  }
}
