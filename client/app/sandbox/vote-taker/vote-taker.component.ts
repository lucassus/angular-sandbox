import { Component, QueryList, ViewChildren } from '@angular/core';
import { VoterComponent } from '../voter/voter.component';

@Component({
  selector: 'app-vote-taker',
  templateUrl: './vote-taker.component.html'
})
export class VoteTakerComponent {

  @ViewChildren(VoterComponent)
  private voterComponents: QueryList<VoterComponent>;

  private agreed = 0;
  private disagreed = 0;

  private voters = ['Mr. IQ', 'Ms. Universe', 'Bombasto'];

  onVoted(agreed: boolean) {
    agreed ? this.agreed++ : this.disagreed++;
  }

  canResetVotes() {
    if (this.voterComponents === undefined) {
      return false;
    }

    // At least one voter has voted
    return this.voterComponents.find((component) => {
      return component.voted;
    });
  }

  resetVotes() {
    this.agreed = 0;
    this.disagreed = 0;

    this.voterComponents.forEach((component) => {
      component.reset();
    });
  }

}
