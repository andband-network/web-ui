import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

import { HttpService } from '../http/http.service';
import { AppStorage } from '../../util/app-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService, private jwtHelper: JwtHelperService) {
  }

  login(credentials) {
    const path: string = AuthService.getOAuthTokenPath();
    const requestBody = null;
    const httpOptions = {
      headers: AuthService.getLoginHeaders(),
      params: AuthService.getAuthParams(credentials)
    };

    return this.http.post(path, requestBody, httpOptions)
      .pipe(map(response => {
        if (response) {
          // @ts-ignore
          AppStorage.setAccessToken(response.access_token);
        }
      }));
  }

  isLoggedIn(): boolean {
    let isLoggedIn: boolean = false;
    const token: string = AppStorage.getAccessToken();
    if (token) {
      const tokenExpired: boolean = this.jwtHelper.isTokenExpired(token);
      isLoggedIn = !tokenExpired;
    }
    return isLoggedIn;
  }

  static logOut(): void {
    AppStorage.clear();
  }

  static getOAuthTokenPath(): string {
    return '/auth/oauth/token';
  }

  static getAccessToken(): string {
    return AppStorage.getAccessToken();
  }

  private static getLoginHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Basic ' + btoa('web:web-secret')
    })
  }

  private static getAuthParams(credentials): HttpParams {
    return new HttpParams()
      .append('grant_type', 'password')
      .append('username', credentials.email)
      .append('password', credentials.password);
  }

}
