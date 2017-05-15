import { Component } from '@angular/core';

import { LoginAction, LogoutAction } from '../store/session-actions';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../store/application-state';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {

  isAuthenticated$ = this.store
    .select((state) => state.session.authenticated);

  constructor(private store: Store<IApplicationState>) {}

  login() {
    this.store.dispatch(new LoginAction());
  }

  logout() {
    this.store.dispatch(new LogoutAction());
  }

}
