import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { LoginModalComponent } from '../login-modal/login-modal.component';
import { IApplicationState } from '../store/application-state';
import { LogoutAction } from '../store/session-actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {

  isAuthenticated$ = this.store
    .select((state) => state.session.authenticated);

  constructor(
    private modalService: NgbModal,
    private store: Store<IApplicationState>
  ) {}

  login() {
    this.modalService.open(LoginModalComponent);
  }

  logout() {
    this.store.dispatch(new LogoutAction());
  }

}
