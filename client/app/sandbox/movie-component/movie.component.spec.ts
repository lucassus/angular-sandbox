import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MovieComponent, MovieDescriptionComponent } from './movie.component';

@Component({
  template: ''
})
class TestComponent {
  movie = {
    title: 'Star Wars',
    description: 'Epic space opera.'
  };
}

class Page {

  constructor(
    private fixture: ComponentFixture<TestComponent>
  ) { }

  get movieTitleDe() {
    return this.fixture.debugElement.query(
      By.css('dl dd:nth-of-type(1)'));
  }

  get movieDescriptionDe() {
    return this.fixture.debugElement.query(
      By.css('dl dd:nth-of-type(2)'));
  }

}

describe('AppMovieComponent', () => {

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let page: Page;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MovieComponent,
        MovieDescriptionComponent,
        TestComponent
      ]
    });
  });

  function createTestComponent(set: Component) {
    fixture = TestBed.overrideComponent(TestComponent, { set })
      .createComponent(TestComponent);

    component = fixture.componentInstance;
    page = new Page(fixture);

    fixture.detectChanges();
  }

  describe('whe the description is inserted', () => {

    beforeEach(() => {
      createTestComponent({ template: `
        <app-movie>
          <span class="app-movie-title">
            Title: {{movie.title}}
          </span>
        
          <app-movie-description>
            {{movie.description}}
          </app-movie-description>
        </app-movie>
      `});
    });

    it('should display movie title', () => {
      expect(page.movieTitleDe.nativeElement.textContent)
        .toContain('Star Wars');
    });

    it('should display movie description', () => {
      expect(fixture.debugElement.query
        (By.directive(MovieDescriptionComponent)).nativeElement.textContent)
          .toContain('Epic space opera');

      expect(page.movieDescriptionDe.nativeElement.textContent)
        .toContain('Epic space opera');
    });

  });

  describe('when the description is not given', () => {

    beforeEach(() => {
      createTestComponent({ template: `
        <app-movie>
          <span class="app-movie-title">
            Title: {{movie.title}}
          </span>
        </app-movie>
      `});
    });

    it('should hide the description', () => {
      expect(page.movieDescriptionDe.nativeElement.textContent)
        .toContain('Description is not present');
    });

  });

});
