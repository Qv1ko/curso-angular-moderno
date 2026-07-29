import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Bookings } from './bookings/bookings';
import { Footer } from './core/footer/footer';
import { Header } from './core/header/header';

@Component({
  selector: 'qv1-root',
  imports: [RouterOutlet, Header, Footer, Bookings],
  template: `
    <qv1-header />
    <qv1-bookings />

    <router-outlet />
    <qv1-footer />
  `,
  styles: [],
})
export class App {}
