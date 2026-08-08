import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { Activity, NULL_ACTIVITY } from '../../domain/activity.type';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

@Component({
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  private httpClient$: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = 'http://localhost:3000/activities';
  readonly activities: Signal<Activity[]> = toSignal(
    this.httpClient$.get<Activity[]>(this.apiUrl)
      .pipe(catchError((_) => of([]))),
    { initialValue: [] }
  );

  #title = inject(Title);
  #meta = inject(Meta);

  constructor() {
    this.#title.setTitle('Activities to book');
    this.#meta.updateTag({ name: 'description', content: 'Book your favorite activities' });
  }
}
