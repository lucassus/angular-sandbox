import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HasErrorDirective } from './has-error.directive';
import { ValidationMessageDirective } from './validation-message.directive';
import { ValidationMessagesDirective } from './validation-messages.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ValidationMessageDirective,
    ValidationMessagesDirective,
    HasErrorDirective
  ],
  exports: [
    ValidationMessageDirective,
    ValidationMessagesDirective,
    HasErrorDirective
  ]
})
export class AppFormsModule { }
