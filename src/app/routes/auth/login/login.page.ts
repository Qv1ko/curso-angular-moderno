import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Login } from '@domain/login.type';

import { LoginForm } from './login.form';

@Component({
  imports: [RouterLink, LoginForm],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export default class LoginPage {
  onLogin(login: Login) {
    console.info(login);
  }
}
