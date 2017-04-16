import { handleActions } from 'redux-actions';

import { loginAction, logoutAction } from './session-actions';

// TODO use immutable

const DEFAULT_STATE = {
  authenticated: false
};

export const session = handleActions({
  [loginAction]() {
    return { authenticated: true };
  },

  [logoutAction]() {
    return { authenticated: false };
  }
}, DEFAULT_STATE);
