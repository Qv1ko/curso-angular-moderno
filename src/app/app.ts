import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterWidget } from './core/footer/footer.widget';
import { HeaderComponent } from './core/header/header.component';

@Component({
  selector: 'qv1-root',
  imports: [RouterOutlet, HeaderComponent, FooterWidget],
  template: `
    <qv1-header />
    <router-outlet />
    <qv1-footer />
  `,
  styles: [],
})
export class App {}
