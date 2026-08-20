import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject } from '@angular/core';
import { Notification } from '@domain/notification.type';
import { NotificationsStore } from '@state/notifications.store';

export class ErrorService implements ErrorHandler {
  private notificationsStore: NotificationsStore = inject(NotificationsStore);
  handleError(error: any): void {
    const notification: Notification = { message: 'An error ocurred', type: 'error' };

    notification.message =
      error instanceof HttpErrorResponse
        ? error.message
        : (notification.message = error.toString());

    this.notificationsStore.addNotification(notification);
  }
}
