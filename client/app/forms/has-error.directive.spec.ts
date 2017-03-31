import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { HasErrorDirective } from './has-error.directive';

@Component({
  template: `<div class="form-group" [appHasError]="control">aaa</div>`
})
class TestComponent {
  control = new FormControl('', Validators.required);
}

describe('HasErrorDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let el: HTMLElement;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HasErrorDirective,
        TestComponent
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    el = fixture.debugElement.children[0].nativeElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  function getClassNames() {
    const { className } = fixture.debugElement.children[0].nativeElement;
    return className.split(/\s+/);
  }

  const INVALID_VALUE = '';
  const VALID_VALUE = 'Test';

  describe('when the control is pristine', () => {

    it('should not add css class', () => {
      expect(getClassNames()).toContain('form-group');
      expect(getClassNames()).not.toContain(HasErrorDirective.CSS_CLASS);
    });

  });

  describe('when the control is dirty', () => {

    beforeEach(() => {
      component.control.markAsDirty();
    });

    describe('when the control is invalid', () => {

      beforeEach(() => {
        component.control.setValue(INVALID_VALUE);
      });

      it('should add css class', () => {
        expect(getClassNames()).toContain('form-group');
        expect(getClassNames()).toContain(HasErrorDirective.CSS_CLASS);
      });

    });

    describe('when the control is valid', () => {

      beforeEach(() => {
        component.control.setValue(VALID_VALUE);
      });

      it('should not add css class', () => {
        expect(getClassNames()).toContain('form-group');
        expect(getClassNames()).not.toContain(HasErrorDirective.CSS_CLASS);
      });

    });

  });

});
