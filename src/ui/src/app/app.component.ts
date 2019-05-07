import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AuthService } from './common/service/auth/auth.service';
import { AppStorage } from './common/util/app-storage';
import { SearchDialogComponent } from './search/search-dialog/search-dialog.component';
import { DialogService } from './common/component/dialog/dialog.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private authService: AuthService, private dialogService: DialogService) {
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

  openSearchDialog() {
    if (AppStorage.getLocationSearchEnabled()) {
      this.dialog.open(SearchDialogComponent);
    } else {
      this.dialogService.showModelDialog('You must set you profiles location and make it visible to other to search by location range', 'OK');
    }
  }

}
