import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DomainInfo } from '../../util/domain-info';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  get(path: string, httpOptions?): Observable<ArrayBuffer> {
    const requestUri: string = HttpService.getRequestUri(path);
    return this.http.get(requestUri, httpOptions);
  }

  post(path: string, requestBody?: any | null, httpOptions?): Observable<ArrayBuffer> {
    const requestUri: string = HttpService.getRequestUri(path);
    return this.http.post(requestUri, requestBody, httpOptions);
  }

  put(path: string, requestBody?: any | null, httpOptions?): Observable<ArrayBuffer> {
    const requestUri: string = HttpService.getRequestUri(path);
    return this.http.put(requestUri, requestBody, httpOptions);
  }

  delete(path: string, httpOptions?): Observable<ArrayBuffer> {
    const requestUri: string = HttpService.getRequestUri(path);
    return this.http.delete(requestUri, httpOptions);
  }

  private static getRequestUri(resourcePath: string): string {
    return DomainInfo.getApiUri() + resourcePath;
  }

}
