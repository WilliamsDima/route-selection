import { Component } from '@angular/core';
import { LottiePlayer } from '../lottie-player/lottie-player';

@Component({
  selector: 'app-loader',
  imports: [LottiePlayer],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {}
