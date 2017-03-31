import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts-create',
  templateUrl: './create.component.html'
})
export class CreateComponent {

  contact = new Contact();

  constructor(
    private router: Router,
    private contactsService: ContactsService
  ) { }

  createContact(data: any): void {
    this.contactsService.create(data).then((contact: Contact) => {
      return this.router.navigate(['./contacts', contact.id]);
    });
  }

}
