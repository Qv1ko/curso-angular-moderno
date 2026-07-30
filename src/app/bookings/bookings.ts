import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Activity } from '../domain/activity.type';
import { ActivityTitlePipe } from './activity-title-pipe';

@Component({
  selector: 'qv1-bookings',
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, ActivityTitlePipe, FormsModule],
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

  readonly currentParticipants = 3;
  readonly maxNewParticipants = this.activity.maxParticipants - this.currentParticipants;

  readonly totalParticipants = computed(() => this.currentParticipants + this.newParticipants());
  readonly remainingPlaces = computed(() => this.activity.maxParticipants - this.totalParticipants());

  readonly newParticipants = signal(0);
  readonly booked = signal(false);

  onNewParticipantsChange(newParticipants: number) {
    this.newParticipants.set(newParticipants);
  }

  onBookClick() {
    this.booked.set(true);
  }
}
