import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '@domain/login.type';
import { Control } from '@ui/control/control';

@Component({
  selector: 'qv1-login',
  imports: [ReactiveFormsModule, Control],
  templateUrl: './login.form.html',
  styleUrl: './login.form.css',
})
export class LoginForm {
  login = output<Login>();

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  onSubmit() {
    if (this.form.valid) {
      this.login.emit(this.form.value);
    }
  }
}
