import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AuthenticationService } from './authentication.service';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutes, AuthenticationGuard } from './routes';
import { AuthenticationEffectService } from './store/effects/authentication-effect.service';
import { rootReducer } from './store/reducers/root-reducer';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PageNotFoundComponent,
    LoginComponent
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
    StoreModule.provideStore(rootReducer),
    EffectsModule.run(AuthenticationEffectService)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
