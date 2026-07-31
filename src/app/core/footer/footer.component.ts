import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'qv1-footer',
  imports: [DatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  author = {
    nickname: 'Qv1ko',
    github: 'https://github.com/Qv1ko',
  };

  today = new Date();

  cookiesAccepted = signal(false);

  onCookiesAccepted() {
    this.cookiesAccepted.set(true);
  }
}
