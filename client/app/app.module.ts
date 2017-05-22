import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { INITIAL_STATE, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AuthenticationService } from './authentication.service';
import { LocalStorageService, localStorageServiceFactory } from './local-storage.service';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AnonymousRequiredGuard, AppRoutes, AuthenticationRequiredGuard } from './routes';
import { AuthenticationEffectService } from './store/effects/authentication-effect.service';
import { IApplicationState } from './store/records/application-state';
import { SessionState } from './store/records/session-state';
import { DEFAULT_APPLICATION_STATE, rootReducer } from './store/reducers/root-reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  providers: [
    AuthenticationService,
    AuthenticationRequiredGuard,
    AnonymousRequiredGuard,
    {
      provide: LocalStorageService,
      useFactory: localStorageServiceFactory
    },
    {
      provide: INITIAL_STATE,
      useFactory(): IApplicationState {
        return {
          ...DEFAULT_APPLICATION_STATE,
          session: new SessionState({ authenticated: true })
        };
      }
    }
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    StoreModule.provideStore(rootReducer),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(AuthenticationEffectService)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
