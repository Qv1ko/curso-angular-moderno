import { Component, output, OutputEmitterRef } from '@angular/core';

type Acceptance = 'essentials' | 'all';

@Component({
  selector: 'qv1-cookies',
  imports: [],
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.css',
})
export class CookiesComponent {
  cancel: OutputEmitterRef<void> = output();
  accept: OutputEmitterRef<Acceptance> = output();
}
