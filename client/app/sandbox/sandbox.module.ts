import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { MovieComponent, MovieDescriptionComponent } from './movie-component/movie.component';
import { SandboxRoutes } from './routes';
import { VoteTakerComponent } from './vote-taker/vote-taker.component';
import { VoterComponent } from './voter/voter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SandboxRoutes)
  ],
  declarations: [
    IndexComponent,
    MovieComponent,
    MovieDescriptionComponent,
    VoteTakerComponent,
    VoterComponent
  ]
})
export class SandboxModule { }
