import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpService } from '../../common/service/http/http.service';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message-dialog.component.html',
  styleUrls: ['./compose-message-dialog.component.scss']
})
export class ComposeMessageDialogComponent implements OnInit {

  private messageSubject: string;
  private messageText: string;

  private message: Message;

  constructor(@Inject(MAT_DIALOG_DATA) private messageConfig: any, private dialogRef: MatDialogRef<ComposeMessageDialogComponent>, private http: HttpService) {
    console.log('messages data', messageConfig);
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }


  private sendMessage() {
    const senderProfileId: string = this.messageConfig.senderProfileId;
    const receiverProfileId: string = this.messageConfig.receiverProfileId;
    const path: string = '/profiles/' + senderProfileId + '/messages/' + receiverProfileId;

    const message: Message = {
      subject: this.messageSubject,
      text: this.messageText
    };

    this.http.post(path, message)
      .subscribe(() => {
        this.dialogRef.close()
      });
  }

  private cancel() {
    this.dialogRef.close();
  }


}
