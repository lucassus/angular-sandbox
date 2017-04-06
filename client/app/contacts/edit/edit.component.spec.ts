import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { stub } from 'sinon';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { EditComponent } from './edit.component';

const fakeRouter = {
  navigate: stub()
};

describe('EditComponent', () => {

  let fakeContactsService;

  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(() => {
    fakeContactsService = {
      update: stub().returns(Promise.resolve(new Contact({ id: 124 })))
    };

    TestBed.configureTestingModule({
      declarations: [
        EditComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: Observable.of({
              contact: new Contact({
                id: 124,
                firstName: 'Luke', lastName: 'Skywalker',
                email: 'luke@rebel.org', phone: '+48 111',
                address: { town: 'Foo' },
                updateAt: 10001
              })
            })
          }
        },
        { provide: Router, useValue: fakeRouter },
        { provide: ContactsService, useValue: fakeContactsService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('has contact', () => {
    expect(component.contact instanceof Contact).toBeTruthy();
    expect(component.contact.id).toEqual(124);
  });

  describe('.updateContact', () => {

    describe('when the data was changed', () => {

      beforeEach(() => {
        component.updateContact({ firstName: 'Anakin' });
      });

      it('updates a contact', () => {
        expect(fakeContactsService.update.called).toBeTruthy();

        const [contact] = fakeContactsService.update.lastCall.args;
        expect(contact instanceof Contact).toBeTruthy();
        expect(contact.id).toEqual(124);
        expect(contact.firstName).toEqual('Anakin');
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

    describe('when the data was unchanged', () => {

      beforeEach(() => {
        component.updateContact({ firstName: 'Luke', address: { town: 'Foo' } });
      });

      it('just redirects to the show page', () => {
        expect(fakeContactsService.update.called).toBeFalsy();
        expect(fakeRouter.navigate.called).toBeTruthy();

        const [commands] = fakeRouter.navigate.lastCall.args;
        expect(commands[0]).toEqual('./contacts');
        expect(commands[1]).toEqual(124);
      });

    });

  });

});
