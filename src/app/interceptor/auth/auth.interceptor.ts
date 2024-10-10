import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

export const AuthInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.getItem('access_token');
  const clonedReq = req.clone({
    setHeaders: {
      accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return next(clonedReq);

  return next(req);
};
