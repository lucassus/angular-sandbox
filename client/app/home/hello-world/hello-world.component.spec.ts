import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HelloWorldComponent } from './hello-world.component';

@Component({
  template: `<app-hello-world [name]="name"></app-hello-world>`
})
class TestComponent {
  name = 'Test';
}

describe('HelloWorldComponent', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HelloWorldComponent,
        TestComponent
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    element = fixture.debugElement
      .query(By.css('app-hello-world'))
      .nativeElement;

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a name', () => {
    expect(element.textContent).toContain('Hello Test!');
  });

  describe('when the name is not given', () => {

    beforeEach(() => {
      component.name = null;
      fixture.detectChanges();
    });

    it('should display default name', () => {
      expect(element.textContent).toContain('Hello World!');
    });

  });

});
