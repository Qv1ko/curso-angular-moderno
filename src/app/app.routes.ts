import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./bookings/bookings.page'),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./routes/auth/login/login.page'),
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./routes/auth/register/register.page'),
  },
];
