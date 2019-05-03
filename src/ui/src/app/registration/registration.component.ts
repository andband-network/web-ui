import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from '../common/service/http/http.service';
import { ProgressSpinnerService } from '../common/service/progress-spinner/progress-spinner.service';
import { DialogService } from '../common/component/dialog/dialog.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private spinner: ProgressSpinnerService,
              private http: HttpService,
              private dialogService: DialogService) {
  }

  ngOnInit() {
    this.spinner.show();
    const token: string = this.route.snapshot.paramMap.get('token');
    const path: string = '/register/confirm/' + token;
    this.http.post(path)
      .subscribe(() => {
        this.spinner.hide();
        this.showConfirmationDialog();
      });
  }

  private showConfirmationDialog() {
    const messageText: string = 'You are now registered with AndBand';
    const buttonText: string = 'Go to login page';
    this.dialogService.showModelDialog(messageText, buttonText)
      .afterClosed()
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }

}
