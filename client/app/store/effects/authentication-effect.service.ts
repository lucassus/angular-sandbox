import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { go } from '@ngrx/router-store';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../../authentication.service';
import {
  AuthenticationErrorAction,
  AuthenticationSuccessAction,
  RequestAuthenticationAction, SESSION_LOGOUT,
  SESSION_REQUEST_AUTHENTICATION
} from '../session-actions';

const DEFAULT_RETURN_URL = '/';

@Injectable()
export class AuthenticationEffectService {

  @Effect()
  requestAuthentication$: Observable<Action> = this.actions$
    .ofType(SESSION_REQUEST_AUTHENTICATION)
    .switchMap((action: RequestAuthenticationAction) => {
      const { login, password, returnUrl } = action.payload;

      return this.authentication.authenticate({ login, password }).mergeMap((success) => {
        if (success) {
          return [
            new AuthenticationSuccessAction(),
            go([returnUrl || DEFAULT_RETURN_URL])
          ];
        } else {
          return [
            new AuthenticationErrorAction()
          ];
        }
      });
    });

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(SESSION_LOGOUT)
    .map(() => go(['/']));

  constructor(
    private actions$: Actions,
    private authentication: AuthenticationService
  ) { }

}
