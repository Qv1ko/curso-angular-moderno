import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  InputSignal,
  Signal,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivitiesService } from '@api/activities.service';
import { toSignalMap } from '@api/signal.functions';
import { Activity, NULL_ACTIVITY } from '@domain/activity.type';

import { ActivityTitlePipe } from './activity-title-pipe';

@Component({
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, ActivityTitlePipe, FormsModule],
  templateUrl: './bookings.page.html',
  styleUrl: './bookings.page.css',
})
export default class BookingsPage {
  private httpClient$: HttpClient = inject(HttpClient);
  private bookingsUrl: string = 'http://localhost:3000/bookings';
  private activitiesService = inject(ActivitiesService);

  #title = inject(Title);
  #meta = inject(Meta);

  slug: InputSignal<string> = input.required<string>();

  activity: Signal<Activity> = toSignalMap(
    this.slug,
    (slug) => this.activitiesService.getActivityBySlug(slug),
    NULL_ACTIVITY,
  );

  readonly currentParticipants = 3;
  readonly maxNewParticipants = this.activity().maxParticipants - this.currentParticipants;
  readonly isBookable = computed(() => ['published', 'confirmed'].includes(this.activity().status));

  readonly newParticipants = signal(0);
  readonly booked = signal(false);
  readonly participants = signal<{ id: number }[]>([]);

  readonly totalParticipants = computed(() => this.currentParticipants + this.newParticipants());
  readonly remainingPlaces = computed(
    () => this.activity().maxParticipants - this.totalParticipants(),
  );
  readonly bookingAmount = computed(() => this.newParticipants() * this.activity().price);

  readonly bookedMessage = computed(() => {
    if (this.booked()) return `Booked USD ${this.bookingAmount}`;
    return '';
  });

  constructor() {
    effect(() => {
      const activity = this.activity();

      this.#title.setTitle(activity.name);

      const description = `${activity.name} in ${activity.location} on ${activity.date} for ${activity.price}`;
      this.#meta.updateTag({ name: 'description', content: description });
    });

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

    const newBooking = {
      id: 0,
      userId: 0,
      activityId: this.activity().id,
      date: new Date(),
      participants: this.newParticipants(),
      payment: {
        method: 'creditCard',
        amount: this.bookingAmount(),
        status: 'pending',
      },
    };

    this.httpClient$.post(this.bookingsUrl, newBooking).subscribe({
      next: (response) => {
        console.log(response);
        this.updateActivityStatus();
      },
      error: (err) => console.error('Error creating booking:', err),
    });
  }

  private updateActivityStatus() {
    this.activitiesService
      .putActivity(this.activity())
      .subscribe((_) => console.log('Activity status updated'));
  }
}
