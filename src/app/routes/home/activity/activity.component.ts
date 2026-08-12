import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input, model, ModelSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Activity } from '@domain/activity.type';
import { ActivityStatusComponent } from '@ui/activity-status/activity-status.component';

@Component({
  selector: 'qv1-activity',
  imports: [RouterLink, CurrencyPipe, DatePipe, ActivityStatusComponent],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css',
})
export class ActivityComponent {
  activity = input.required<Activity>();

  favorites: ModelSignal<string[]> = model<string[]>([]);

  toggleFavorite(slug: string) {
    this.favorites.update((favorites) => {
      if (favorites.includes(slug)) {
        return favorites.filter((favorite) => favorite !== slug);
      }
      return favorites.concat(slug);
    });
  }
}
