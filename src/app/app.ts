import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'qv1-root',
  imports: [RouterOutlet],
  template: `
    <h1>Hello, {{ title() }}</h1>

    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('ActivityBookings');
}
