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

  createContact(data: any): Promise<boolean> {
    const contact = new Contact(data);

    return this.contactsService.create(contact).then((createdContact: Contact) => {
      return this.router.navigate(['./contacts', createdContact.id]);
    });
  }

}
