import { Action } from '@ngrx/store';

export const SESSION_REQUEST_AUTHENTICATION = '[Session] Request authentication';
export const SESSION_AUTHENTICATION_SUCCESS = '[Session] Authentication success';
export const SESSION_AUTHENTICATION_ERROR = '[Session] Authentication error';
export const SESSION_CLEAR_AUTHENTICATION_ERROR = '[Session] Clear authentication error';
export const SESSION_LOGOUT = '[Session] Logout';

interface IRequestAuthenticationActionPayload {
  login: string;
  password: string;
  returnUrl: string;
}

export class RequestAuthenticationAction implements Action {

  readonly type: string = SESSION_REQUEST_AUTHENTICATION;
  readonly defaultReturnUrl: string = '/';

  public payload: IRequestAuthenticationActionPayload;

  constructor({ login, password, returnUrl }: IRequestAuthenticationActionPayload) {
    this.payload = {
      login, password,
      returnUrl: returnUrl || this.defaultReturnUrl
    };
  }

}

export class AuthenticationSuccessAction implements Action {

  readonly type: string = SESSION_AUTHENTICATION_SUCCESS;

}

export class ClearAuthenticationError implements Action {

  readonly type: string = SESSION_CLEAR_AUTHENTICATION_ERROR;

}

export class AuthenticationErrorAction implements Action {

  readonly type: string = SESSION_AUTHENTICATION_ERROR;

}

export class LogoutAction implements Action {

  readonly type: string = SESSION_LOGOUT;

}
