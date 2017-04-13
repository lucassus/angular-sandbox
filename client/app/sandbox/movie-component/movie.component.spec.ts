import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';

describe('AppMovieComponent', () => {

  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
