import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sizer',
  templateUrl: './sizer.component.html'
})
export class SizerComponent {

  @Input() size: number;

  @Output()
  private sizeUpdated = new EventEmitter<number>();

  increment() {
    this.resize(this.size + 1);
  }

  decrement() {
    this.resize(this.size - 1);
  }

  private resize(size) {
    this.size = size;
    this.sizeUpdated.emit(this.size);
  }

}
