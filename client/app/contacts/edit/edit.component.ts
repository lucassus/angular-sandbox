import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

// TODO write decent specs
@Component({
  selector: 'app-contacts-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ contact }) => {
      this.contact = contact;
    });
  }

  updateContact(data: any): void {
    this.contactsService.update(this.contact.id, data).then(() => {
      return this.router.navigate(['./contacts', this.contact.id]);
    });
  }

}
