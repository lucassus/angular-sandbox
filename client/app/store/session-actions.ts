import { Action } from '@ngrx/store';

export const SESSION_REQUEST_AUTHENTICATION = 'SESSION_REQUEST_AUTHENTICATION';
export const SESSION_AUTHENTICATION_SUCCESS = 'SESSION_AUTHENTICATION_SUCCESS';
export const SESSION_AUTHENTICATION_ERROR = 'SESSION_AUTHENTICATION_ERROR';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

interface IRequestAuthenticationActionPayload {
  login: string;
  password: string;
}

export class RequestAuthenticationAction implements Action {

  readonly type: string = SESSION_REQUEST_AUTHENTICATION;

  constructor(public payload: IRequestAuthenticationActionPayload) {

  }

}

export class AuthenticationSuccessAction implements Action {

  readonly type: string = SESSION_AUTHENTICATION_SUCCESS;

}

export class AuthenticationErrorAction implements Action {

  readonly type: string = SESSION_AUTHENTICATION_ERROR;

}

export class LogoutAction implements Action {

  readonly type: string = SESSION_LOGOUT;

}
