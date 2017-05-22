import { compose } from '@ngrx/core';
import { routerReducer as router } from '@ngrx/router-store';
import { combineReducers } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { sessionReducer as session } from './session-reducer';
import { IApplicationState } from '../records/application-state';
import { SessionState } from '../records/session-state';

const reducers = { session, router };

export const DEFAULT_APPLICATION_STATE: IApplicationState = {
  router: { path: '' },
  session: new SessionState()
};

export function rootReducer(state: IApplicationState = DEFAULT_APPLICATION_STATE, action: any) {
  const reducer = compose(
    storeLogger({ collapsed: true }),
    combineReducers
  )(reducers);

  return reducer(state, action);
}
