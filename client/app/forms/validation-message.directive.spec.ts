import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ValidationMessageDirective } from './validation-message.directive';

@Component({
  template: `<div appValidationMessage="required">The message</div>`
})
class TestComponent { }

describe('ValidationMessageDirective', () => {

  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        ValidationMessageDirective,
        TestComponent
      ]
    }).createComponent(TestComponent);

    fixture.detectChanges();
  });

  describe('directive instance', () => {

    let directiveEl: DebugElement;
    let directive: ValidationMessageDirective;

    beforeEach(() => {
      directiveEl = fixture.debugElement.query(By.directive(ValidationMessageDirective));
      directive = directiveEl.injector.get(ValidationMessageDirective);
    });

    it('has `errorCode`', () => {
      expect(directive.errorCode).toEqual('required');
    });

    it('initially hides the element', () => {
      expect(directiveEl.nativeElement.style.display).toEqual('none');
    });

    describe('.show', () => {

      it('shows the error', () => {
        directive.show();
        fixture.detectChanges();

        expect(directiveEl.nativeElement.style.display).toEqual('block');
      });

    });

    describe('.hide', () => {

      it('hides the error', () => {
        directive.hide();
        fixture.detectChanges();

        expect(directiveEl.nativeElement.style.display).toEqual('none');
      });

    });

  });

});
