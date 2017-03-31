import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appValidationMessage]'
})
export class ValidationMessageDirective {

  @Input('appValidationMessage') errorCode: string;
  @HostBinding('style.display') display = 'none';

  show() {
    this.display = 'block';
  }

  hide() {
    this.display = 'none';
  }

}
