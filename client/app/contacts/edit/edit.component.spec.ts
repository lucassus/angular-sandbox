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

const fakeContactService = {
  update: stub().returns(Promise.resolve(new Contact({ id: 124 })))
};

describe('EditComponent', () => {

  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(() => {
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
                updateAt: 10001
              })
            })
          }
        },
        { provide: Router, useValue: fakeRouter },
        { provide: ContactsService, useValue: fakeContactService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('.updateContact', () => {

    it('updates a contact', () => {
      component.updateContact({ firstName: 'Anakin' });
      expect(fakeContactService.update.called).toBeTruthy();

      const [id, data] = fakeContactService.update.lastCall.args;
      expect(id).toEqual(124);
      expect(data.firstName).toEqual('Anakin');
    });

    describe('on success', () => {

      it('redirects to the show page', () => {
        component.updateContact({});
        expect(fakeRouter.navigate.called).toBeTruthy();

        const [commands] = fakeRouter.navigate.lastCall.args;
        expect(commands[0]).toEqual('./contacts');
        expect(commands[1]).toEqual(124);
      });

    });

  });

});
