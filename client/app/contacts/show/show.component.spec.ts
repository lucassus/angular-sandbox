import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Config } from '../../config';
import { CheckmarkPipe } from '../checkmark.pipe';
import { Contact } from '../contact';
import { CountryNamePipe } from '../country-name.pipe';
import { ShowComponent } from './show.component';

describe('ShowComponent', () => {

  let component: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckmarkPipe,
        CountryNamePipe,
        ShowComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: Observable.of({
              contact: new Contact({
                id: 123,
                firstName: 'Luke', lastName: 'Skywalker',
                email: 'luke@rebel.org', phone: '+48 111',
                updatedAt: 10001
              })
            })
          }
        },
        { provide: Config, useValue: new Config() }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ShowComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should load and show a contact', () => {
    const compiled: HTMLElement = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('dl')).not.toBeNull();

    expect(compiled.querySelector('dl dd:nth-of-type(1)').textContent)
      .toContain('123');
    expect(compiled.querySelector('dl dd:nth-of-type(2)').textContent)
      .toContain('Luke');
    expect(compiled.querySelector('dl dd:nth-of-type(3)').textContent)
      .toContain('Skywalker');
    expect(compiled.querySelector('dl dd:nth-of-type(4)').textContent)
      .toContain('luke@rebel.org');
  });

});
