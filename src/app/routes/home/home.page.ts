import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { Activity } from '@domain/activity.type';
import { FavoritesStore } from '@state/favorites.store';
import { catchError, of } from 'rxjs';

import { ActivityComponent } from './activity/activity.component';
import { HomeService } from './home.service';

@Component({
  imports: [ActivityComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  private homeService = inject(HomeService);
  private favoritesStore = inject(FavoritesStore);

  readonly activities: Signal<Activity[]> = toSignal(
    this.homeService.getActivities().pipe(catchError((_) => of([]))),
    { initialValue: [] },
  );

  favorites = this.favoritesStore.state;

  #title = inject(Title);
  #meta = inject(Meta);

  constructor() {
    this.#title.setTitle('Activities to book');
    this.#meta.updateTag({ name: 'description', content: 'Book your favorite activities' });
  }
}
