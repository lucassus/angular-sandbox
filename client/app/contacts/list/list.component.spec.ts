import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { stub } from 'sinon';

import { click } from '../../../testing';
import { FakeActivatedRoute } from '../../../testing/router-stubs';
import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { ListComponent } from './list.component';

describe('ListComponent', () => {

  let fakeActivatedRoute: FakeActivatedRoute;
  let fakeContactsService;

  let fixture: ComponentFixture<ListComponent>;

  beforeEach(() => {
    fakeActivatedRoute = new FakeActivatedRoute();
    fakeActivatedRoute.testData = {
      contacts: [
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
      ]
    };

    fakeContactsService = {
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

    it('should delete a contact', () => {
      const buttonEl = fixture.debugElement
        .query(By.css('tbody tr:nth-child(1) button.btn-danger'));

      click(buttonEl);

      expect(fakeContactsService.delete.called).toBeTruthy();
    });

  });

});
