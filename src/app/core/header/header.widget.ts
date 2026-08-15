import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritesStore } from '@state/favorites.store';

@Component({
  selector: 'qv1-header',
  imports: [RouterLink],
  templateUrl: './header.widget.html',
  styleUrl: './header.widget.css',
})
export class HeaderWidget {
  private favoritesStore = inject(FavoritesStore);

  protected readonly title = signal('ActivityBookings');

  favCount = this.favoritesStore.favCount;
}
