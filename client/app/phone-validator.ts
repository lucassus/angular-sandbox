import { AbstractControl, ValidationErrors } from '@angular/forms';

const EMAIL_REGEXP = /^\+{0,1}(\d|\s|\(|\)|-|x|\.){3,}$/;

export function phoneValidator(control: AbstractControl): ValidationErrors {
  const { value } = control;

  if (!value) { return null; }

  return EMAIL_REGEXP.test(value) ? null : {
    phone: {
      valid: false
    }
  };
}
