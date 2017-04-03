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

const fakeContactService = {
  create: stub().returns(Promise.resolve(new Contact({ id: 124 })))
};

describe('CreateComponent', () => {

  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateComponent
      ],
      providers: [
        { provide: Router, useValue: fakeRouter },
        { provide: ContactsService, useValue: fakeContactService }
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

    it('creates a contact', () => {
      component.createContact({ firstName: 'Luke', lastName: 'Skywalker' });
      expect(fakeContactService.create.called).toBeTruthy();

      const [data] = fakeContactService.create.lastCall.args;
      expect(data.firstName).toEqual('Luke');
      expect(data.lastName).toEqual('Skywalker');
    });

    describe('on success', () => {

      it('redirects to the show page', () => {
        component.createContact({});
        expect(fakeRouter.navigate.called).toBeTruthy();

        const [commands] = fakeRouter.navigate.lastCall.args;
        expect(commands[0]).toEqual('./contacts');
        expect(commands[1]).toEqual(124);
      });

    });

  });

});
