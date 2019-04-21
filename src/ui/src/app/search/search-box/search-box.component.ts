import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  private search(searchForm) {
    const keyWords: Array<string> = searchForm.keyWords.split(' ');
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'keyWords': keyWords
      }
    };
    this.router.navigate(['/search-results'], navigationExtras);
  }

}
