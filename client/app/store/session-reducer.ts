import { Action } from '@ngrx/store';
import { Record } from 'immutable';

import {
  SESSION_REQUEST_AUTHENTICATION, SESSION_LOGOUT, SESSION_AUTHENTICATION_SUCCESS,
  SESSION_AUTHENTICATION_ERROR, SESSION_CLEAR_AUTHENTICATION_ERROR
} from './session-actions';

export interface ISessionState {
  authenticationPending: boolean;
  authenticationError: boolean;
  authenticated: boolean;
}

const SessionRecord = Record<ISessionState>({
  authenticationPending: false,
  authenticated: false,
  authenticationError: false
});

export class SessionState extends SessionRecord {

}

const DEFAULT_STATE = new SessionState();

export function session(state: SessionState = DEFAULT_STATE, action: Action): SessionState {
  switch(action.type) {
    case SESSION_REQUEST_AUTHENTICATION:
      return state
        .set('authenticationPending', true);

    case SESSION_AUTHENTICATION_SUCCESS:
      return state
        .set('authenticationPending', false)
        .set('authenticated', true)
        .set('authenticationError', false);

    case SESSION_AUTHENTICATION_ERROR:
      return state
        .set('authenticationPending', false)
        .set('authenticated', false)
        .set('authenticationError', true);

    case SESSION_CLEAR_AUTHENTICATION_ERROR:
      return state
        .set('authenticationError', false);

    case SESSION_LOGOUT:
      return state
        .set('authenticated', false);

    default:
      return state;
  }
}
