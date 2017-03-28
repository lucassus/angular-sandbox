import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

import { HelloWorldComponent } from './hello-world.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-hello-world [name]="name"></app-hello-world>
  `
})
class HelloWorldWrapperComponent {
  name = 'Test';
}

describe('HelloWorldComponent', () => {

  let component: HelloWorldWrapperComponent;
  let fixture: ComponentFixture<HelloWorldWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HelloWorldComponent,
        HelloWorldWrapperComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloWorldWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', () => {
    // Given
    const de: DebugElement = fixture.debugElement.query(By.css('app-hello-world p|'));
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
