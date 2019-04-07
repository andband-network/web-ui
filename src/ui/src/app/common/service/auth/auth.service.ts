import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { TokenStore } from "./token-store.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) {
  }

  login(credentials) {
    const uri: string = '/auth/oauth/token';
    const requestBody = null;
    const httpOptions = {
      headers: AuthService.getLoginHeaders(),
      params: AuthService.getAuthParams(credentials)
    };

    return this.http.post(uri, requestBody, httpOptions)
      .pipe(map(response => {
        if (response) {
          // @ts-ignore
          TokenStore.setAccessToken(response.access_token);
        }
        return response != null;
      }));
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
