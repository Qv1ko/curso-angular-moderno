import { inject, Service } from '@angular/core';
import { ActivitiesService } from '@api/activities.service';
import { Activity } from '@domain/activity.type';
import { DEFAULT_FILTER, Filter } from '@domain/filter.type';
import { Observable } from 'rxjs';

@Service()
export class HomeService {
  private activitiesService = inject(ActivitiesService);

  getActivities() {
    return this.activitiesService.getActivities();
  }

  getActivitiesByFilter(partialFilter: Partial<Filter>): Observable<Activity[]> {
    const filter: Filter = {
      search: partialFilter.search || DEFAULT_FILTER.search,
      orderBy: partialFilter.orderBy || DEFAULT_FILTER.orderBy,
      sort: partialFilter.sort || DEFAULT_FILTER.sort,
    };

    return this.activitiesService.getActivitiesByFilter(filter);
  }
}
