import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MissionService } from '../mission.service';

@Component({
  selector: 'app-astronaut',
  templateUrl: './astronaut.component.html'
})
export class AstronautComponent implements OnDestroy {

  @Input()
  private astronaut: string;

  private mission = '-- no mission announced --';
  private confirmed = false;
  private announced = false;

  private subscription: Subscription;

  constructor(private missionService: MissionService) {
    this.subscription = missionService.missionAnnounced$.subscribe((mission) => {
      this.mission = mission;

      this.announced = true;
      this.confirmed = false;
    });
  }

  confirm() {
    this.confirmed = true;
    this.missionService.confirmMission(this.astronaut);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
