import { Action } from '@ngrx/store';

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

export class LoginAction implements Action {

  readonly type: string = SESSION_LOGIN;

  constructor() {

  }

}

export class LogoutAction implements Action {

  readonly type: string = SESSION_LOGOUT;

  constructor() {

  }

}
