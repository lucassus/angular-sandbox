import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

@Injectable()
export class UniqueEmailValidator {

  constructor(private contactsService: ContactsService) { }

  createValidator(contact: Contact): AsyncValidatorFn {
    const { id } = contact;

    const validatorInput = new Subject<string>();
    const validatorChain = validatorInput
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((email) => {
        return this.contactsService.checkEmailUniqueness(id, email);
      })
      .map(({ email, taken }) => {
        if (taken) {
          return { emailTaken: email };
        }

        return null;
      })
      .share()
      .take(1);

    return (control: AbstractControl) => {
      const { value: email } = control;

      setTimeout(() => {
        validatorInput.next(email);
      });

      return validatorChain;
    };
  }

}
