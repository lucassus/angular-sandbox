import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

// TODO write decent specs
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  contact: Contact;

  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ contact }) => {
      this.contact = contact;

      const { firstName, lastName } = contact;
      this.contactForm.setValue({ firstName, lastName });
    });
  }

  updateContact() {
    const { value: data } = this.contactForm;

    this.contactsService.update(this.contact.id, data).then((contact: Contact) => {
      this.router.navigate(['./contacts', contact.id]);
    });
  }

}
