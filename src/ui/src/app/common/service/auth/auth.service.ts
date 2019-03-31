import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";
import { HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) {
  }

  login(credentials) {
    const uri: string = AuthService.getLoginUri(credentials);
    const httpOptions = {
      headers: AuthService.getAuthHeaders(),
      params: AuthService.getAuthParams(credentials)
    };

    this.http.post(uri, null, httpOptions)
      .subscribe(response => {
        console.log('success');
        console.log(response);
      }, error => {
        console.log('error');
        console.log(error);
      });
  }

  private static getLoginUri(credentials): string {
    return '/auth/oauth/token?grant_type=password&username=' + credentials.email + '&password=' + credentials.password;
  }

  private static getAuthHeaders(): HttpHeaders {
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
