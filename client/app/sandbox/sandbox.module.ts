import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { MyComponentComponent, MyComponentContentComponent } from './my-component/my-component.component';
import { SandboxRoutes } from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SandboxRoutes)
  ],
  declarations: [
    IndexComponent,
    MyComponentComponent,
    MyComponentContentComponent
  ]
})
export class SandboxModule { }
