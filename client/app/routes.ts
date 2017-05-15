import { Injectable } from '@angular/core';
import { CanActivateChild, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IApplicationState } from './store/application-state';

@Injectable()
export class AuthenticationGuard implements CanActivateChild {

  constructor(private store: Store<IApplicationState>) { }

  canActivateChild(): Observable<boolean> {
    // TODO create a selector
    return this.store
      .select((state) => state.session.authenticated);
  }

}

export const AppRoutes: Routes = [{
  path: '',
  loadChildren: './home/home.module#HomeModule'
}, {
  path: 'contacts',
  canActivateChild: [AuthenticationGuard],
  loadChildren: './contacts/contacts.module#ContactsModule',
}, {
  path: 'sandbox',
  loadChildren: './sandbox/sandbox.module#SandboxModule'
}, {
  path: '**',
  component: PageNotFoundComponent
}];
