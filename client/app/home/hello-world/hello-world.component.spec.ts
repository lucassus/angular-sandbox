import { Component, DebugElement } from '@angular/core';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HelloWorldComponent,
        TestComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', () => {
    // Given
    const de: DebugElement = fixture.debugElement.query(By.css('app-hello-world'));
    const el: HTMLElement = de.nativeElement;

    fixture.detectChanges();
    expect(el.textContent).toContain('Hello Test!');

    // When
    component.name = 'Angular';
    fixture.detectChanges();

    // Then
    expect(el.textContent).toContain('Hello Angular!');
  });

});
