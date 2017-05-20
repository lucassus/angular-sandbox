import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IApplicationState } from './store/records/application-state';

@Injectable()
export class AuthenticationGuard implements CanActivateChild {

  authenticated$ = this.store
    .select((state) => state.session.authenticated);

  constructor(
    private router: Router,
    private store: Store<IApplicationState>
  ) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authenticated$.map((authenticated) => {
      if (authenticated) {
        return true;
      }

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    });
  }

}

export const AppRoutes: Routes = [{
  path: '',
  loadChildren: './home/home.module#HomeModule'
}, {
  path: 'login',
  component: LoginComponent
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
