import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

// TODO write specs
@Injectable()
export class UniqueEmailValidator {

  // TODO pass a function here ???
  constructor(private contactsService: ContactsService) { }

  // TODO add a signature
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
