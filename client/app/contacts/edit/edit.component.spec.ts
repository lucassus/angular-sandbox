import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { EditComponent } from './edit.component';

const contactsServiceStub = {

  get(id: number): Promise<Contact> {
    const contact = new Contact(id, 'Luke', 'Skywalker', 'luke@rebel.org', '+48 111', 10001);
    return Promise.resolve(contact);
  }

};

describe('EditComponent', () => {

  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [
        EditComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({ id: 124 })
          }
        },
        { provide: ContactsService, useValue: contactsServiceStub }
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
