import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  get(uri: string) {
    const apiUri: string = HttpService.getApiUrl();
    const requestUri: string = apiUri + uri;

    return this.http.get(requestUri);
  }

  post(uri: string, requestBody: any | null, httpOptions?) {
    const apiUri: string = HttpService.getApiUrl();
    const requestUri: string = apiUri + uri;

    return this.http.post(requestUri, requestBody, httpOptions);
  }

  static getApiUrl(): string {
    // @ts-ignore
    return document.querySelector("meta[name='apiUri']").content;
  }

  static getApiDomain(): string {
    const protocolRegex: RegExp = /(http|https):\/\//;
    return this.getApiUrl().replace(protocolRegex, '')
  }

}
