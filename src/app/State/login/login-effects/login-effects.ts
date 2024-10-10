import { inject, Inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {
  getCurrentProfileAction,
  getCurrentProfileFailureAction,
  getCurrentProfileSuccessAction,
  loginAction,
  loginSuccessAction,
} from '../login-actions/login-actions';
import { AuthService } from '../../../services/auth/auth.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { IToken } from '../../../model/token';
import { ILogin } from '../../../model/login';
import { showAlert } from '../../common/app.actions';
import { ResultType } from '../../common/result-type.enum';
import { IProfileResponse } from '../../../model/profile';

@Injectable()
export class LoginEffect {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ loginRequest }: { loginRequest: ILogin }) => {
        return this.authService.login(loginRequest).pipe(
          map((token: IToken) => {
            this.localStorageService.setItem(
              'access_token',
              token.access_token
            );
            this.localStorageService.setItem(
              'refresh_token',
              token.refresh_token
            );
            return loginSuccessAction({ token: token });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            //  of(
            //   loginFailureAction({ backendError: errorResponse.error })
            // );
            return of(
              showAlert({
                message: 'You failed to login',
                resultType: ResultType.FAIL,
              })
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          debugger
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  /************************************************************** */

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentProfileAction),
      switchMap(() => {
        const token = this.localStorageService.getItem('access_token');

        if (!token) {
          return of(getCurrentProfileFailureAction());
        }
        return this.authService.profile().pipe(
          map((profileResponse: IProfileResponse) => {
            console.log(profileResponse);
            return getCurrentProfileSuccessAction({ profileResponse });
          }),
          catchError(() => {
            return of(getCurrentProfileFailureAction());
          })
        );
      })
    )
  );

  redirectAfterFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getCurrentProfileFailureAction),
        tap(() => {
          debugger
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
