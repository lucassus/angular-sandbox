import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent {

  movies: any = [{
    title: 'Star Wars: A New Hope'
  }, {
    title: 'Star Wars: Return of the Jedi',
    description: `
      Return of the Jedi (also known as Star Wars: Episode VI – Return of the Jedi)
      is a 1983 American epic space opera film directed by Richard Marquand.
    `
  }];

}
