import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { Activity } from '@domain/activity.type';
import { DEFAULT_FILTER, Filter, SortOrders } from '@domain/filter.type';
import { FavoritesStore } from '@state/favorites.store';
import { FilterWidget } from '@ui/filter/filter.widget';
import { Observable, switchMap } from 'rxjs';

import { ActivityComponent } from './activity/activity.component';
import { HomeService } from './home.service';

@Component({
  imports: [ActivityComponent, FilterWidget],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  private homeService = inject(HomeService);
  private favoritesStore = inject(FavoritesStore);

  search: InputSignal<string> = input<string>(DEFAULT_FILTER.search);
  orderBy: InputSignal<string> = input<string>(DEFAULT_FILTER.orderBy);
  sort: InputSignal<SortOrders> = input<SortOrders>(DEFAULT_FILTER.sort);

  private filter: Signal<Filter> = computed(() => ({
    search: this.search(),
    orderBy: this.orderBy(),
    sort: this.sort(),
  }));

  private filter$: Observable<Filter> = toObservable(this.filter);

  private getActivitiesByFilter$ = (filter: Filter) =>
    this.homeService.getActivitiesByFilter(filter);

  private filterSwitchMapApi$: Observable<Activity[]> = this.filter$.pipe(
    switchMap(this.getActivitiesByFilter$),
  );

  readonly activities: Signal<Activity[]> = toSignal(this.filterSwitchMapApi$, {
    initialValue: [],
  });

  favorites = this.favoritesStore.state;

  #title = inject(Title);
  #meta = inject(Meta);

  constructor() {
    this.#title.setTitle('Activities to book');
    this.#meta.updateTag({ name: 'description', content: 'Book your favorite activities' });
  }
}
