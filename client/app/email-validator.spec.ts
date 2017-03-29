import { emailValidator } from './email-validator';
import { FormControl } from '@angular/forms';

describe('.emailValidator', () => {

  describe('when the given value is valid', () => {

    it('returns no error', () => {
      const control = new FormControl('valid@email.com');
      const result = emailValidator(control);
      expect(result).toBeNull();
    });

  });

  describe('when the given value is not valid', () => {

    it('returns an error', () => {
      const control = new FormControl('invalid');
      const result = emailValidator(control);
      expect(result.validateEmail.valid).toBe(false);
    });

  });

  describe('when an email is not given', () => {

    it('returns no error', () => {
      const control = new FormControl('');
      const result = emailValidator(control);
      expect(result).toBeNull();
    });

  });

});
