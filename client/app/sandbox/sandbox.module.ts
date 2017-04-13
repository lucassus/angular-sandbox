import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { MovieComponent, MovieDescriptionComponent } from './movie-component/movie.component';
import { SandboxRoutes } from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SandboxRoutes)
  ],
  declarations: [
    IndexComponent,
    MovieComponent,
    MovieDescriptionComponent
  ]
})
export class SandboxModule { }
