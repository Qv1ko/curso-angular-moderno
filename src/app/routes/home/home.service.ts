import { inject, Service } from '@angular/core';
import { ActivitiesService } from '@api/activities.service';

@Service()
export class HomeService {
  private activitiesService = inject(ActivitiesService);

  getActivities() {
    return this.activitiesService.getActivities();
  }
}
