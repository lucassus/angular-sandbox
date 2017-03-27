import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelloWorldComponent } from './hello-world/hello-world.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HelloWorldComponent,
    IndexComponent
  ]
})
export class HomeModule { }
