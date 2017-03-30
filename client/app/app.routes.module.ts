import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, Routes } from '@angular/router';
import { List } from 'immutable';

import { Contact } from './contacts/contact';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsModule } from './contacts/contacts.module';
import { ContactsService } from './contacts/contacts.service';
import { CreateComponent } from './contacts/create/create.component';
import { EditComponent } from './contacts/edit/edit.component';
import { ListComponent } from './contacts/list/list.component';
import { ShowComponent } from './contacts/show/show.component';

import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { IndexComponent } from './home/index/index.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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

// TODO lazy loaded routes
export const AppRoutes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [{
    path: '',
    component: IndexComponent
  }]
}, {
  path: 'contacts',
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
}, {
  path: '**',
  component: PageNotFoundComponent
}];

// TODO this module file causes `SilentError: Multiple module files found` error

@NgModule({
  imports: [
    ContactsModule,
    HomeModule,
    RouterModule.forRoot(AppRoutes)
  ],
  declarations: [
    PageNotFoundComponent
  ],
  providers: [
    ContactsResolver,
    ContactResolver
  ],
})
export class AppRoutesModule { }
