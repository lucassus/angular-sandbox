import { compose } from '@ngrx/core';
import { combineReducers } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { session } from './session-reducer';

export function rootReducer(state: any, action: any) {
  return compose(
    storeLogger({ collapsed: true }),
    combineReducers
  )({ session })(state, action);
}
