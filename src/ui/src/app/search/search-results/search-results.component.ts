import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '../search.service';
import { DomainInfo } from '../../common/util/domain-info';
import { ProgressSpinnerService } from '../../common/service/progress-spinner/progress-spinner.service';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchResults: Array<Profile>;
  imagesUri: string;

  constructor(private route: ActivatedRoute, private spinner: ProgressSpinnerService, private searchService: SearchService) {
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
