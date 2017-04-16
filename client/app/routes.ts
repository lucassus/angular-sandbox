import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { CanActivateChild, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IAppState } from './store/root-reducer';

@Injectable()
export class AuthenticationGuard implements CanActivateChild {

  constructor(private ngRedux: NgRedux<IAppState>) { }

  canActivateChild(): boolean {
    const { session: { authenticated } } = this.ngRedux.getState();

    // tslint:disable-next-line
    console.info('canActivateChild()', authenticated);

    return authenticated;
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
