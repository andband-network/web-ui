import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { SearchService } from '../search.service';
import { DomainInfo } from '../../common/util/domain-info';
import { ProgressSpinnerService } from '../../common/service/progress-spinner/progress-spinner.service';
import { AppStorage } from '../../common/util/app-storage';
import { ComposeMessageDialogComponent } from '../../messages/compose-message/compose-message-dialog.component';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchResults: Array<Profile>;
  imagesUri: string;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private spinner: ProgressSpinnerService,
              private searchService: SearchService) {
  }

  ngOnInit() {
    this.imagesUri = DomainInfo.getImagesUri();
    this.route.queryParams.subscribe(params => {
      const keyWords: Array<string> = params.keyWords;
      const rangeInKilometers: number = params.rangeInKilometers;
      if (keyWords) {
        this.searchProfiles(keyWords, rangeInKilometers);
      }
    });
  }

  openSendMessageDialog(profile: Profile): void {
    const messageDialogConfig: any = {
      data: {
        senderProfileId: AppStorage.getProfileId(),
        receiverProfileId: profile.id,
        receiverProfileName: profile.name,
      }
    };
    this.dialog.open(ComposeMessageDialogComponent, messageDialogConfig);
  }

  private searchProfiles(keyWords: Array<string>, rangeInKilometers: number) {
    this.spinner.show();
    if (rangeInKilometers) {
      this.searchService.searchProfilesWithRange(keyWords, rangeInKilometers)
        .subscribe(response => {
          // @ts-ignore
          this.searchResults = response;
          this.spinner.hide()
        });
    } else {
      this.searchService.searchProfiles(keyWords)
        .subscribe(response => {
          // @ts-ignore
          this.searchResults = response;
          this.spinner.hide()
        });
    }
  }

}
