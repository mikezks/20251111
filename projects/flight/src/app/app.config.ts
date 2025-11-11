import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';
import { provideRouterFeature } from './shared/logic-router-state';
import { provideBaseUrl } from './app.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
    ),
    provideHttpClient(
      // withInterceptors([authInterceptor]),
    ),
    provideBaseUrl('https://demo.angulararchitects.io/api/'),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideStoreDevtools()
  ]
};
