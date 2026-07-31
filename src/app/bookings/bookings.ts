import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Activity } from '../domain/activity.type';
import { ActivityTitlePipe } from './activity-title-pipe';

@Component({
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, ActivityTitlePipe, FormsModule],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css',
})
export class Bookings {
  readonly activity: Activity = {
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

  readonly participants = signal<{ id: number }[]>([{ id: 1 }, { id: 2 }, { id: 3 }]);

  readonly totalParticipants = computed(() => this.currentParticipants + this.newParticipants());
  readonly remainingPlaces = computed(
    () => this.activity.maxParticipants - this.totalParticipants(),
  );

  readonly newParticipants = signal(0);
  readonly booked = signal(false);

  constructor() {
    effect(() => {
      const totalParticipants = this.totalParticipants();
      const activity = this.activity;

      if (totalParticipants >= activity.maxParticipants) {
        activity.status = 'sold-out';
      } else if (totalParticipants >= activity.minParticipants) {
        activity.status = 'confirmed';
      } else {
        activity.status = 'published';
      }
    });
  }

  onNewParticipantsChange(newParticipants: number) {
    this.newParticipants.set(newParticipants);
    this.participants.update((participants) => {
      participants = participants.slice(0, this.currentParticipants);

      for (let i = 0; i < newParticipants; i++) {
        participants.push({ id: participants.length + 1 });
      }

      return participants;
    });
  }

  onBookClick() {
    this.booked.set(true);
  }
}
