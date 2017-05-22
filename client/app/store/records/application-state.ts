import { RouterState } from '@ngrx/router-store';

import { ISessionState } from './session-state';

export class IApplicationState {
  router: RouterState;
  session: ISessionState;
}
