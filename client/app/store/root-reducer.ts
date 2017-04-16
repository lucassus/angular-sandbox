import { combineReducers } from 'redux';

import { session } from './session-reducer';

export class IAppState {
  session?: any;
}

export const rootReducer = combineReducers<IAppState>({
  session
});
