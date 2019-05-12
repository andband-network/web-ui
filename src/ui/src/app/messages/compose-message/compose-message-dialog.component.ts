import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { HttpService } from '../../common/service/http/http.service';

@Component({
  selector: 'compose-message-dialog',
  templateUrl: './compose-message-dialog.component.html',
  styleUrls: ['./compose-message-dialog.component.scss']
})
export class ComposeMessageDialogComponent implements OnInit {

  profileName: string;

  constructor(@Inject(MAT_DIALOG_DATA) private messageData: any,
              private dialogRef: MatDialogRef<ComposeMessageDialogComponent>,
              private http: HttpService) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.profileName = this.messageData.receiverProfileName
  }

  sendMessage(messageForm) {
    const senderProfileId: string = this.messageData.senderProfileId;
    const receiverProfileId: string = this.messageData.receiverProfileId;
    const path: string = '/profiles/' + senderProfileId + '/messages/' + receiverProfileId;

    const message: Message = {
      subject: messageForm.subject,
      body: messageForm.messageText
    };

    this.http.post(path, message).subscribe();

    this.dialogRef.close()
  }

  cancel() {
    this.dialogRef.close();
  }


}
