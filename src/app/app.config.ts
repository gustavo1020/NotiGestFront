import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpRequestInterceptor } from '../app/interceptor/http-request.interceptor'
import { SearchComponent } from './components/search/search.component';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([httpRequestInterceptor])), importProvidersFrom([BrowserAnimationsModule]), SearchComponent]
};
