import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { ShowComponent } from './show.component';

const contactsServiceStub = {

  get(id: number): Promise<Contact> {
    const contact = new Contact(id, 'Luke', 'Skywalker', 'luke@rebel.org', '+48 111', 10001);
    return Promise.resolve(contact);
  }

};

describe('ShowComponent', () => {
  let component: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ShowComponent
      ],
      providers: [
        { provide: ContactsService, useValue: contactsServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
