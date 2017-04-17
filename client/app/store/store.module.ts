import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { createLogger } from 'redux-logger';

import { IAppState, rootReducer } from './root-reducer';
import { SessionState } from './session-reducer';

@NgModule({
  imports: [
    NgReduxModule
  ]
})
export class StoreModule {

  constructor(ngRedux: NgRedux<IAppState>) {
    const initialState: IAppState = {
      session: new SessionState()
    };

    ngRedux.configureStore(rootReducer, initialState, [
      createLogger()
    ]);
  }

}
