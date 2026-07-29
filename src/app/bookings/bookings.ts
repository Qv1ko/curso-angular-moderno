import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

import { Activity } from '../domain/activity.type';
import { ActivityTitlePipe } from './activity-title-pipe';

@Component({
  selector: 'qv1-bookings',
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, ActivityTitlePipe],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css',
})
export class Bookings {
  activity: Activity = {
    name: 'Padel surf',
    location: 'Lake Leman at Lausanne',
    price: 100,
    date: new Date(2025, 7, 29),
    minParticipants: 4,
    maxParticipants: 10,
    status: 'draft',
    id: 1,
    slug: 'paddle-surf',
    duration: 2,
    userId: 1,
  };
  currentParticipants = 3;
}
