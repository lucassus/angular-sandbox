import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sizer',
  templateUrl: './sizer.component.html'
})
export class SizerComponent {

  @Input() size: number;

  @Output()
  private sizeChange = new EventEmitter<number>();

  increment() {
    this.resize(+1);
  }

  decrement() {
    this.resize(-1);
  }

  private resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }

}
