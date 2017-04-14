import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html'
})
export class HelloWorldComponent {

  static DEFAULT_NAME = 'World';

  private _name = HelloWorldComponent.DEFAULT_NAME;

  @Input()
  set name(name: string) {
    this._name = (name && name.trim())
      || HelloWorldComponent.DEFAULT_NAME;
  }

  get name() {
    return this._name;
  }

}
