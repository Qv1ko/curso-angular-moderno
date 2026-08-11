import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { Activity } from '../../domain/activity.type';

@Service()
export class HomeService {
  private httpClient$: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = 'http://localhost:3000/activities';

  getActivities(): Observable<Activity[]> {
    return this.httpClient$.get<Activity[]>(this.apiUrl);
  }
}
