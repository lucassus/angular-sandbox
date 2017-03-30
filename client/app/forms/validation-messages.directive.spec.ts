import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ValidationMessageDirective } from './validation-message.directive';
import { ValidationMessagesDirective } from './validation-messages.directive';

@Component({
  template: `
    <div [appValidationMessages]="userForm.get('firstName')">
      <div class="help-block" appValidationMessage="required">
        First name is required
      </div>
      
      <div class="help-block" appValidationMessage="minlength">
        Name is too short
      </div>
      
      <div class="help-block" appValidationMessage="maxlength">
        Name is too long
      </div>
    </div>
  `
})
class TestComponent {

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)
    ]))
  });

}

describe('ValidationMessagesDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let control: AbstractControl;

  let requiredMessageEl: HTMLElement;
  let minLengthMessageEl: HTMLElement;
  let maxLengthMessageEl: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        ValidationMessagesDirective,
        ValidationMessageDirective,
        TestComponent
      ]
    }).createComponent(TestComponent);

    fixture.detectChanges();

    const component = fixture.componentInstance;
    control = component.userForm.get('firstName');

    requiredMessageEl = fixture.debugElement.nativeElement.querySelector('[appValidationMessage="required"]');
    minLengthMessageEl = fixture.debugElement.nativeElement.querySelector('[appValidationMessage="minlength"]');
    maxLengthMessageEl = fixture.debugElement.nativeElement.querySelector('[appValidationMessage="maxlength"]');
  });

  it('does not display errors for non-dirty control', () => {
    expect(requiredMessageEl.style.display).toEqual('none');
    expect(minLengthMessageEl.style.display).toEqual('none');
    expect(maxLengthMessageEl.style.display).toEqual('none');
  });

  describe('for dirty and invalid control', () => {

    beforeEach(() => {
      control.markAsDirty();
      fixture.detectChanges();
    });

    it('displays errors', () => {
      control.setValue('');
      fixture.detectChanges();

      expect(requiredMessageEl.style.display).toEqual('block');
      expect(minLengthMessageEl.style.display).toEqual('none');
      expect(maxLengthMessageEl.style.display).toEqual('none');
    });

    it('displays errors', () => {
      control.setValue('Zed');
      fixture.detectChanges();

      expect(requiredMessageEl.style.display).toEqual('none');
      expect(minLengthMessageEl.style.display).toEqual('block');
      expect(maxLengthMessageEl.style.display).toEqual('none');
    });

    it('displays errors', () => {
      control.setValue('this is too long name');
      fixture.detectChanges();

      expect(requiredMessageEl.style.display).toEqual('none');
      expect(minLengthMessageEl.style.display).toEqual('none');
      expect(maxLengthMessageEl.style.display).toEqual('block');
    });

  });

  describe('for valid control', () => {

    it('does not display errors', () => {
      control.setValue('Luke');
      fixture.detectChanges();

      expect(requiredMessageEl.style.display).toEqual('none');
      expect(minLengthMessageEl.style.display).toEqual('none');
      expect(maxLengthMessageEl.style.display).toEqual('none');
    });

  });

});
