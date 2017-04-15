import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sizer',
  templateUrl: './sizer.component.html'
})
export class SizerComponent {

  @Input() size: number;

  increment() {
    this.resize(this.size + 1);
  }

  decrement() {
    this.resize(this.size - 1);
  }

  private resize(size) {
    this.size = size;
  }

}
