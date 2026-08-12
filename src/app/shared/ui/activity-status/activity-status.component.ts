import { UpperCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ActivityStatus } from '@domain/activity.type';

@Component({
  selector: 'qv1-activity-status',
  imports: [UpperCasePipe],
  templateUrl: './activity-status.component.html',
  styleUrl: './activity-status.component.css',
})
export class ActivityStatusComponent {
  status = input.required<ActivityStatus>();
}
