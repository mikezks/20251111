import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';
import { provideRouterFeature } from './shared/logic-router-state';
import { provideBaseUrl, provideInitConfig } from './app.provider';
import { provideNavigationService } from './shared/logic-navigation';
import { APP_NAVIGATION } from './app.navigation';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
    ),
    provideHttpClient(
      // withInterceptors([authInterceptor]),
    ),
    provideBaseUrl('https://demo.angulararchitects.io/api/'),
    provideNavigationService(APP_NAVIGATION),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideStoreDevtools()
  ]
};
