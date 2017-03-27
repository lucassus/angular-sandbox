import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsModule } from './contacts/contacts.module';
import { ListComponent } from './contacts/list/list.component';
import { ShowComponent } from './contacts/show/show.component';
import { HomeModule } from './home/home.module';
import { IndexComponent } from './home/index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';

// TODO add separate routing module
// TODO lazy loaded routes
const appRoutes: Routes = [{
  path: '',
  component: IndexComponent
}, {
  path: 'contacts',
  component: ContactsComponent,
  children: [{
    path: '',
    component: ListComponent
  }, {
    path: ':id',
    component: ShowComponent
  }]
}, {
  path: '**', component: PageNotFoundComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ContactsModule,
    HomeModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
