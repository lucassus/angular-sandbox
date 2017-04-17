import { Record } from 'immutable';
import { handleActions } from 'redux-actions';

import { loginAction, logoutAction } from './session-actions';

export interface ISessionState {
  authenticated: boolean;
}

const SessionRecord = Record<ISessionState>({
  authenticated: false
});

export class SessionState extends SessionRecord {

}

const DEFAULT_STATE = new SessionState();

export const session = handleActions({
  [loginAction](state: SessionState) {
    return state.set('authenticated', true);
  },

  [logoutAction](state: SessionState) {
    return state.set('authenticated', false);
  }
}, DEFAULT_STATE);
