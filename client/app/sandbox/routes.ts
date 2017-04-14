import { Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { MissionControlComponent } from './mission-control/mission-control.component';
import { VoteTakerComponent } from './vote-taker/vote-taker.component';

export const SandboxRoutes: Routes = [{
  path: '',
  component: IndexComponent
}, {
  path: 'voting',
  component: VoteTakerComponent
}, {
  path: 'mission-control',
  component: MissionControlComponent
}];
