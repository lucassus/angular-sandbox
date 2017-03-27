import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../contact';
import { ListComponent } from './list.component';

const routeStub = {

  data: Observable.of({
    contacts: [
      new Contact(1, 'Luke', 'Skywalker', 'luke@rebel.org', '+48 111', 10001),
      new Contact(2, 'Anakin', 'Skywalker', 'anakin@republic.com', '+48 222', 10002)
    ]
  })

};

describe('ListComponent', () => {

  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();
  }));

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
    expect(rows[0].querySelector('td:nth-child(5)').textContent)
      .toContain('Jan 1, 1970, 1:00:10 AM');

    expect(rows[1].querySelector('td:nth-child(1)').textContent)
      .toContain('2');
    expect(rows[1].querySelector('td:nth-child(2)').textContent)
      .toContain('Anakin Skywalker');
    expect(rows[1].querySelector('td:nth-child(3)').textContent)
      .toContain('anakin@republic.com');
    expect(rows[1].querySelector('td:nth-child(4)').textContent)
      .toContain('+48 222');
    expect(rows[1].querySelector('td:nth-child(5)').textContent)
      .toContain('Jan 1, 1970, 1:00:10 AM');
  });

});
