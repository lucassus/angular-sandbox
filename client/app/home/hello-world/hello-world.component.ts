import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html'
})
export class HelloWorldComponent implements OnChanges {

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

  ngOnChanges(changes: SimpleChanges): void {
    // TODO replace with toastr
    // console.log('HelloWorldComponent.ngOnChanges', changes);
  }

}
