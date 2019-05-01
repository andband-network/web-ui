import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { HttpService } from '../common/service/http/http.service';
import { ConfirmationModalDialogComponent } from '../common/component/confirmation-model-dialog/confirmation-modal-dialog.component';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private http: HttpService) {
  }

  ngOnInit() {
    const token: string = this.route.snapshot.paramMap.get('token');
    const path: string = '/register/confirm/' + token;
    this.http.post(path)
      .subscribe(() => {
        this.showConfirmationDialog();
      });
  }

  private showConfirmationDialog() {
    const dialogConfig: any = {
      data: {
        messageText: 'You are now registered with AndBand',
        buttonText: 'Go to login page'
      }
    };
    this.dialog.open(ConfirmationModalDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }

}
