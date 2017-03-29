import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppFormsModule } from '../forms/forms.module';

import { ListComponent } from './list/list.component';
import { ContactsService } from './contacts.service';
import { ShowComponent } from './show/show.component';
import { ContactsComponent } from './contacts.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    AppFormsModule
  ],
  providers: [
    ContactsService
  ],
  declarations: [
    ContactsComponent,
    ListComponent,
    ShowComponent,
    EditComponent,
    CreateComponent
  ]
})
export class ContactsModule { }
