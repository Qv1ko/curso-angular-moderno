import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RegisterForm } from './register.form';

@Component({
  imports: [RouterLink, RegisterForm],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css',
})
export default class RegisterPage {}
