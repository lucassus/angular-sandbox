import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Routes } from '@angular/router';
import { List } from 'immutable';

import { Contact } from './contact';
import { ContactsComponent } from './contacts.component';
import { ContactsService } from './contacts.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';

@Injectable()
export class ContactsResolver implements Resolve<List<Contact>> {

  constructor(private contactsService: ContactsService) { }

  resolve(): Promise<List<Contact>> {
    return this.contactsService.query();
  }

}

@Injectable()
export class ContactResolver implements Resolve<Contact> {

  constructor(private  contactsService: ContactsService) { }

  resolve(route: ActivatedRouteSnapshot): Promise<Contact> {
    const { id } = route.params;
    return this.contactsService.get(id);
  }

}

export const ContactsRoutes: Routes = [{
  path: '',
  component: ContactsComponent,

  children: [{
    path: '',
    resolve: { contacts: ContactsResolver },
    component: ListComponent
  }, {
    path: 'new',
    component: CreateComponent
  }, {
    path: ':id',
    resolve: { contact: ContactResolver },
    component: ShowComponent
  }, {
    path: ':id/edit',
    resolve: { contact: ContactResolver },
    component: EditComponent
  }]
}];
