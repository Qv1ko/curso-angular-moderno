import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Register } from '@domain/register.type';

import { RegisterForm } from './register.form';
import { AuthRepository } from '@api/auth.repository';

@Component({
  imports: [RouterLink, RegisterForm],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css',
})
export default class RegisterPage {
  private authRepository: AuthRepository = inject(AuthRepository);

  onRegister(register: Register) {
    this.authRepository.postRegister$(register).subscribe((response) => console.info(response));
  }
}
