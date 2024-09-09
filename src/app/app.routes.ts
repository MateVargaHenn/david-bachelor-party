import { Routes } from '@angular/router';
import { AppPage } from './_pages/app/app.page';
import { SplashScreenPage } from './_pages/splash-screen/splash-screen.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash-screen',
    pathMatch: 'full'
  },
  {
    path: 'splash-screen',
    component: SplashScreenPage
  },
  {
    path: 'app',
    component: AppPage
  },
];
