import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService, private jwtHelper: JwtHelperService) {
  }

  login(credentials) {
    const path: string = AuthService.getAuthPath();
    const requestBody = null;
    const httpOptions = {
      headers: AuthService.getLoginHeaders(),
      params: AuthService.getAuthParams(credentials)
    };

    return this.http.post(path, requestBody, httpOptions)
      .pipe(map(response => {
        if (response) {
          // @ts-ignore
          AuthService.setAccessToken(response.access_token);
        }
        return response != null;
      }));
  }

  isLoggedIn(): boolean {
    let isLoggedIn: boolean = false;
    const token: string = AuthService.getAccessToken();

    if (token) {
      const tokenExpired: boolean = this.jwtHelper.isTokenExpired(token);
      isLoggedIn = !tokenExpired;
    }

    return isLoggedIn;
  }

  static signOut(): void {
    localStorage.removeItem('access_token');
  }

  static getAuthPath(): string {
    return '/auth/oauth/token';
  }

  static getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  private static setAccessToken(accessToken: string): void {
    localStorage.setItem('access_token', accessToken);
  }

  private static getLoginHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Basic ' + btoa('web:web-secret')
    })
  }

  private static getAuthParams(credentials): HttpParams {
    return new HttpParams()
      .append("grant_type", "password")
      .append("username", credentials.email)
      .append("password", credentials.password);
  }

}
