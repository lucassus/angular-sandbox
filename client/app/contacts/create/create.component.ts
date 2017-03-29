import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { emailValidator } from '../../email-validator';
import { ContactsService } from '../contacts.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts-create',
  templateUrl: './create.component.html'
})
export class CreateComponent {

  // TODO dry up the form

  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', emailValidator)
  });

  constructor(private contactsService: ContactsService) {}

  shouldDisplayErrorFor(key: string) {
    return this.contactForm.controls[key].dirty
      && this.contactForm.controls[key].invalid;
  }

  createContact() {
    const { value: data } = this.contactForm;

    this.contactsService.create(data).then((contact: Contact) => {
      console.log('Created contact', contact);
    });
  }

}
