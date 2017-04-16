import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GreeterService, greeterWithPrefix } from './greeter.service';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index/index.component';
import { HomeRoutes } from './routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(HomeRoutes)
  ],
  providers: [
    greeterWithPrefix('Witaj')
  ],
  declarations: [
    HelloWorldComponent,
    IndexComponent,
    HomeComponent
  ]
})
export class HomeModule {

  constructor(private greeter: GreeterService) {
    console.info(greeter.greet('Lucassus'));
  }

}
