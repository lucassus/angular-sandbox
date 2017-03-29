import { AbstractControl, ValidationErrors } from '@angular/forms';

const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

export function emailValidator(control: AbstractControl): ValidationErrors {
  const { value } = control;

  if (!value) { return null; }

  return EMAIL_REGEXP.test(value) ? null : {
    validateEmail: {
      valid: false
    }
  };
}
