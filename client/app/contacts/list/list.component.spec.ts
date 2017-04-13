import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { List } from 'immutable';
import { stub } from 'sinon';

import { click } from '../../../testing';
import { FakeActivatedRoute } from '../../../testing/router-stubs';
import { ConfirmationService } from '../../confirmation.service';
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

class Page {

  constructor(private fixture: ComponentFixture<ListComponent>) {}

  get rows(): DebugElement[] {
    return this.fixture.debugElement
      .queryAll(By.css('table tbody tr'));
  }

  rowFor(contact: Contact): DebugElement {
    return this.rows.find((de) => {
      const otherId = de.nativeElement.getAttribute('id');
      return otherId === `contact-row-${contact.id}`;
    });
  }

  cellContentFor(contact: Contact, n: number): string {
    return this.rowFor(contact).query(By.css(`td:nth-child(${n})`))
      .nativeElement.textContent;
  }

}

describe('ListComponent', () => {

  let fakeActivatedRoute: FakeActivatedRoute;
  let fakeContactsService;
  let fakeConfirmationService;

  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let page: Page;

  beforeEach(() => {
    fakeActivatedRoute = new FakeActivatedRoute();
    fakeActivatedRoute.testData = { contacts };

    fakeContactsService = {
      query: stub()
        .returns(Promise.resolve(List<Contact>([]))),

      delete: stub()
        .returns(Promise.resolve())
    };

    fakeConfirmationService = {
      confirm: stub()
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
    }).overrideComponent(ListComponent, {
      set: {
        providers: [
          { provide: ConfirmationService, useValue: fakeConfirmationService }
        ]
      }
    });

    fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();

    page = new Page(fixture);
    component = fixture.componentInstance;
  });

  it('should render list of contacts', () => {
    expect(page.rows.length).toBe(2);

    const firstContact = contacts.get(0);
    expect(page.cellContentFor(firstContact, 1))
      .toContain(contacts.get(0).id.toString());
    expect(page.cellContentFor(firstContact, 2))
      .toContain(firstContact.fullName);
    expect(page.cellContentFor(firstContact, 3))
      .toContain(contacts.get(0).email);
    expect(page.cellContentFor(firstContact, 4))
      .toContain(firstContact.phone);

    const secondContact = contacts.get(1);
    expect(page.cellContentFor(secondContact, 1))
      .toContain(contacts.get(1).id.toString());
    expect(page.cellContentFor(secondContact, 2))
      .toContain(secondContact.fullName);
    expect(page.cellContentFor(secondContact, 3))
      .toContain(contacts.get(1).email);
    expect(page.cellContentFor(secondContact, 4))
      .toContain(secondContact.phone);
  });

  describe('click on delete button', () => {

    let contactToDelete: Contact;
    let deleteButtonEl: DebugElement;

    beforeEach(() => {
      expect(page.rows.length).toEqual(2);

      contactToDelete = component.contacts.get(1);
      deleteButtonEl = page.rowFor(contactToDelete)
        .query(By.css('button.btn-danger'));
    });

    it('displays a confirmation', () => {
      // When
      click(deleteButtonEl);

      // Then
      expect(fakeConfirmationService.confirm
        .calledWith(`Delete ${contactToDelete.fullName}?`)).toBeTruthy();
    });

    describe('when confirmed', () => {

      beforeEach(() => {
        fakeConfirmationService.confirm.returns(true);
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
        fixture.detectChanges();

        // Then
        expect(fakeContactsService.query.called).toBeTruthy();
        expect(page.rows.length).toEqual(1);
      }));

    });

    describe('when not confirmed', () => {

      beforeEach(() => {
        fakeConfirmationService.confirm.returns(false);
      });

      it('should delete a contact', () => {
        // When
        click(deleteButtonEl);

        // Then
        expect(fakeContactsService.delete.called).toBeFalsy();
      });

    });

  });

});
