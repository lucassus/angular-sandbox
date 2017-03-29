import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { phoneValidator } from '../../phone-validator';
import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

// TODO write decent specs
@Component({
  selector: 'app-contacts-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  contact: Contact;

  // TODO nested address form example
  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),
    phone: new FormControl('', phoneValidator),
    favourite: new FormControl()
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ contact }) => {
      this.contact = contact;
      this.contactForm.patchValue(contact.toJS());
    });
  }

  shouldDisplayErrorFor(path: string) {
    return this.contactForm.get(path).dirty
      && this.contactForm.get(path).invalid;
  }

  // TODO write specs for this method
  updateContact() {
    const { value: data } = this.contactForm;

    this.contactsService.update(this.contact.id, data).then((contact: Contact) => {
      return this.router.navigate(['./contacts', contact.id]);
    });
  }

}
