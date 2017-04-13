import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutesModule } from './routes/routes.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  providers: [
    { provide: 'window', useValue: window }
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
