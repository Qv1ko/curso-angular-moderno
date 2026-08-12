import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from '@domain/activity.type';

@Pipe({
  name: 'activityTitle',
})
export class ActivityTitlePipe implements PipeTransform {
  transform(activity: Activity): string {
    return `${activity.name} at ${activity.location}`;
  }
}
