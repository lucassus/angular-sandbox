import { combineReducers } from 'redux';

import { ISessionState, session } from './session-reducer';

export class IAppState {
  session: ISessionState;
}

export const rootReducer = combineReducers<IAppState>({
  session
});
