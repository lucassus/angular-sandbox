import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { List } from 'immutable';
import { stub } from 'sinon';

import { click } from '../../../testing';
import { FakeActivatedRoute } from '../../../testing/router-stubs';
import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { ListComponent } from './list.component';

const contacts = List<Contact>([
  new Contact({
    id: 1,
    firstName: 'Luke', lastName: 'Skywalker',
    email: 'luke@rebel.org', phone: '+48 111',
    updatedAt: 10001
  }),

  new Contact({
    id: 2,
    firstName: 'Anakin', lastName: 'Skywalker',
    email: 'anakin@republic.com', phone: '+48 222',
    updatedAt: 10002
  })
]);

describe('ListComponent', () => {

  let fakeActivatedRoute: FakeActivatedRoute;
  let fakeContactsService;

  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(() => {
    fakeActivatedRoute = new FakeActivatedRoute();
    fakeActivatedRoute.testData = { contacts };

    fakeContactsService = {
      query: stub()
        .returns(Promise.resolve(List<Contact>([]))),

      delete: stub()
        .returns(Promise.resolve())
    };

    TestBed.configureTestingModule({
      declarations: [
        ListComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: ContactsService, useValue: fakeContactsService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should render list of contacts', () => {
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const rows = compiled.querySelectorAll('table tbody tr');

    expect(rows.length).toBe(2);

    expect(rows[0].querySelector('td:nth-child(1)').textContent)
      .toContain('1');
    expect(rows[0].querySelector('td:nth-child(2)').textContent)
      .toContain('Luke Skywalker');
    expect(rows[0].querySelector('td:nth-child(3)').textContent)
      .toContain('luke@rebel.org');
    expect(rows[0].querySelector('td:nth-child(4)').textContent)
      .toContain('+48 111');

    expect(rows[1].querySelector('td:nth-child(1)').textContent)
      .toContain('2');
    expect(rows[1].querySelector('td:nth-child(2)').textContent)
      .toContain('Anakin Skywalker');
    expect(rows[1].querySelector('td:nth-child(3)').textContent)
      .toContain('anakin@republic.com');
    expect(rows[1].querySelector('td:nth-child(4)').textContent)
      .toContain('+48 222');
  });

  describe('click on delete button', () => {

    let contactToDelete: Contact;
    let deleteButtonEl: DebugElement;

    beforeEach(() => {
      expect(component.contacts.size).toEqual(2);

      contactToDelete = component.contacts.get(1);
      deleteButtonEl = fixture.debugElement
        .query(By.css(`table tbody tr#contact-row-${contactToDelete.id} button.btn-danger`));
    });

    it('should delete a contact', () => {
      // When
      click(deleteButtonEl);

      // Then
      expect(fakeContactsService.delete.called).toBeTruthy();
    });

    it('should reload the list', fakeAsync(() => {
      // Given
      const newContacts = contacts.filterNot((contact) => {
        return contact.id === contactToDelete.id;
      });

      fakeContactsService.query
        .returns(Promise.resolve(newContacts));

      // When
      click(deleteButtonEl);
      tick();

      // Then
      expect(fakeContactsService.query.called).toBeTruthy();
      expect(component.contacts.size).toEqual(1);
    }));

  });

});
