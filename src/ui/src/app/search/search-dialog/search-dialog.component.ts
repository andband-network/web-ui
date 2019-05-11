import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';

import { AppStorage } from '../../common/util/app-storage';
import { DialogService } from '../../common/component/dialog/dialog.service';
import { AuthService } from '../../common/service/auth/auth.service';

@Component({
  selector: 'search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  isLoggedIn: boolean;
  canSearchRange: boolean;
  searchLocationRange: boolean;
  keyWords: string;
  rangeInKilometers: number;

  constructor(private dialogRef: MatDialogRef<SearchDialogComponent>,
              private router: Router,
              private authService: AuthService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    const profile: Profile = AppStorage.getProfile();
    if (this.isLoggedIn && profile.showLocation && profile.location.lat !== 0 && profile.location.lng !== 0) {
      this.canSearchRange = true;
    }
  }

  search(searchForm): void {
    const keyWords: Array<string> = searchForm.keyWords.split(' ');
    const navigationExtras: NavigationExtras = {
      queryParams: {
        keyWords: keyWords,
        rangeInKilometers: searchForm.rangeInKilometers
      }
    };
    this.dialogRef.close();
    this.router.navigate(['/search-results'], navigationExtras);
  }

  showLocationRangeMessage(): void {
    this.dialogService.showModelDialog('You must set your profiles location and make it visible to search by location range', 'OK');
  }

  close(): void {
    this.dialogRef.close();
  }

}
