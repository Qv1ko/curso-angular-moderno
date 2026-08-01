import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ACTIVITIES } from '../../domain/activities.data';

@Component({
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export default class HomePage {
  activities = ACTIVITIES;
}
