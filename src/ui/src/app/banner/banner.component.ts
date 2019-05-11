import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AuthService } from '../common/service/auth/auth.service';
import { SearchDialogComponent } from '../search/search-dialog/search-dialog.component';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  activeRoute: string;

  constructor(private router: Router, private authService: AuthService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.router.events.subscribe(value => {
      if (value.constructor.name === 'NavigationEnd') {
        // @ts-ignore
        this.activeRoute = value.url;
      }
    })
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  search(): void {
    this.dialog.open(SearchDialogComponent);
  }

  logOut(): void {
    AuthService.logOut();
    this.router.navigate(['/']);
  }

}
