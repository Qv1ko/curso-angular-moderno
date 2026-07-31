import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./bookings/bookings').then((m) => m.Bookings),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./routes/auth/login').then((m) => m.Login),
  },
];
