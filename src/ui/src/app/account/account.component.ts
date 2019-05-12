import { Component, OnInit } from '@angular/core';

import { HttpService } from '../common/service/http/http.service';
import { ProgressSpinnerService } from '../common/service/progress-spinner/progress-spinner.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  account;

  name: string;
  editName: boolean;
  email: string;
  editEmail: boolean;
  password: string;
  editPassword: boolean;

  constructor(private spinner: ProgressSpinnerService, private http: HttpService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.http.get('/accounts')
      .subscribe(account => {
        // @ts-ignore
        this.account = account;
        this.name = this.account.name;
        this.email = this.account.email;
        this.password = '';
        this.spinner.hide();
      });
  }

  updateName(): void {
    this.editName = false;
    const path: string = '/accounts/name/' + this.name;
    this.http.post(path).subscribe();
  }

  updateEmail(): void {
    this.editEmail = false;
    const path: string = '/accounts/email/' + this.email;
    this.http.post(path).subscribe();
  }

  updatePassword(): void {
    this.editPassword = false;
    if (this.password.length > 7) {
      const path: string = '/accounts/password/' + this.password;
      this.http.post(path).subscribe();
    }
  }

}
