import { Component, computed, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonVariant } from './button-variant';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly link = input<string>();
  readonly type = input<'button' | 'submit'>('button');
  readonly disabled = input(false);

  protected readonly classes = computed(() => `btn btn--${this.variant()}`);
}
