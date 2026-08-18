import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchValidator(controlName: string, matchingControlName: string) {
  return (form: AbstractControl) => {
    const first = form.get(controlName);
    const second = form.get(matchingControlName);

    if (first?.value === second?.value) {
      return null;
    }

    const validationErrors: ValidationErrors = { dataMismatch: true };
    second?.setErrors(validationErrors);

    return validationErrors;
  };
}
