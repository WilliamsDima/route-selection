import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chip',
  imports: [],
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
  host: {
    '[class.chip-host--full]': 'fullWidth()',
  },
})
export class Chip {
  readonly active = input(false);
  readonly fullWidth = input(false);
}
