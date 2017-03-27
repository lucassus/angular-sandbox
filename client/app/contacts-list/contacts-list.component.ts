import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html'
})
export class ContactsListComponent implements OnInit {

  contacts: Array<Contact>;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    console.log('Fetching....');
    this.contactsService.query().then((contacts) => {
      this.contacts = contacts;
    });
  }

}
