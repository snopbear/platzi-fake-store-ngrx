import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';



import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { LoginEffect } from './State/login/login-effects/login-effects';
import { LoginReducer } from './State/login/login-reducers/login-reducers';
import { AppEffects } from './State/common/app.effects';
import { AuthInterceptor } from './interceptor/auth/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProductEffects } from './State/product-regular/product-effects/product-effects';
import { ProductReducer } from './State/product-regular/product-reducers/product-reducers';
import { ProductEntityEffects } from './State/product-entity/product-entity-effects/product-entity-effects';
import { ProductEntityReducer } from './State/product-entity/product-entity-reducers/product-entity-reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),
    provideAnimationsAsync(),
    provideEffects([AppEffects]),
    provideEffects([LoginEffect]),
    provideState({ name: 'login', reducer: LoginReducer }),
    provideEffects([ProductEffects]),
    provideState({ name: 'product', reducer: ProductReducer }),
    provideEffects([ProductEntityEffects]),
    provideState({ name: 'productEntity', reducer: ProductEntityReducer }),
  ],
};
