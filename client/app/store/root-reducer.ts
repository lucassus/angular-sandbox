import { combineReducers } from 'redux';

import { ISession, session } from './session-reducer';

export class IAppState {
  session?: ISession;
}

export const rootReducer = combineReducers<IAppState>({
  session
});
