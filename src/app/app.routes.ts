import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { RoulettePage } from './features/roulette/roulette-page/roulette-page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [{ path: '', component: RoulettePage }],
  },
];
