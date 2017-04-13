import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from 'immutable';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  contacts: List<Contact>;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ contacts }) => {
      this.contacts = contacts;
    });
  }

  delete(contact: Contact) {
    return this.contactsService.delete(contact).then(() => {
      return this.contactsService.query().then((contacts) => {
        this.contacts = contacts;
      });
    });
  }

}
