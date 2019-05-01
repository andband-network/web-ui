import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { HttpService } from '../common/service/http/http.service';
import { AuthService } from '../common/service/auth/auth.service';
import { AppStorage } from '../common/util/app-storage';
import { ConfirmationModalDialogComponent } from '../common/component/confirmation-model-dialog/confirmation-modal-dialog.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private http: HttpService, private authService: AuthService) {
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
    this.http.post(path, userDetails)
      .subscribe(() => {
        this.showRegistrationEmailSentDialog();
      });
  }

  private showRegistrationEmailSentDialog() {
    const dialogConfig: any = {
      data: {
        messageText: 'We have sent you an email to confirm your registration',
        buttonText: 'OK'
      }
    };
    this.dialog.open(ConfirmationModalDialogComponent, dialogConfig);
  }

}
