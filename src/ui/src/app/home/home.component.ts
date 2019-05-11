import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../common/service/http/http.service';
import { AuthService } from '../common/service/auth/auth.service';
import { AppStorage } from '../common/util/app-storage';
import { ProgressSpinnerService } from '../common/service/progress-spinner/progress-spinner.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router,
              private spinner: ProgressSpinnerService,
              private http: HttpService,
              private authService: AuthService) {
  }

  login(credentials): void {
    this.spinner.show();
    this.authService.login(credentials)
      .subscribe(() => {
        this.getProfileDetails()
      });
  }

  private getProfileDetails() {
    this.http.get('/profiles')
      .subscribe(profile => {
        // @ts-ignore
        HomeComponent.setAppStorageValues(profile);
        this.spinner.hide();
        this.router.navigate(['/profile']);
      }, error => {
        console.log(error);
      });
  }

  private static setAppStorageValues(profile: Profile) {
    AppStorage.setProfileId(profile.id);
    if (profile.showLocation && profile.location.lat !== 0 && profile.location.lng !== 0) {
      AppStorage.setLocationSearchEnabled(true);
    }
  }

}
