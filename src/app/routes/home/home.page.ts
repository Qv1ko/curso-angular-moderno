import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { ACTIVITIES } from '../../domain/activities.data';
import { Activity } from '../../domain/activity.type';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export default class HomePage {
  private httpClient$: HttpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/activities';

  #title = inject(Title);
  #meta = inject(Meta);

  activities: Activity[] = [];

  constructor() {
    this.#title.setTitle('Activities to book');
    this.#meta.updateTag({ name: 'description', content: 'Book your favorite activities' });

    this.httpClient$.get<Activity[]>(this.apiUrl).subscribe({
      next: (activities) => this.activities = activities,
      error: (err) => console.error(err),
    });
  }
}
