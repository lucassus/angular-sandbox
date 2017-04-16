import { NgRedux, select } from '@angular-redux/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../store/root-reducer';
import { loginAction, logoutAction } from '../store/session-actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {

  @select(['session', 'authenticated'])
  isAuthenticated$: Observable<boolean>;

  constructor(private ngRedux: NgRedux<IAppState>) {}

  login() {
    this.ngRedux.dispatch(loginAction());
  }

  logout() {
    this.ngRedux.dispatch(logoutAction());
  }

}
