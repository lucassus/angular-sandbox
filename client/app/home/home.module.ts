import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HelloWorldComponent } from './hello-world/hello-world.component';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HelloWorldComponent,
    IndexComponent,
    HomeComponent
  ]
})
export class HomeModule { }
