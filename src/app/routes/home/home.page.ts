import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ACTIVITIES } from '../../domain/activities.data';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export default class HomePage {
  #title = inject(Title);
  #meta = inject(Meta);

  activities = ACTIVITIES;

  constructor() {
    this.#title.setTitle('Activities to book')
    this.#meta.updateTag({ name: 'description', content: 'Book your favorite activities' })
  }
}
