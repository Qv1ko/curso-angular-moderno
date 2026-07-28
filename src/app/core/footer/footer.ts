import { Component } from '@angular/core';

@Component({
  selector: 'qv1-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  author = {
    nickname: 'Qv1ko',
    github: 'https://github.com/Qv1ko',
  };

  year = new Date().getFullYear();

  onCookiesAccepted() {
    console.info('Cookies accepted');
  }
}
