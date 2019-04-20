import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  get(path: string) {
    const requestUri: string = HttpService.getRequestUri(path);
    return this.http.get(requestUri);
  }

  post(path: string, requestBody: any | null, httpOptions?) {
    const requestUri: string = HttpService.getRequestUri(path);
    return this.http.post(requestUri, requestBody, httpOptions);
  }

  put(path: string, requestBody: any | null, httpOptions?) {
    const requestUri: string = HttpService.getRequestUri(path);
    return this.http.put(requestUri, requestBody, httpOptions);
  }

  static getRequestUri(resourcePath: string):string {
    return HttpService.getApiUri() + resourcePath;
  }

  static getApiUri(): string {
    // @ts-ignore
    return document.querySelector("meta[name='apiUri']").content;
  }

  static getApiDomain(): string {
    const protocolRegex: RegExp = /(http|https):\/\//;
    return this.getApiUri().replace(protocolRegex, '')
  }

}
