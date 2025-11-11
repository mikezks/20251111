import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';
import { authInterceptor, provideAuthInterceptor } from './shared/logic-communication/auth/auth.interceptor';
import { provideRouterFeature } from './shared/logic-router-state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
      // withDebugTracing(),
      // withPreloading(PreloadAllModules)
    ),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authInterceptor]),
    ),
    provideAuthInterceptor(),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideStoreDevtools()
  ]
};
