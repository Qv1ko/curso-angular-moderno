import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthRepository } from '@api/auth.repository';
import { Login } from '@domain/login.type';
import { NotificationsStore } from '@state/notifications.store';

import { LoginForm } from './login.form';

@Component({
  imports: [RouterLink, LoginForm],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export default class LoginPage {
  private authRepository: AuthRepository = inject(AuthRepository);
  private notificationsStore: NotificationsStore = inject(NotificationsStore);

  onLogin(login: Login) {
    this.authRepository.postLogin$(login).subscribe({
      error: (error) =>
        this.notificationsStore.addNotification({
          message: error.error?.message ?? 'Invalid email or password.',
          type: 'error',
        }),
    });
  }
}
