import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { ContactsService } from './contacts.service';
import { ShowComponent } from './show/show.component';
import { ContactsComponent } from './contacts.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  providers: [
    ContactsService
  ],
  declarations: [
    ContactsComponent,
    ListComponent,
    ShowComponent,
    EditComponent
  ]
})
export class ContactsModule { }
