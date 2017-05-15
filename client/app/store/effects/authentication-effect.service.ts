import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  AuthenticationErrorAction,
  AuthenticationSuccessAction, RequestAuthenticationAction,
  SESSION_REQUEST_AUTHENTICATION
} from '../session-actions';

@Injectable()
export class AuthenticationEffectService {

  @Effect()
  requestAthentication$: Observable<Action> = this.actions$
    .ofType(SESSION_REQUEST_AUTHENTICATION)
    .switchMap((action: RequestAuthenticationAction) => {
      const { login, password } = action.payload;
      return this.http.post('/api/authenticate', { login, password });
    })
    .map(() => {
      return new AuthenticationSuccessAction();
    })
    .catch((error) => {
      return Observable.of(new AuthenticationErrorAction());
    });

  constructor(
    private actions$: Actions,
    private http: Http
  ) { }

}
