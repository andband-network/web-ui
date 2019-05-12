import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProgressSpinnerService } from '../common/service/progress-spinner/progress-spinner.service';
import { HttpService } from '../common/service/http/http.service';
import { DialogService } from '../common/component/dialog/dialog.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  token: string;
  hasToken: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private spinner: ProgressSpinnerService,
              private http: HttpService,
              private dialogService: DialogService) {
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');

    if (this.token) {
      this.spinner.show();
      const path: string = '/accounts/reset-password/validate-token/' + this.token;
      this.http.post(path)
        .subscribe(isValid => {
          this.spinner.hide();
          if (isValid) {
            this.hasToken = true;
          } else {
            this.dialogService.showModelDialog('The token is invalid or has expired, please enter you email again', 'OK');
          }
        }, () => {
          this.spinner.hide();
          this.dialogService.showSystemErrorDialog();
        });
    }
  }

  initiatePasswordReset(resetPasswordForm): void {
    this.spinner.show();
    const path: string = '/accounts/forgot-password/' + resetPasswordForm.email;
    this.http.post(path)
      .subscribe(() => {
        this.spinner.hide();
        this.dialogService.showModelDialog('We have sent you an email to reset your password', 'OK');
      }, (error) => {
        this.spinner.hide();
        this.dialogService.showSystemErrorDialog();
      });
  }

  resetPassword(resetPasswordForm): void {
    this.spinner.show();
    const path: string = '/accounts/reset-password/' + this.token + '/' + resetPasswordForm.password;
    this.http.post(path)
      .subscribe(() => {
        this.spinner.hide();
        this.showConfirmationDialog();
      }, (error) => {
        this.spinner.hide();
        this.dialogService.showSystemErrorDialog();
      });
  }

  private showConfirmationDialog() {
    const messageText: string = 'Your password has been reset.';
    const buttonText: string = 'Go to login page';
    this.dialogService.showModelDialog(messageText, buttonText)
      .afterClosed()
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

}
