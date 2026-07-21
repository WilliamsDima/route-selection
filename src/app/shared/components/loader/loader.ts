import { AfterViewInit, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';
import Lottie, { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader implements AfterViewInit, OnDestroy {
  readonly animationHost = viewChild.required<ElementRef<HTMLDivElement>>('animationHost');
  private animation?: AnimationItem;

  ngAfterViewInit(): void {
    this.animation = Lottie.loadAnimation({
      container: this.animationHost().nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'animations/paws.json',
    });
  }

  ngOnDestroy(): void {
    this.animation?.destroy();
  }
}
