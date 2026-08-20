import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { Feedback, FeedbackStatus } from '@domain/feedback.type';

@Component({
  selector: 'qv1-feedback',
  imports: [],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  feedback: InputSignal<Feedback> = input.required<Feedback>();
  status: Signal<FeedbackStatus> = computed(() => this.feedback().status);
  message: Signal<string> = computed(
    () => this.feedback().message || this.feedback().status.toUpperCase(),
  );
}
