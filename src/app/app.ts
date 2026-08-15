import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterWidget } from './core/footer/footer.widget';
import { HeaderWidget } from './core/header/header.widget';

@Component({
  selector: 'qv1-root',
  imports: [RouterOutlet, HeaderWidget, FooterWidget],
  template: `
    <qv1-header />
    <router-outlet />
    <qv1-footer />
  `,
  styles: [],
})
export class App {}
