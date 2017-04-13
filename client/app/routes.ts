import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const AppRoutes: Routes = [{
  path: '',
  loadChildren: 'app/home/home.module#HomeModule'
}, {
  path: 'contacts',
  loadChildren: 'app/contacts/contacts.module#ContactsModule',
}, {
  path: '**',
  component: PageNotFoundComponent
}];
