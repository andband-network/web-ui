import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../common/service/http/http.service';
import { AuthService } from '../common/service/auth/auth.service';
import { AppStorage } from '../common/util/app-storage';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private http: HttpService, private authService: AuthService) {
  }

  ngOnInit() {
  }

  login(credentials): void {
    this.authService.login(credentials)
      .subscribe(() => {
        this.http.get('/profiles')
          .subscribe(profile => {
            // @ts-ignore
            AppStorage.setProfileId(profile.id);
            this.router.navigate(['/profile']);
          });
      });
  }

  resister(userDetails) {
    const path: string = '/register/signup';
    return this.http.post(path, userDetails)
      .subscribe(() => {
        alert('user created');
      });
  }

}
