import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

import { HelloWorldComponent } from './hello-world.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-hello-world [name]="name"></app-hello-world>
  `
})
class HelloWorldComponentWrapper {
  name = 'Test';
}

describe('HelloWorldComponent', () => {

  let component: HelloWorldComponentWrapper;
  let fixture: ComponentFixture<HelloWorldComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HelloWorldComponent,
        HelloWorldComponentWrapper
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloWorldComponentWrapper);
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
