import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '@domain/register.type';
import { Control } from '@ui/control/control';
import { matchValidator } from '@ui/form/form.functions';

@Component({
  selector: 'qv1-register',
  imports: [ReactiveFormsModule, Control],
  templateUrl: './register.form.html',
  styleUrl: './register.form.css',
})
export class RegisterForm {
  register = output<Register>();

  form: FormGroup = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
      terms: new FormControl(false, Validators.requiredTrue),
    },
    {
      validators: [matchValidator('password', 'confirm')],
    },
  );

  onSubmit() {
    if (this.form.valid) {
      const { confirm, ...register } = this.form.value;
      this.register.emit(register);
    }
  }
}
