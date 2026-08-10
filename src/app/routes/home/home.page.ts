import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { catchError, of } from 'rxjs';

import { Activity } from '../../domain/activity.type';
import { ActivityComponent } from './activity/activity.component';

@Component({
  imports: [ActivityComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  private httpClient$: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = 'http://localhost:3000/activities';
  readonly activities: Signal<Activity[]> = toSignal(
    this.httpClient$.get<Activity[]>(this.apiUrl).pipe(catchError((_) => of([]))),
    { initialValue: [] },
  );

  favorites: WritableSignal<string[]> = signal([]);

  #title = inject(Title);
  #meta = inject(Meta);

  constructor() {
    this.#title.setTitle('Activities to book');
    this.#meta.updateTag({ name: 'description', content: 'Book your favorite activities' });
  }
}
