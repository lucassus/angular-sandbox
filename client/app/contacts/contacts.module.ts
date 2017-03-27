import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { ContactsService } from './contacts.service';
import { ShowComponent } from './show/show.component';
import { ContactsComponent } from './contacts.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
  ],
  providers: [
    ContactsService
  ],
  declarations: [
    ContactsComponent,
    ListComponent,
    ShowComponent
  ]
})
export class ContactsModule { }
