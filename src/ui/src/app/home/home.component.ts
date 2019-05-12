import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../common/service/http/http.service';
import { AuthService } from '../common/service/auth/auth.service';
import { AppStorage } from '../common/util/app-storage';
import { ProgressSpinnerService } from '../common/service/progress-spinner/progress-spinner.service';
import { DialogService } from '../common/component/dialog/dialog.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router,
              private spinner: ProgressSpinnerService,
              private http: HttpService,
              private authService: AuthService,
              private dialogService: DialogService) {
  }

  login(credentials): void {
    this.spinner.show();
    this.authService.login(credentials)
      .subscribe(() => {
        this.loadProfileDetails()
      }, () => {
        this.spinner.hide();
        this.dialogService.showModelDialog("The login credentials you enter are incorrect", "Close");
      });
  }

  private loadProfileDetails() {
    this.http.get('/profiles')
      .subscribe(profile => {
        // @ts-ignore
        AppStorage.setProfile(profile);
        this.spinner.hide();
        this.router.navigate(['/profile']);
      }, error => {
        console.log(error);
      });
  }

}
