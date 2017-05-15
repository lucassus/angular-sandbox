import { Action } from '@ngrx/store';
import { Record } from 'immutable';

import { SESSION_LOGIN, SESSION_LOGOUT } from './session-actions';

export interface ISessionState {
  authenticated: boolean;
}

const SessionRecord = Record<ISessionState>({
  authenticated: false
});

export class SessionState extends SessionRecord {

}

const DEFAULT_STATE = new SessionState();

export function session(state: SessionState = DEFAULT_STATE, action: Action): SessionState {
  switch(action.type) {
    case SESSION_LOGIN:
      return state.set('authenticated', true);

    case SESSION_LOGOUT:
      return state.set('authenticated', false);

    default:
      return state;
  }
}
