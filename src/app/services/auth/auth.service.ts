import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ILogin } from '../../model/login';
import { CONST_VARIABLES } from '../../@const/variables';
import { IToken } from '../../model/token';
import { IProfileRequest, IProfileResponse } from '../../model/profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = {
    login: 'auth/login',
    profile: 'auth/profile',
  };

  constructor(private http: HttpClient) {}

  login(login: ILogin): Observable<IToken> {
    return this.http.post<IToken>(
      `${CONST_VARIABLES.API_ENDPOINT}/${this.url.login}`,
      login
    );
  }
  profile(): Observable<IProfileResponse> {
    return this.http.get<IProfileResponse>(
      `${CONST_VARIABLES.API_ENDPOINT}/${this.url.profile}`
    );
  }
}
