import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { IndexComponent } from './index.component';

@Component({
  template: '<p>Hello World!</p>',
  selector: 'app-hello-world'
})
class FakeHelloWorldComponent {

}

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FakeHelloWorldComponent,
        IndexComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
