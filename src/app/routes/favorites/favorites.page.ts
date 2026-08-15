import { Component, inject, Signal } from '@angular/core';
import { FavoritesStore } from '@state/favorites.store';

@Component({
  selector: 'qv1-favorites',
  imports: [],
  templateUrl: './favorites.page.html',
  styleUrl: './favorites.page.css',
})
export default class FavoritesPage {
  private favoritesStore: FavoritesStore = inject(FavoritesStore);
  favorites: Signal<string[]> = this.favoritesStore.state;
}
