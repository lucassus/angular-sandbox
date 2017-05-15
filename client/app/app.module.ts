import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { compose } from '@ngrx/core';
import { combineReducers, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutes, AuthenticationGuard } from './routes';
import { INITIAL_APPLICATION_STATE } from './store/application-state';
import { session } from './store/session-reducer';

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
    StoreModule.provideStore(
      compose(combineReducers)({ session }),
      INITIAL_APPLICATION_STATE
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
