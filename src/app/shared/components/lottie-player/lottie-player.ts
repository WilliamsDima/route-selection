import { AfterViewInit, Component, ElementRef, input, OnDestroy, viewChild } from '@angular/core';
import { LOTTIE_ANIMATIONS, LottieAnimation } from './lottie-animations';
import Lottie, { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-lottie-player',
  imports: [],
  templateUrl: './lottie-player.html',
  styleUrl: './lottie-player.scss',
})
export class LottiePlayer implements AfterViewInit, OnDestroy {
  readonly name = input.required<LottieAnimation>();
  readonly loop = input(true);
  readonly autoplay = input(true);

  readonly animationHost = viewChild.required<ElementRef<HTMLDivElement>>('animationHost');
  private animation?: AnimationItem;

  ngAfterViewInit(): void {
    this.animation = Lottie.loadAnimation({
      container: this.animationHost().nativeElement,
      renderer: 'svg',
      loop: this.loop(),
      autoplay: this.autoplay(),
      path: `animations/${LOTTIE_ANIMATIONS[this.name()]}`,
    });
  }

  ngOnDestroy(): void {
    this.animation?.destroy();
  }
}
