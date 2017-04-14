import { TestBed } from '@angular/core/testing';

import { MissionService } from './mission.service';

describe('MissionService', () => {

  let missionService: MissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MissionService]
    });

    missionService = TestBed.get(MissionService);
  });

  describe('.announceMission', () => {

    it('announces the mission', () => {
      missionService.missionAnnounced$.subscribe((mission) => {
        expect(mission).toEqual('Learn Angular!');
      });

      missionService.announceMission('Learn Angular!');
    });

  });

  describe('.confirmMission', () => {

    it('confirms the mission', () => {
      missionService.missionConfirmed$.subscribe((astronaut) => {
        expect(astronaut).toEqual('Luke');
      });

      missionService.confirmMission('Luke');
    });

  });

});
