import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { createAction, handleActions } from 'redux-actions';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutes, AuthenticationGuard } from './routes';
import { StoreModule } from './store/store.module';

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
    StoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
