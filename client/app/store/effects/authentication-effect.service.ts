import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  AuthenticationErrorAction,
  AuthenticationSuccessAction, RequestAuthenticationAction,
  SESSION_REQUEST_AUTHENTICATION
} from '../session-actions';
import { AuthenticationService } from '../../authentication.service';

@Injectable()
export class AuthenticationEffectService {

  @Effect()
  requestAuthentication$: Observable<Action> = this.actions$
    .ofType(SESSION_REQUEST_AUTHENTICATION)
    .switchMap((action: RequestAuthenticationAction) => {
      const { login, password } = action.payload;

      return this.authentication.authenticate({ login, password }).map((success) => {
        if (success) {
          return new AuthenticationSuccessAction();
        } else {
          return new AuthenticationErrorAction();
        }
      });
    });

  constructor(
    private actions$: Actions,
    private authentication: AuthenticationService
  ) { }

}
