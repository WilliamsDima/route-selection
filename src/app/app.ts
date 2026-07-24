import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from './shared/components/loader/loader';
import { AppBootstrap } from './core/services/app-bootstrap/app-bootstrap';
import { LoaderService } from './core/services/loader/loader';
import { LottiePlayer } from './shared/components/lottie-player/lottie-player';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loader, LottiePlayer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly loader = inject(LoaderService);
  private readonly bootstrap = inject(AppBootstrap);

  ngOnInit(): void {
    this.bootstrap.init();
  }
}
