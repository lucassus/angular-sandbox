import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { compose } from '@ngrx/core';
import { EffectsModule } from '@ngrx/effects';
import { combineReducers, StoreModule } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { AppComponent } from './app.component';
import { AuthenticationService } from './authentication.service';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutes, AuthenticationGuard } from './routes';
import { DEFAULT_APPLICATION_STATE } from './store/application-state';
import { AuthenticationEffectService } from './store/effects/authentication-effect.service';
import { session } from './store/session-reducer';

export function rootReducer(state: any, action: any) {
  return compose(
    storeLogger({ collapsed: true }),
    combineReducers
  )({ session })(state, action);
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PageNotFoundComponent,
    LoginModalComponent
  ],
  entryComponents: [
    LoginModalComponent
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    StoreModule.provideStore(rootReducer, DEFAULT_APPLICATION_STATE),
    EffectsModule.run(AuthenticationEffectService)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
