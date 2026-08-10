import { DatePipe } from '@angular/common';
import { Component, effect, inject, signal, WritableSignal } from '@angular/core';

import { LocalRepository } from '../../services/local.repository';
import { CookiesComponent } from '../cookies/cookies.component';

type CookiesStatus = 'pending' | 'rejected' | 'essentials' | 'all';

@Component({
  selector: 'qv1-footer',
  imports: [DatePipe, CookiesComponent],
  templateUrl: './footer.widget.html',
  styleUrl: './footer.widget.css',
})
export class FooterWidget {
  localRepository: LocalRepository = inject(LocalRepository);

  readonly author = {
    nickname: 'Qv1ko',
    github: 'https://github.com/Qv1ko',
  };

  today = new Date();

  cookiesStatus: WritableSignal<CookiesStatus> = signal<CookiesStatus>(
    this.localRepository.load('cookies', { status: 'pending' }).status as CookiesStatus,
  );

  onCookiesAccepted = effect(() =>
    this.localRepository.save('cookies', { status: this.cookiesStatus() }),
  );
}
