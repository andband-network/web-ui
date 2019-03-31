import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  post(uri: string, requestBody: any | null, httpOptions?) {
    const apiUri: string = HttpService.getApiUrl();
    const requestUri: string = apiUri + uri;
    console.log('requestUri');
    console.log(requestUri);
    console.log('requestBody');
    console.log(requestBody);
    console.log('httpOptions');
    console.log(httpOptions);

    return this.http.post(requestUri, requestBody, httpOptions);
  }

  private static getApiUrl(): string {
    // @ts-ignore
    return document.querySelector("meta[name='apiUri']").content;
  }

}
