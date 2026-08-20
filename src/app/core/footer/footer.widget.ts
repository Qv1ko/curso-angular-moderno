import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Notification } from '@domain/notification.type';
import { NotificationsStore } from '@state/notifications.store';
import { NotificationsComponent } from '@ui/notifications/notifications.component';

import { LocalRepository } from '../../services/local.repository';
import { CookiesComponent } from '../cookies/cookies.component';

type CookiesStatus = 'pending' | 'rejected' | 'essentials' | 'all';

@Component({
  selector: 'qv1-footer',
  imports: [DatePipe, CookiesComponent, NotificationsComponent],
  templateUrl: './footer.widget.html',
  styleUrl: './footer.widget.css',
})
export class FooterWidget {
  localRepository: LocalRepository = inject(LocalRepository);

  private notificationsStore: NotificationsStore = inject(NotificationsStore);
  notifications: Signal<Notification[]> = this.notificationsStore.notifications;
  notificationsCount: Signal<number> = this.notificationsStore.count;
  hasNotifications: Signal<boolean> = computed(() => this.notificationsCount() > 0);

  showNotification: WritableSignal<boolean> = signal<boolean>(false);

  readonly author = {
    nickname: 'Qv1ko',
    github: 'https://github.com/Qv1ko',
  };

  today = new Date();

  cookiesStatus: WritableSignal<CookiesStatus> = signal<CookiesStatus>(
    this.localRepository.load('cookies', { status: 'pending' }).status as CookiesStatus,
  );

  onCookiesAccepted = effect(() =>
    this.localRepository.save('cookies', { status: this.cookiesStatus() }),
  );

  toggleNotifications(): void {
    this.showNotification.update((current) => !current);
  }

  onNotificationClose(): void {
    this.showNotification.set(false);
    this.notificationsStore.clearNotifications();
  }
}
