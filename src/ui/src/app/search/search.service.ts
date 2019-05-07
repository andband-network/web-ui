import { Injectable } from '@angular/core';
import { HttpService } from "../common/service/http/http.service";
import { HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { AppStorage } from '../common/util/app-storage';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpService) {
  }

  searchProfiles(keyWords: Array<string>) {
    const path: string = '/profiles/search';
    const searchParams = SearchService.getSearchParams(keyWords);
    const httpOptions = {
      params:  new HttpParams()
        .set('searchParams', searchParams)
    };
    return this.http.get(path, httpOptions);
  }

  searchProfilesWithRange(keyWords: Array<string>, rangeInKilometers: number) {
    const profileId: string = AppStorage.getProfileId();
    let path: string = '/profiles/'+ profileId + '/search-range';
    const searchParams = SearchService.getSearchParams(keyWords);
    const httpOptions = {
      params:  new HttpParams()
        .set('searchParams', searchParams)
        .set('rangeInKilometers', String(rangeInKilometers))
    };
    return this.http.get(path, httpOptions);
  }

  private static getSearchParams(keyWords): string {
    let searchParams: string;
    if (typeof keyWords !== 'string') {
      searchParams = keyWords.join(',');
    } else {
      searchParams = keyWords;
    }
    return searchParams;
  }

}
