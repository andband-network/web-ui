import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../common/service/http/http.service';
import { AuthService } from '../common/service/auth/auth.service';
import { AppStorage } from '../common/util/app-storage';
import { ProgressSpinnerService } from '../common/service/progress-spinner/progress-spinner.service';
import { DialogService } from '../common/component/dialog/dialog.service';
import { DomainInfo } from '../common/util/domain-info';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private spinner: ProgressSpinnerService,
              private http: HttpService,
              private authService: AuthService,
              private dialogService: DialogService) {
  }

  ngOnInit() {
    HomeComponent.createRecaptchaElement();
  }

  private static createRecaptchaElement() {
    const recaptchaKey: string = DomainInfo.getRecaptchaKey();
    const recaptchaElement: string = '<div class="g-recaptcha" data-sitekey="' + recaptchaKey + '"></div>';
    document.getElementById('g-recaptcha').innerHTML = recaptchaElement;
  }

  login(credentials): void {
    this.spinner.show();
    this.authService.login(credentials)
      .subscribe(() => {
        this.getProfileDetails()
      });
  }

  resister(userDetails) {
    this.spinner.show();
    const path: string = '/register/signup';
    const registrationRequest = this.createRegistrationRequest(userDetails);
    this.http.post(path, registrationRequest)
      .subscribe(() => {
        this.spinner.hide();
        this.showRegistrationEmailSentDialog();
      }, (error) => {
        console.log(error);
        this.spinner.hide();
        this.dialogService.showSystemErrorDialog();
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

  private createRegistrationRequest(userDetails): any {
    // @ts-ignore
    const captchaToken = grecaptcha.getResponse();
    return {
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
      captchaToken: captchaToken
    }
  }

  private showRegistrationEmailSentDialog() {
    const messageText: string = 'We have sent you an email to confirm your registration';
    this.dialogService.showModelDialog(messageText, 'OK');
  }

}
