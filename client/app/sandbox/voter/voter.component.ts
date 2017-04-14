import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html'
})
export class VoterComponent {

  @Input() name;
  @Output() onVoted = new EventEmitter();

  voted = false;

  vote(agree: boolean) {
    this.voted = true;
    this.onVoted.next(agree);
  }

  reset() {
    this.voted = false;
  }

}
