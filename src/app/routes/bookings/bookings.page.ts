import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ACTIVITIES } from '../../domain/activities.data';
import { NULL_ACTIVITY } from '../../domain/activity.type';
import { ActivityTitlePipe } from './activity-title-pipe';

@Component({
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, ActivityTitlePipe, FormsModule],
  templateUrl: './bookings.page.html',
  styleUrl: './bookings.page.css',
})
export default class BookingsPage {
  slug = input<string>();

  activity = computed(() => ACTIVITIES.find((a) => a.slug === this.slug()) || NULL_ACTIVITY);

  readonly currentParticipants = 3;
  readonly maxNewParticipants = this.activity().maxParticipants - this.currentParticipants;

  readonly participants = signal<{ id: number }[]>([{ id: 1 }, { id: 2 }, { id: 3 }]);

  readonly totalParticipants = computed(() => this.currentParticipants + this.newParticipants());
  readonly remainingPlaces = computed(
    () => this.activity().maxParticipants - this.totalParticipants(),
  );

  readonly newParticipants = signal(0);
  readonly booked = signal(false);

  constructor() {
    effect(() => {
      const totalParticipants = this.totalParticipants();
      const activity = this.activity();

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
