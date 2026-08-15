import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Activity } from '@domain/activity.type';
import { FavoritesStore } from '@state/favorites.store';
import { ActivityStatusComponent } from '@ui/activity-status/activity-status.component';

@Component({
  selector: 'qv1-activity',
  imports: [RouterLink, CurrencyPipe, DatePipe, ActivityStatusComponent],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css',
})
export class ActivityComponent {
  private favoritesStore = inject(FavoritesStore);

  activity = input.required<Activity>();

  favorites = this.favoritesStore.state;

  toggleFavorite(slug: string) {
    const favorites = this.favorites();
    const updatedFavorites = favorites.includes(slug)
      ? favorites.filter((favorite) => favorite !== slug)
      : [...favorites, slug];

    this.favoritesStore.setState(updatedFavorites);
  }
}
