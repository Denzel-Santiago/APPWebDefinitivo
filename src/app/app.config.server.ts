import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    HttpClientModule, // Asegurar que HttpClientModule esté incluido
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
