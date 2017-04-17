import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { createAction, handleActions } from 'redux-actions';
import { createLogger } from 'redux-logger';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutes, AuthenticationGuard } from './routes';
import { IAppState, rootReducer } from './store/root-reducer';
import { SessionState } from './store/session-reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PageNotFoundComponent
  ],
  providers: [
    AuthenticationGuard
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    NgReduxModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(ngRedux: NgRedux<IAppState>) {
    const initialState: IAppState = {
      session: new SessionState()
    };

    ngRedux.configureStore(rootReducer, initialState, [
      createLogger()
    ]);
  }

}
