import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ActivitiesRepository } from '@api/activities.repository';
import { Activity } from '@domain/activity.type';
import { FavoritesStore } from '@state/favorites.store';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'qv1-favorites',
  imports: [RouterLink],
  templateUrl: './favorites.page.html',
  styleUrl: './favorites.page.css',
})
export default class FavoritesPage {
  private favoritesStore: FavoritesStore = inject(FavoritesStore);
  private activitiesRepository: ActivitiesRepository = inject(ActivitiesRepository);
  private favoritesSlugs: string[] = this.favoritesStore.state();

  private getActivityBySlug$ = (favoriteSlug: string) =>
    this.activitiesRepository.getActivityBySlug$(favoriteSlug);
  private mapActivitiesFromSlugs$: Observable<Activity>[] = this.favoritesSlugs.map(
    this.getActivityBySlug$,
  );
  private activities$: Observable<Activity[]> = forkJoin(this.mapActivitiesFromSlugs$);

  activities: Signal<Activity[]> = toSignal(this.activities$, { initialValue: [] });
}
