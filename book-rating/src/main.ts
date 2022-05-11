import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
.catch(err => console.error(err));


/*
// TypeScript Playground
import { Customer } from 'ts-playground/customer';

const myCustomer = new Customer(3);
myCustomer.fooBar(3);
*/
