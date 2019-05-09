import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';

import { HttpService } from '../../common/service/http/http.service';
import { AppStorage } from '../../common/util/app-storage';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit{

  canSearchRange: boolean;
  keyWords: string;
  rangeInKilometers: number;

  constructor(private dialogRef: MatDialogRef<SearchDialogComponent>, private router: Router, private http: HttpService) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.canSearchRange = AppStorage.getLocationSearchEnabled();
  }

  search() {
    const keyWords: Array<string> = this.keyWords.split(' ');
    const navigationExtras: NavigationExtras = {
      queryParams: {
        keyWords: keyWords,
        rangeInKilometers: this.rangeInKilometers
      }
    };
    this.dialogRef.close();
    this.router.navigate(['/search-results'], navigationExtras);
  }

  close() {
    this.dialogRef.close();
  }

}
