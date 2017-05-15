import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsyncValidatorFn, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { spy } from 'sinon';

import { Config } from '../../config';
import { Contact } from '../contact';
import { ContactFormComponent } from './contact-form.component';
import { UniqueEmailValidator } from './unique-email-validator';

@Component({
  template: `
    <app-contact-form [remotePending]="remotePending" [contact]="contact"
                      (onChange)="formChanged($event)"
                      (onSubmit)="saveContact($event)"></app-contact-form>`
})
class TestComponent {
  remotePending = false;

  contact = new Contact({
    firstName: 'Luke',
    lastName: 'Skywalker',
    email: 'luke@rebel.org'
  });

  formChanged = spy();
  saveContact = spy();
}

const fakeUniqueEmailValidator = {
  createValidator(contact: Contact): AsyncValidatorFn {
    return () => {
      return Observable.of(null);
    };
  }
};

describe('ContactFormComponent', () => {

  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let component: ContactFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: Config, useValue: new Config() }
      ],
      declarations: [
        ContactFormComponent,
        TestComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    TestBed.overrideComponent(ContactFormComponent, {
      set: {
        providers: [
          { provide: UniqueEmailValidator, useValue: fakeUniqueEmailValidator }
        ]
      }
    });

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;

    component = fixture.debugElement
      .query(By.css('app-contact-form'))
      .componentInstance as ContactFormComponent;

    fixture.detectChanges();
  });

  it('sets initial form values', () => {
    const { value: data } = component.contactForm;

    expect(data.firstName).toEqual('Luke');
    expect(data.lastName).toEqual('Skywalker');
    expect(data.email).toEqual('luke@rebel.org');
    expect(data.phone).toBeNull();
    expect(data.favourite).toBeFalsy();
  });

  it('validates `address.zipCode` format', () => {
    const control = component.contactForm.get('address.zipCode');
    expect(control).not.toBeNull();

    control.setValue('');
    expect(control.hasError('pattern')).toBeFalsy();

    control.setValue('123-123');
    expect(control.hasError('pattern')).toBeTruthy();

    control.setValue('24-313');
    expect(control.hasError('pattern')).toBeFalsy();
  });

  describe('.submit', () => {

    it('emits an event with valid data', () => {
      component.contactForm.get('firstName').setValue('Anakin');
      component.submit();

      expect(testComponent.saveContact.called).toBeTruthy();

      const [data] = testComponent.saveContact.lastCall.args;
      expect(data.firstName).toEqual('Anakin');
      expect(data.lastName).toEqual('Skywalker');
      expect(data.email).toEqual('luke@rebel.org');
      expect(data.phone).toBeNull();
      expect(data.favourite).toBeFalsy();
    });

  });

  it('emits `onChange` event', () => {
    component.contactForm.get('firstName').setValue('Anakin');
    expect(testComponent.formChanged.called).toBeTruthy();

    const [data] = testComponent.formChanged.lastCall.args;
    expect(data.id).toEqual(null);
    expect(data.firstName).toEqual('Anakin');
  });

  describe('submit button', () => {

    let buttonEl: HTMLButtonElement;

    beforeEach(() => {
       buttonEl = fixture.debugElement
         .query(By.css('button[type=submit]'))
         .nativeElement;
    });

    describe('when the contact is not persisted', () => {

      it('should display valid label', () => {
        expect(buttonEl.textContent).toContain('Create');
      });

    });

    describe('when the contact is persisted', () => {

      beforeEach(() => {
        testComponent.contact = new Contact({ id: 123 });
        fixture.detectChanges();
      });

      it('should display valid label', () => {
        expect(buttonEl.textContent).toContain('Update');
      });

    });

    describe('when the request is pending', () => {

      beforeEach(() => {
        testComponent.remotePending = true;
        fixture.detectChanges();
      });

      it('should be disabled', () => {
        expect(buttonEl.disabled).toBeTruthy();
      });

    });

  });

});
