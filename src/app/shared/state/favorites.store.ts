import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesStore {
  private auxState: WritableSignal<string[]> = signal([]);
  state: Signal<string[]> = this.auxState.asReadonly();

  setState(favorites: string[]): void {
    this.auxState.set(favorites);
  }
}
