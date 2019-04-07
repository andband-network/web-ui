import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenStore } from "../auth/token-store.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  get(uri: string) {
    const apiUri: string = HttpService.getApiUrl();
    const requestUri: string = apiUri + uri;

    const httpOptions = {
      headers: HttpService.getHttpHeaders()
    };

    return this.http.get(requestUri, httpOptions);
  }

  post(uri: string, requestBody: any | null, httpOptions?) {
    const apiUri: string = HttpService.getApiUrl();
    const requestUri: string = apiUri + uri;

    if (!httpOptions) {
      httpOptions = {};
    }

    HttpService.addHeaders(httpOptions);

    return this.http.post(requestUri, requestBody, httpOptions);
  }

  static getApiUrl(): string {
    // @ts-ignore
    return document.querySelector("meta[name='apiUri']").content;
  }

  private static addHeaders(httpOptions) {
    const token: string = localStorage.getItem('access_token');
    let headers: HttpHeaders = httpOptions.headers;
    if (headers) {
      headers.append('Authorization', 'Bearer ' + token)
    } else {
      httpOptions.headers = this.getHttpHeaders();
    }
  }

  private static getHttpHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();

    const accessToken: string = TokenStore.getAccessToken();
    if (accessToken) {
      headers = headers.append('Authorization', 'Bearer ' + accessToken);
    }

    return headers;
  }

}
