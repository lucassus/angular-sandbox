import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  contacts: Array<Contact>;

  constructor(private contactsService: ContactsService) { }

  // TODO resolve it in the controller
  ngOnInit() {
    this.contactsService.query().then((contacts) => {
      this.contacts = contacts;
    });
  }

}
