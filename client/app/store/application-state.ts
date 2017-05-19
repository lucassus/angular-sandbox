import { ISessionState, SessionState } from './session-reducer';

export class IApplicationState {
  session: ISessionState;
}

export const DEFAULT_APPLICATION_STATE: IApplicationState = {
  session: new SessionState()
};
