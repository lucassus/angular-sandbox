import { compose } from '@ngrx/core';
import { routerReducer as router } from '@ngrx/router-store';
import { combineReducers } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { sessionReducer as session } from './session-reducer';

const reducers = { session, router };

export function rootReducer(state: any, action: any) {
  const reducer = compose(
    storeLogger({ collapsed: true }),
    combineReducers
  )(reducers);

  return reducer(state, action);
}
