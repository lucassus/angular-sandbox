import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { spy } from 'sinon';

import { Contact } from '../contact';
import { ContactFormComponent } from './contact-form.component';

@Component({
  template: `
    <app-contact-form [contact]="contact"
                      (onSubmit)="saveContact($event)"></app-contact-form>`
})
class TestComponent {
  contact = new Contact({
    firstName: 'Luke',
    lastName: 'Skywalker',
    email: 'luke@rebel.org'
  });

  saveContact = spy();
}

describe('ContactFormComponent', () => {

  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let component: ContactFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactFormComponent,
        TestComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
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

  describe('submit button', () => {

    let buttonEl: HTMLElement;

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

  });

});
