import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterOutlet, RouterOutletMap } from '@angular/router';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterOutlet
      ],
      providers: [
        RouterOutletMap
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
