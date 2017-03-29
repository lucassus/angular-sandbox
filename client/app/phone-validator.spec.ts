import { phoneValidator } from './phone-validator';
import { FormControl } from '@angular/forms';

describe('.phoneValidator', () => {

  describe('when the given value is valid', () => {

    it('returns no error', () => {
      const control = new FormControl('+48 123 123');
      const result = phoneValidator(control);
      expect(result).toBeNull();
    });

  });

  describe('when the given value is not valid', () => {

    it('returns an error', () => {
      const control = new FormControl('asdf');
      const result = phoneValidator(control);
      expect(result.phone.valid).toBe(false);
    });

  });

  describe('when an email is not given', () => {

    it('returns no error', () => {
      const control = new FormControl('');
      const result = phoneValidator(control);
      expect(result).toBeNull();
    });

  });

});
