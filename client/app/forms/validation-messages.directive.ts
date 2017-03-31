import { AfterContentInit, ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ValidationMessageDirective } from './validation-message.directive';

@Directive({
  selector: '[appValidationMessages]'
})
export class ValidationMessagesDirective implements AfterContentInit {

  @Input('appValidationMessages') control: AbstractControl;
  @ContentChildren(ValidationMessageDirective) messages: QueryList<ValidationMessageDirective>;

  ngAfterContentInit(): void {
    this.refreshMessages();

    this.control.statusChanges.subscribe(() => {
      this.refreshMessages();
    });
  }

  private refreshMessages(): void {
    if (this.control.dirty && this.control.invalid) {
      this.messages.forEach((message) => {
        if (this.control.hasError(message.errorCode)) {
          message.show();
        } else {
          message.hide();
        }
      });
    } else {
      this.hideAllMessages();
    }
  }

  private hideAllMessages(): void {
    this.messages.forEach((message) => message.hide());
  }

}
