import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AuthService } from './common/service/auth/auth.service';
import { AppStorage } from './common/util/app-storage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private authService: AuthService) {
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      AppStorage.clear();
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut(): void {
    AuthService.logOut();
    this.router.navigate(['/']);
  }

}
