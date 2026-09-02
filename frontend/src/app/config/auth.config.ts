import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

// Importas la configuración desde tu carpeta config
import { msalConfig } from './config/auth.config'; 
import { PublicClientApplication } from '@azure/msal-browser';
import { MSAL_INSTANCE, MsalService, MsalGuard, MsalBroadcastService } from '@azure/msal-angular';

export function MSALInstanceFactory() {
  return new PublicClientApplication(msalConfig);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(), // Habilita peticiones HTTP
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ]
};  