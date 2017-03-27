import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { ShowComponent } from './show.component';
import { Observable } from 'rxjs';

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
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({ id: 123 })
          }
        },
        { provide: ContactsService, useValue: contactsServiceStub }
      ]
    });

    fixture = TestBed.createComponent(ShowComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should load and show a contact', fakeAsync(() => {
    // Given
    let compiled: HTMLElement = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('span').textContent)
      .toContain('Loading contact...');
    expect(compiled.querySelector('dl')).toBeNull();

    // When
    tick();
    fixture.detectChanges();

    // Then
    expect(compiled.querySelector('dl')).not.toBeNull();

    expect(compiled.querySelector('dl dd:nth-of-type(1)').textContent)
      .toContain('123');
    expect(compiled.querySelector('dl dd:nth-of-type(2)').textContent)
      .toContain('Luke');
    expect(compiled.querySelector('dl dd:nth-of-type(3)').textContent)
      .toContain('Skywalker');
    expect(compiled.querySelector('dl dd:nth-of-type(4)').textContent)
      .toContain('luke@rebel.org');
  }));

});
