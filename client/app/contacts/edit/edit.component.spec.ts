import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { EditComponent } from './edit.component';

describe('EditComponent', () => {

  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
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
              contact: new Contact(123, 'Luke', 'Skywalker', 'luke@rebel.org', '+48 111', 10001)
            })
          }
        },
        { provide: Router, useValue: {} },
        { provide: ContactsService, useValue: {} }
      ]
    })
      // TODO why compileComponents ???
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
