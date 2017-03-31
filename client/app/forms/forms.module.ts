import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ValidationMessageDirective } from './validation-message.directive';
import { ValidationMessagesDirective } from './validation-messages.directive';
import { HasErrorDirective } from './has-error.directive';

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
