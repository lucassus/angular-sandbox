import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  pending = false;
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

  updateContact(data: any): Promise<boolean> {
    const contact = this.contact.mergeDeep(data);

    if (contact !== this.contact) {
      this.pending = true;

      return this.contactsService.update(contact).then((updatedContact: Contact) => {
        this.pending = false;
        return this.redirectToShow(updatedContact);
      }).catch(() => {
        this.pending = false;
      });
    } else {
      return this.redirectToShow(contact);
    }
  }

  private redirectToShow(contact: Contact): Promise<boolean> {
    return this.router.navigate(['./contacts', contact.id]);
  }

}
