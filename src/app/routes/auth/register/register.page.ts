import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthRepository } from '@api/auth.repository';
import { Feedback, NULL_FEEDBACK } from '@domain/feedback.type';
import { Register } from '@domain/register.type';
import { FeedbackComponent } from '@ui/feedback/feedback.component';

import { RegisterForm } from './register.form';

@Component({
  imports: [RouterLink, RegisterForm, FeedbackComponent],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css',
})
export default class RegisterPage {
  private authRepository: AuthRepository = inject(AuthRepository);

  feedback: WritableSignal<Feedback> = signal<Feedback>(NULL_FEEDBACK);

  onRegister(register: Register) {
    this.feedback.set({ status: 'busy', message: 'Registering...' });
    this.authRepository.postRegister$(register).subscribe({
      next: () => this.feedback.set({ status: 'busy', message: 'Register ok, thanks for join.' }),
      error: () =>
        this.feedback.set({ status: 'error', message: 'Failed to register. Review your data.' }),
    });
  }
}
