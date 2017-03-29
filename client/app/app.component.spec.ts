import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterOutlet, RouterOutletMap } from '@angular/router';

describe('AppComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterOutlet
      ],
      providers: [
        RouterOutletMap
      ]
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
