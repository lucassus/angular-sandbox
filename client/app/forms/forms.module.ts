import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ValidationMessageDirective } from './validation-message.directive';
import { ValidationMessagesDirective } from './validation-messages.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ValidationMessageDirective,
    ValidationMessagesDirective
  ],
  exports: [
    ValidationMessageDirective,
    ValidationMessagesDirective
  ]
})
export class AppFormsModule { }
