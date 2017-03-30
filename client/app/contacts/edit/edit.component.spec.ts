import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { EditComponent } from './edit.component';

describe('EditComponent', () => {

  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        EditComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: Observable.of({
              contact: new Contact({
                id: 1,
                firstName: 'Luke', lastName: 'Skywalker',
                email: 'luke@rebel.org', phone: '+48 111',
                updateAt: 10001
              })
            })
          }
        },
        { provide: Router, useValue: {} },
        { provide: ContactsService, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
