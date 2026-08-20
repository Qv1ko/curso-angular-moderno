import { Component, input, InputSignal, output } from '@angular/core';
import { Notification } from '@domain/notification.type';

@Component({
  selector: 'qv1-notifications',
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  notifications: InputSignal<Notification[]> = input<Notification[]>([]);
  close = output();
}
