import { Component, input } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
})
export class SearchInput {
  readonly placeholder = input('');

  private readonly term$ = new Subject<string>();

  readonly search = outputFromObservable(
    this.term$.pipe(debounceTime(300), distinctUntilChanged()),
  );

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.term$.next(value);
  }
}
