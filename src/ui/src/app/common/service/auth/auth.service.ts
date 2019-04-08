import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) {
  }

  login(credentials) {
    const uri: string = AuthService.getAuthUri();
    const requestBody = null;
    const httpOptions = {
      headers: AuthService.getLoginHeaders(),
      params: AuthService.getAuthParams(credentials)
    };

    return this.http.post(uri, requestBody, httpOptions)
      .pipe(map(response => {
        if (response) {
          // @ts-ignore
          AuthService.setAccessToken(response.access_token);
        }
        return response != null;
      }));
  }

  static getAuthUri(): string {
    return '/auth/oauth/token';
  }

  static getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  private static setAccessToken(accessToken: string) {
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
