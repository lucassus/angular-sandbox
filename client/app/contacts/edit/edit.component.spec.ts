import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { stub } from 'sinon';

import { FakeActivatedRoute } from 'testing/router-stubs';
import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { EditComponent } from './edit.component';

describe('EditComponent', () => {

  let fakeActivatedRoute: FakeActivatedRoute;
  let fakeRouter;
  let fakeContactsService;

  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(() => {
    fakeActivatedRoute = new FakeActivatedRoute();
    fakeActivatedRoute.testData = {
      contact: new Contact({
        id: 124,
        firstName: 'Luke', lastName: 'Skywalker',
        email: 'luke@rebel.org', phone: '+48 111',
        address: { town: 'Foo' },
        updateAt: 10001
      })
    };

    fakeRouter = {
      navigate: stub()
    };

    fakeContactsService = {
      update: stub()
        .returns(Promise.resolve(new Contact({ id: 124 })))
    };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
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
        // When
        expect(fakeContactsService.update.called).toBeTruthy();

        // Then
        const [contact] = fakeContactsService.update.lastCall.args;
        expect(contact instanceof Contact).toBeTruthy();
        expect(contact.id).toEqual(124);
        expect(contact.firstName).toEqual('Anakin');
      });

      describe('on success', () => {

        it('redirects to the show page', fakeAsync(() => {
          // When
          component.updateContact({ firstName: 'Anakin' });
          tick();

          // Then
          expect(fakeRouter.navigate.called).toBeTruthy();

          const [commands] = fakeRouter.navigate.lastCall.args;
          expect(commands[0]).toEqual('./contacts');
          expect(commands[1]).toEqual(124);
        }));

        it('toggles `pending` flag', fakeAsync(() => {
          // When
          component.updateContact({ firstName: 'Anakin' });

          // Then
          expect(component.pending).toBeTruthy();
          tick();
          expect(component.pending).toBeFalsy();
        }));

      });

      describe('on error', () => {

        beforeEach(() => {
          fakeContactsService.update
            .returns(Promise.reject(null));
        });

        it('does not redirect to the show page', fakeAsync(() => {
          // When
          component.updateContact({ firstName: 'Anakin' });
          tick();

          // Then
          expect(fakeRouter.navigate.called).toBeFalsy();
        }));

        it('toggles `pending` flag', fakeAsync(() => {
          // When
          component.updateContact({ firstName: 'Anakin' });

          // Then
          expect(component.pending).toBeTruthy();
          tick();
          expect(component.pending).toBeFalsy();
        }));

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
