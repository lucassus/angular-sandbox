import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactsService } from '../contacts.service';
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {

  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        CreateComponent
      ],
      providers: [
        { provide: ContactsService, useValue: {} }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
