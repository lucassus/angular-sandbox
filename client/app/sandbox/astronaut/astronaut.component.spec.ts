import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionService } from '../mission.service';
import { AstronautComponent } from './astronaut.component';

describe('AstronautComponent', () => {

  let component: AstronautComponent;
  let fixture: ComponentFixture<AstronautComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MissionService],
      declarations: [AstronautComponent]
    });

    fixture = TestBed.createComponent(AstronautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
