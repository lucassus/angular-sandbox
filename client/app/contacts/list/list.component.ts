import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  contacts: Array<Contact>;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ contacts }) => {
      this.contacts = contacts;
    });
  }

  // TODO reload the list
  delete(contact: Contact) {
    return this.contactsService.delete(contact);
  }

}
