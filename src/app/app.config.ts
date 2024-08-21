import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps';
import { authInterceptor } from './interceptors/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimations(),
    importProvidersFrom(
      BrowserModule,
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
<<<<<<< HEAD
<<<<<<< HEAD
      BrowserAnimationsModule,
    ),
    
=======
      BrowserAnimationsModule
    ),
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
=======
      BrowserAnimationsModule
    ),
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
  ],
};
