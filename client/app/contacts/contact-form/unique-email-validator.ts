import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

// TODO move to the separate file
// TODO write specs
export class UniqueEmailValidator {

  private validatorInput = new Subject<string>();
  private validatorChain: Observable<ValidationErrors | null>;

  // TODO pass a function here
  constructor(contact: Contact, contactsService: ContactsService) {
    this.validatorChain = this.validatorInput
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((email) => {
        const { id } = contact;
        return contactsService.checkEmailUniqueness(id, email);
      })
      .map(({ email, taken }) => {
        if (taken) {
          return { emailTaken: email };
        }

        return null;
      })
      .share()
      .take(1);
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const { value: email } = control;

    setTimeout(() => {
      this.validatorInput.next(email);
    });

    return this.validatorChain;
  }

}
