import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AstronautComponent } from './astronaut/astronaut.component';
import { IndexComponent } from './index/index.component';
import { MissionControlComponent } from './mission-control/mission-control.component';
import { MissionService } from './mission.service';
import { MovieComponent, MovieDescriptionComponent } from './movie-component/movie.component';
import { SandboxRoutes } from './routes';
import { SizerComponent } from './sizer/sizer.component';
import { VoteTakerComponent } from './vote-taker/vote-taker.component';
import { VoterComponent } from './voter/voter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SandboxRoutes)
  ],
  providers: [
    MissionService
  ],
  declarations: [
    IndexComponent,
    MovieComponent,
    MovieDescriptionComponent,
    VoteTakerComponent,
    VoterComponent,
    MissionControlComponent,
    AstronautComponent,
    SizerComponent
  ]
})
export class SandboxModule { }
