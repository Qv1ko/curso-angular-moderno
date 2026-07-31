import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./bookings/bookings'),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./routes/auth/login'),
  },
];
