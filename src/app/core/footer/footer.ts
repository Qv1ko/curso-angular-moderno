import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'qv1-footer',
  imports: [DatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
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
