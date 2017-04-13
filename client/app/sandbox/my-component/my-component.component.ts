import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html'
})
export class MyComponentComponent {

}

@Component({
  selector: 'app-my-component-content',
  template: '<ng-content></ng-content>'
})
export class MyComponentContentComponent {

}
