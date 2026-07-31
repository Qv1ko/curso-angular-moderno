import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';

@Component({
  selector: 'qv1-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <qv1-header />
    <router-outlet />
    <qv1-footer />
  `,
  styles: [],
})
export class App {}
