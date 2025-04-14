import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import '../common/global-extension';
import { env } from '../common/environment/environment';
import { enableProdMode } from '@angular/core';

if (env.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
