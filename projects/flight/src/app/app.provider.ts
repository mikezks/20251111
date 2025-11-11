import { EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders } from "@angular/core";

export const BASE_URL = new InjectionToken<string>('BASE_URL');

export function provideBaseUrl(url: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: BASE_URL,
      useValue: url
    }
  ]);
}

export function injectBaseUrl(suffix: string): string {
  return inject(BASE_URL) + suffix;
}
