import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../common/service/auth/auth.service';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  activeRoute: string;

  constructor(private router: Router, private authService: AuthService) {
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

}
