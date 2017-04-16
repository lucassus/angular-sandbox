import { Record } from 'immutable';
import { handleActions } from 'redux-actions';

import { loginAction, logoutAction } from './session-actions';

export interface ISession {
  authenticated: boolean;
}

const SessionRecord = Record<ISession>({
  authenticated: false
});

class SessionState extends SessionRecord {

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
