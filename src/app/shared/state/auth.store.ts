import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { NULL_USER_ACCESS_TOKEN, UserAccessToken } from '@domain/userAccessToken.type';
import { LocalRepository } from '@services/local.repository';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private localRepository: LocalRepository = inject(LocalRepository);

  private state: WritableSignal<UserAccessToken> = signal<UserAccessToken>(this.localRepository.load('userAccessToken', NULL_USER_ACCESS_TOKEN));

  isAuthenticated: Signal<boolean> = computed(() => this.state().accessToken !== '');
  isAnonymous: Signal<boolean> = computed(() => this.state().accessToken === '');
  userId: Signal<number> = computed(() => this.state().user.id);

  setState(userAccessToken: UserAccessToken): void {
    this.state.set(userAccessToken);
    this.localRepository.save('userAccessToken', userAccessToken);
  }
}
