import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';

// Importa msalConfig y protectedResources desde tu carpeta config
import { msalConfig, protectedResources } from './config/auth.config';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { 
  MSAL_INSTANCE, 
  MSAL_GUARD_CONFIG, 
  MSAL_INTERCEPTOR_CONFIG, 
  MsalService, 
  MsalGuard, 
  MsalBroadcastService, 
  MsalInterceptor, 
  MsalGuardConfiguration, 
  MsalInterceptorConfiguration 
} from '@azure/msal-angular';

export function MSALInstanceFactory() {
  return new PublicClientApplication(msalConfig);
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  // Vincula la URL de tu API con los scopes de Azure AD
  protectedResourceMap.set(protectedResources.todoApi.endpoint, protectedResources.todoApi.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...protectedResources.todoApi.scopes]
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Habilita las peticiones HTTP y los interceptores
    provideHttpClient(withInterceptorsFromDi()), 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ]
};