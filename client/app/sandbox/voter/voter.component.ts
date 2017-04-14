import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html'
})
export class VoterComponent {

  @Input() name;
  @Output() private onVoted = new EventEmitter();

  private _voted = false;

  vote(agree: boolean) {
    this._voted = true;
    this.onVoted.next(agree);
  }

  get voted() {
    return this._voted;
  }

  reset() {
    this._voted = false;
  }

}
