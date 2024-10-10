import { Route, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ProductListComponent } from './product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'product-list',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'product-list',
    loadComponent: () =>
      import('./product-list/product-list.component').then((m) => m.ProductListComponent),
  },
  {
    path: 'product-list-entity',
    loadComponent: () =>
      import('./peoduct-list-entity/peoduct-list-entity.component').then((m) => m.PeoductListEntityComponent),
  },

];

