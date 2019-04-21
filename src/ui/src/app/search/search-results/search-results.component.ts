import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchService } from '../search.service';
import { DomainInfo } from '../../common/util/domain-info';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  private searchResults: Array<Profile>;
  private imagesUri: string;

  constructor(private route: ActivatedRoute, private router: Router, private searchService: SearchService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const keyWords: Array<string> = params.keyWords;
      if (keyWords) {
        this.searchService.searchProfiles(keyWords)
          .subscribe(response => {
            // @ts-ignore
            this.searchResults = response;
          });
      }
      this.imagesUri = DomainInfo.getImagesUri();
    });
  }

}
