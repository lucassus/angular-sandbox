import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      create: stub().returns(Promise.resolve(new Contact({ id: 124 })))
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
      component.createContact({ firstName: 'Luke', lastName: 'Skywalker' });
    });

    it('creates a contact', () => {
      expect(fakeContactsService.create.called).toBeTruthy();

      const [contact] = fakeContactsService.create.lastCall.args;
      expect(contact instanceof Contact).toBeTruthy();
      expect(contact.firstName).toEqual('Luke');
      expect(contact.lastName).toEqual('Skywalker');
    });

    describe('on success', () => {

      it('redirects to the show page', () => {
        expect(fakeRouter.navigate.called).toBeTruthy();

        const [commands] = fakeRouter.navigate.lastCall.args;
        expect(commands[0]).toEqual('./contacts');
        expect(commands[1]).toEqual(124);
      });

    });

  });

});
