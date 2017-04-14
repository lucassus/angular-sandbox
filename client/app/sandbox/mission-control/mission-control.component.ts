import { Component } from '@angular/core';

import { MissionService } from '../mission.service';

@Component({
  selector: 'app-mission-control',
  templateUrl: './mission-control.component.html'
})
export class MissionControlComponent {

  astronauts = ['Lovell', 'Swigert', 'Haise', 'Lucassus'];

  history: string[] = [];

  private missions = [
    'Fly to the moon!',
    'Fly to mars!',
    'Fly to Vegas!'
  ];
  private nextMissionIndex = 0;

  constructor(private missionService: MissionService) {
    missionService.missionConfirmed$.subscribe((astronaut) => {
      this.history.push(`${astronaut} confirmed the mission`);
    });
  }

  announce() {
    const mission = this.missions[this.nextMissionIndex++];
    this.missionService.announceMission(mission);
    this.history.push(`Mission "${mission}" announced`);

    if (this.nextMissionIndex >= this.missions.length) {
      this.nextMissionIndex = 0;
    }
  }

}
