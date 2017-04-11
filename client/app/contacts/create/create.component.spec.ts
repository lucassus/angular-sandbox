import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { stub } from 'sinon';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { CreateComponent } from './create.component';

const fakeRouter = {
  navigate: stub()
};

describe('CreateComponent', () => {

  let fakeContactsService;

  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(() => {
    fakeContactsService = {
      create: stub()
        .returns(Promise.resolve(new Contact({ id: 124 })))
    };

    TestBed.configureTestingModule({
      declarations: [
        CreateComponent
      ],
      providers: [
        { provide: Router, useValue: fakeRouter },
        { provide: ContactsService, useValue: fakeContactsService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('has contact', () => {
    expect(component.contact instanceof Contact).toBeTruthy();
    expect(component.contact.id).toBeNull();
  });

  describe('.createContact', () => {

    beforeEach(() => {
      expect(component.pending).toBeFalsy();

      fakeContactsService.create
        .returns(Promise.resolve(new Contact({ id: 124 })));
    });

    it('creates a contact', () => {
      component.createContact({ firstName: 'Luke', lastName: 'Skywalker' });
      expect(fakeContactsService.create.called).toBeTruthy();

      const [contact] = fakeContactsService.create.lastCall.args;
      expect(contact instanceof Contact).toBeTruthy();
      expect(contact.firstName).toEqual('Luke');
      expect(contact.lastName).toEqual('Skywalker');
    });

    describe('on success', () => {

      it('toggles `pending` flag', fakeAsync(() => {
        // When
        component.createContact({ firstName: 'Luke', lastName: 'Skywalker' });

        // Then
        expect(component.pending).toBeTruthy();
        tick();
        expect(component.pending).toBeFalsy();
      }));

      it('redirects to the show page', () => {
        // When
        component.createContact({ firstName: 'Luke', lastName: 'Skywalker' });

        // Then
        expect(fakeRouter.navigate.called).toBeTruthy();

        const [commands] = fakeRouter.navigate.lastCall.args;
        expect(commands[0]).toEqual('./contacts');
        expect(commands[1]).toEqual(124);
      });

    });

    describe('on error', () => {

      beforeEach(() => {
        fakeContactsService.create
          .returns(Promise.reject(null));
      });

      it('toggles `pending` flag', fakeAsync(() => {
        // When
        component.createContact({ firstName: 'Luke', lastName: 'Skywalker' });

        // Then
        expect(component.pending).toBeTruthy();
        tick();
        expect(component.pending).toBeFalsy();
      }));

    });

  });

});
