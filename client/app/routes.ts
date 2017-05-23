import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, Routes } from '@angular/router';
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IApplicationState } from './store/records/application-state';

@Injectable()
export class AuthenticationRequiredGuard implements CanActivateChild {

  authenticated$ = this.store
    .select((state) => state.session.authenticated);

  constructor(private store: Store<IApplicationState>) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authenticated$.map((authenticated) => {
      if (authenticated) {
        return true;
      }

      const { url: returnUrl } = state;
      this.store.dispatch(go(['/login'], { returnUrl }));

      return false;
    });
  }

}

@Injectable()
export class AnonymousRequiredGuard implements CanActivate {

  authenticated$ = this.store
    .select((state) => state.session.authenticated);

  constructor(private store: Store<IApplicationState>) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authenticated$.map((authenticated) => {
      if (authenticated) {
        this.store.dispatch(go(['/']));
        return false;
      }

      return true;
    });
  }

}

export const AppRoutes: Routes = [{
  path: '',
  loadChildren: './home/home.module#HomeModule'
}, {
  path: 'login',
  canActivate: [AnonymousRequiredGuard],
  component: LoginComponent
}, {
  path: 'contacts',
  canActivateChild: [AuthenticationRequiredGuard],
  loadChildren: './contacts/contacts.module#ContactsModule',
}, {
  path: 'sandbox',
  loadChildren: './sandbox/sandbox.module#SandboxModule'
}, {
  path: '**',
  component: PageNotFoundComponent
}];
