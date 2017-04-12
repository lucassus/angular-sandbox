import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { stub } from 'sinon';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { UniqueEmailValidator } from './unique-email-validator';

describe('UniqueEmailValidator', () => {

  let fakeContactsService;
  let uniqueEmailValidator: UniqueEmailValidator;

  beforeEach(() => {
    fakeContactsService = {
      checkEmailUniqueness: stub().callsFake((id, email) => {
        const taken = (email === 'taken@email.com');
        return Observable.of({ email, taken });
      })
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ContactsService, useValue: fakeContactsService },
        UniqueEmailValidator
      ]
    });

    uniqueEmailValidator = TestBed.get(UniqueEmailValidator);
  });

  describe('.createValidator', () => {

    let validator;

    beforeEach(() => {
      const contact = new Contact();
      validator = uniqueEmailValidator.createValidator(contact);
    });

    it('validates', () => {
      const control = new FormControl('other@email.com');

      validator(control).subscribe((result) => {
        expect(result).toBeNull();
      });
    });

    it('validates', () => {
      const control = new FormControl('taken@email.com');

      validator(control).subscribe((result) => {
        expect(result).not.toBeNull();
        expect(result.emailTaken).toEqual('taken@email.com');
      });
    });

  });

});
