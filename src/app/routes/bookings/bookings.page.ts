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
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

import { Activity, NULL_ACTIVITY } from '../../domain/activity.type';
import { ActivityTitlePipe } from './activity-title-pipe';

@Component({
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, ActivityTitlePipe, FormsModule],
  templateUrl: './bookings.page.html',
  styleUrl: './bookings.page.css',
})
export default class BookingsPage {
  private httpClient$: HttpClient = inject(HttpClient);
  private activitiesUrl: string = 'http://localhost:3000/activities';
  private bookingsUrl: string = 'http://localhost:3000/bookings';

  #title = inject(Title);
  #meta = inject(Meta);

  slug: InputSignal<string> = input.required<string>();
  slug$: Observable<string> = toObservable(this.slug);

  activity$: Observable<Activity> = this.slug$.pipe(
    switchMap((slug) => {
      const activityUrl = `${this.activitiesUrl}?slug=${slug}`;
      return this.httpClient$.get<Activity[]>(activityUrl).pipe(
        map((activities: Activity[]) => activities[0] || NULL_ACTIVITY),
        catchError((_) => of(NULL_ACTIVITY)),
      );
    }),
  );
  activity: Signal<Activity> = toSignal(this.activity$, { initialValue: NULL_ACTIVITY });

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
    const activityUrl = `${this.activitiesUrl}/${this.activity().id}`;

    this.httpClient$.put(activityUrl, this.activity()).subscribe({
      next: (_) => console.log('Activity status updated'),
      error: (error) => console.error('Error updating activity: ', error),
    });
  }
}
