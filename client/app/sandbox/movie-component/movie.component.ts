import { Component, ContentChild, forwardRef } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent {

  @ContentChild(forwardRef(() => MovieDescriptionComponent))
  description: MovieDescriptionComponent;

  hasDescription(): boolean {
    return this.description !== undefined;
  }

}

@Component({
  selector: 'app-movie-description',
  template: '<ng-content></ng-content>'
})
export class MovieDescriptionComponent { }
