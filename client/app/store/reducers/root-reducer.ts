import { compose } from '@ngrx/core';
import { routerReducer as router } from '@ngrx/router-store';
import { combineReducers } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { DEFAULT_APPLICATION_STATE, IApplicationState } from '../records/application-state';
import { sessionReducer as session } from './session-reducer';

const reducers = { session, router };

export function rootReducer(state: IApplicationState = DEFAULT_APPLICATION_STATE, action: any) {
  const reducer = compose(
    storeLogger({ collapsed: true }),
    combineReducers
  )(reducers);

  return reducer(state, action);
}
