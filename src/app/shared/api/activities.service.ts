import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Activity, NULL_ACTIVITY } from '@domain/activity.type';
import { Filter } from '@domain/filter.type';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Service()
export class ActivitiesService {
  private httpClient$: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = 'http://localhost:3000/activities';

  getActivities(): Observable<Activity[]> {
    return this.httpClient$.get<Activity[]>(this.apiUrl);
  }

  getActivityBySlug(slug: string | undefined): Observable<Activity> {
    if (!slug) return of(NULL_ACTIVITY);

    const activityUrl = `${this.apiUrl}?slug=${slug}`;

    return this.httpClient$.get<Activity[]>(activityUrl).pipe(
      map((activities: Activity[]) => activities[0] || NULL_ACTIVITY),
      catchError((_) => of(NULL_ACTIVITY)),
    );
  }

  getActivitiesByFilter(filter: Filter) {
    const url = `${this.apiUrl}?q=${filter.search}&_order=${filter.orderBy}&_sort=${filter.sort}`;
    return this.httpClient$.get<Activity[]>(url);
  }

  putActivity(activity: Activity): Observable<object> {
    const activityUrl = `${this.apiUrl}/${activity.id}`;
    return this.httpClient$.put(activityUrl, activity).pipe(
      catchError((err) => {
        console.error('Error updating activity', err);
        return throwError(() => new Error(err));
      }),
    );
  }
}
