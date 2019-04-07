import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStore {

  constructor() {
  }

  static setAccessToken(accessToken: string) {
    localStorage.setItem('access_token', accessToken);
  }

  static getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

}
