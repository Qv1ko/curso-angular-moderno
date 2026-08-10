import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Activity } from '../../../domain/activity.type';

@Component({
  selector: 'qv1-activity',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css',
})
export class ActivityComponent {
  activity = input.required<Activity>();
}
