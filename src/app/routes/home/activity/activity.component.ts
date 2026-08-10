import { Component, input } from '@angular/core';
import { Activity } from '../../../domain/activity.type';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'qv1-activity.component',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css',
})
export class ActivityComponent {
  activity = input.required<Activity>();
}
