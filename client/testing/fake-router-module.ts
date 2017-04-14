import { NgModule } from '@angular/core';

import { FakeRouterLinkDirective } from './router-stubs';

/**
 * Needed so that `aot` build is working.
 * But it isn't used throughout our tests and/or app.
 */
@NgModule({
  declarations: [
    FakeRouterLinkDirective
  ]
})
export class FakeRouterModule { }
