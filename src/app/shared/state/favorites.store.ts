import {
  computed,
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { LocalRepository } from '@services/local.repository';

@Injectable({
  providedIn: 'root',
})
export class FavoritesStore {
  private localRepository = inject(LocalRepository);
  private auxState: WritableSignal<string[]> = signal([]);

  state: Signal<string[]> = this.auxState.asReadonly();
  favCount = computed(() => this.auxState().length);

  constructor() {
    this.setState(this.localRepository.load('favorites', []));
    effect(() => this.localRepository.save('favorites', this.state()));
  }

  setState(favorites: string[]): void {
    this.auxState.set(favorites);
  }
}
