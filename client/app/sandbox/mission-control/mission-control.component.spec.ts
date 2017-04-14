import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstronautComponent } from '../astronaut/astronaut.component';
import { MissionService } from '../mission.service';
import { MissionControlComponent } from './mission-control.component';

describe('MissionControlComponent', () => {

  let component: MissionControlComponent;
  let fixture: ComponentFixture<MissionControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MissionService],
      declarations: [
        AstronautComponent,
        MissionControlComponent
      ]
    });

    fixture = TestBed.createComponent(MissionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
