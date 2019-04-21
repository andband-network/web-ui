import { Injectable } from '@angular/core';
import { HttpService } from "../common/service/http/http.service";
import { HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpService) {
  }

  searchProfiles(keyWords: Array<string>) {
    const path: string = '/profiles/search';
    const searchParams: string = keyWords.join(',');
    const httpOptions = {
      params:  new HttpParams()
        .set('searchParams', searchParams)
    };
    return this.http.get(path, httpOptions);
  }

}
