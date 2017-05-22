import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { go } from '@ngrx/router-store';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../../authentication.service';
import { LocalStorageService } from '../../local-storage.service';
import {
  AuthenticationErrorAction,
  AuthenticationSuccessAction,
  RequestAuthenticationAction,
  SESSION_AUTHENTICATION_SUCCESS,
  SESSION_LOGOUT,
  SESSION_REQUEST_AUTHENTICATION
} from '../session-actions';

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
            go([returnUrl])
          ];
        } else {
          return [
            new AuthenticationErrorAction()
          ];
        }
      });
    });

  @Effect({ dispatch: false })
  authenticationSuccess$: Observable<Action> = this.actions$
    .ofType(SESSION_AUTHENTICATION_SUCCESS)
    .do(() => this.localStorage.set('authenticated', true));

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(SESSION_LOGOUT).map(() => {
      this.localStorage.remove('authenticated');
      return go(['/']);
    });

  constructor(
    private actions$: Actions,
    private authentication: AuthenticationService,
    private localStorage: LocalStorageService
  ) { }

}
