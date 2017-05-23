import { RouterState } from '@ngrx/router-store';

import { ISessionState, SessionState } from './session-state';

export class IApplicationState {
  router: RouterState;
  session: ISessionState;
}

export const DEFAULT_APPLICATION_STATE: IApplicationState = {
  router: { path: '' },
  session: new SessionState()
};
