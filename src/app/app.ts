import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/footer/footer';
import { Header } from './core/header/header';

@Component({
  selector: 'qv1-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <qv1-header />
    <p>Angular works!</p>

    <router-outlet />
    <qv1-footer />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('ActivityBookings');
}
