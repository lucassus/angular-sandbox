import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { IndexComponent } from './index.component';

@Component({
  template: '<p>Hello World!</p>',
  selector: 'app-hello-world'
})
class FakeHelloWorldComponent {
  @Input() name;
}

describe('IndexComponent', () => {

  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      declarations: [
        FakeHelloWorldComponent,
        IndexComponent
      ]
    });

    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.name).toEqual('Luke');
  });

});
