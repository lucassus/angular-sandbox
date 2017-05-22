import { Action } from '@ngrx/store';

import { DEFAULT_SESSION_STATE, SessionState } from '../records/session-state';
import {
  SESSION_AUTHENTICATION_ERROR,
  SESSION_AUTHENTICATION_SUCCESS,
  SESSION_CLEAR_AUTHENTICATION_ERROR,
  SESSION_LOGOUT,
  SESSION_REQUEST_AUTHENTICATION
} from '../session-actions';

export function sessionReducer(state: SessionState = DEFAULT_SESSION_STATE, action: Action): SessionState {
  switch (action.type) {
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
