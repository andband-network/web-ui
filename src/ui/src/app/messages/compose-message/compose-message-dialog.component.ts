import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { HttpService } from '../../common/service/http/http.service';
import { ProgressSpinnerService } from '../../common/service/progress-spinner/progress-spinner.service';

@Component({
  selector: 'compose-message',
  templateUrl: './compose-message-dialog.component.html',
  styleUrls: ['./compose-message-dialog.component.scss']
})
export class ComposeMessageDialogComponent {

  messageSubject: string;
  messageText: string;

  private message: Message;

  constructor(@Inject(MAT_DIALOG_DATA) private messageData: any,
              private dialogRef: MatDialogRef<ComposeMessageDialogComponent>,
              private spinner: ProgressSpinnerService,
              private http: HttpService) {
    dialogRef.disableClose = true;
  }

  sendMessage() {
    const senderProfileId: string = this.messageData.senderProfileId;
    const receiverProfileId: string = this.messageData.receiverProfileId;
    const path: string = '/profiles/' + senderProfileId + '/messages/' + receiverProfileId;

    const message: Message = {
      subject: this.messageSubject,
      body: this.messageText
    };

    this.http.post(path, message)
      .subscribe(() => {
        this.spinner.hide();
      }, () => {
        alert("error sending message");
        this.dialogRef.close()
      });
  }

  cancel() {
    this.dialogRef.close();
  }

}
