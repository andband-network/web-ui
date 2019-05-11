import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';

import { AppStorage } from '../../common/util/app-storage';
import { DialogService } from '../../common/component/dialog/dialog.service';

@Component({
  selector: 'search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit{

  canSearchRange: boolean;
  searchLocationRange: boolean;
  keyWords: string;
  rangeInKilometers: number;

  constructor(private dialogRef: MatDialogRef<SearchDialogComponent>, private router: Router, private dialogService: DialogService) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.canSearchRange = AppStorage.getLocationSearchEnabled();
  }

  search(searchForm) {
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

  showLocationRangeMessage() {
    this.dialogService.showModelDialog('You must set you profiles location and make it visible to search by location range', 'OK');
  }

  close() {
    this.dialogRef.close();
  }

}
