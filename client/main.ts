import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Store } from '@ngrx/store';

import { AppModule } from './app/app.module';
import { Config } from './app/config';
import './rxjs-operators';

function fetchConfig(): Promise<Config> {
  return fetch('/api/config').then((response: Response) => {
    return response.json();
  }).then((data: any) => {
    return new Config(data);
  });
}

fetchConfig().then((config) => {
  console.log(`Sandbox is running in the ${config.environment} mode.`);

  if (config.environment === 'production') {
    enableProdMode();
  }

  platformBrowserDynamic([
    { provide: Config, useValue: config }
  ]).bootstrapModule(AppModule).then((ref) => {
    const store = ref.injector.get(Store);

    store
      .select((state) => state.session.authenticated)
      .subscribe((authenticated) => {
        console.log('Authenticated:', authenticated);
      });
  });
});
