import { Component, ContentChild, forwardRef } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html'
})
export class MyComponentComponent {

  @ContentChild(forwardRef(() => MyComponentContentComponent)) content: MyComponentContentComponent;

  hasContent(): boolean {
    return this.content !== undefined;
  }

}

@Component({
  selector: 'app-my-component-content',
  template: '<ng-content></ng-content>'
})
export class MyComponentContentComponent {

}
