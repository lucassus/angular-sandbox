import { Component, ContentChild, forwardRef } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent {

  @ContentChild(forwardRef(() => MovieDescriptionComponent))
  private descriptionComponent: MovieDescriptionComponent;

  hasDescription(): boolean {
    return this.descriptionComponent !== undefined;
  }

}

@Component({
  selector: 'app-movie-description',
  template: '<ng-content></ng-content>'
})
export class MovieDescriptionComponent { }
