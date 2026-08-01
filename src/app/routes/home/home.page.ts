import { Component } from '@angular/core';

import { ACTIVITIES } from '../../domain/activities.data';
import { RouterLink } from "@angular/router";
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export default class HomePage {
  activities = ACTIVITIES;
}
