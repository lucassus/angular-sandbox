import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const AppRoutes: Routes = [{
  path: '',
  loadChildren: './home/home.module#HomeModule'
}, {
  path: 'contacts',
  loadChildren: './contacts/contacts.module#ContactsModule',
}, {
  path: 'sandbox',
  loadChildren: './sandbox/sandbox.module#SandboxModule'
}, {
  path: '**',
  component: PageNotFoundComponent
}];
