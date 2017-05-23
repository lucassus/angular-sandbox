import { Provider } from '@angular/core';
import { INITIAL_STATE } from '@ngrx/store';

import { LocalStorageService } from '../local-storage.service';
import { DEFAULT_APPLICATION_STATE, IApplicationState } from './records/application-state';
import { SessionState } from './records/session-state';

export function provideInitialState(): Provider {
  return {
    provide: INITIAL_STATE,
    useFactory(localStorage: LocalStorageService): IApplicationState {
      const authenticated = localStorage.get('authenticated') === 'true' || false;

      return {
        ...DEFAULT_APPLICATION_STATE,
        session: new SessionState({ authenticated })
      };
    },
    deps: [LocalStorageService]
  };
}
