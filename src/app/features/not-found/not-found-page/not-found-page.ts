import { Component } from '@angular/core';
import { LottiePlayer } from '../../../shared/components/lottie-player/lottie-player';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-not-found-page',
  imports: [LottiePlayer, Button],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
})
export class NotFoundPage {}
