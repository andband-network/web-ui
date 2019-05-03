import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationModalDialogComponent } from './confirmation-model/confirmation-modal-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  showModelDialog(messageText: string, buttonText: string): MatDialogRef<ConfirmationModalDialogComponent, any> {
    const dialogConfig: any = {
      data: {
        messageText: messageText,
        buttonText: buttonText
      }
    };
    return this.dialog.open(ConfirmationModalDialogComponent, dialogConfig);
  }

  showSystemErrorDialog() {
    const errorText: string = 'A system error has occurred. Please try again later';
    this.showModelDialog(errorText, 'OK');
  }

}
