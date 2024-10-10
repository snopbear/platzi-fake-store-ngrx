import { exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { isLoggedInSelector } from '../State/login/login-selectors/login-selectors';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
        debugger
    const authenticate = this.localStorageService.getItem('access_token')
      ? true
      : false;

        if (!authenticate) {
          return this.router.createUrlTree(['login']);
        }
        return true;
  }
}
