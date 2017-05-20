import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { IApplicationState } from '../store/records/application-state';
import { LogoutAction } from '../store/session-actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {

  isAuthenticated$ = this.store
    .select<boolean>((state) => state.session.authenticated);

  constructor(
    private store: Store<IApplicationState>
  ) { }

  logout() {
    this.store.dispatch(new LogoutAction());
  }

}
