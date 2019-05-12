import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';

import { HttpService } from '../common/service/http/http.service';
import { AppStorage } from '../common/util/app-storage';
import { ProgressSpinnerService } from '../common/service/progress-spinner/progress-spinner.service';
import { ComposeMessageDialogComponent } from './compose-message/compose-message-dialog.component';

enum DisplayState {
  INBOX = 1,
  SENT = 2,
  RECEIVED_MESSAGE = 3,
  SENT_MESSAGE = 4
}

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  inputMessageCount: number;
  sentMessageCount: number;
  displayedMessage: Message;
  inbox: MatTableDataSource<Message>;
  inboxDisplayedColumns: string[] = ['from', 'subject', 'date'];
  sentMessages: MatTableDataSource<Message>;
  sentMessagesDisplayedColumns: string[] = ['from', 'subject', 'date'];

  displayState: DisplayState = DisplayState.INBOX;

  constructor(private spinner: ProgressSpinnerService,
              private http: HttpService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.spinner.show();
    const profileId: string = AppStorage.getProfileId();
    Promise.all([
      this.loadReceivedMessages(profileId),
      this.loadSentMessages(profileId)
    ]).then(() => {
      this.spinner.hide();
    });
  }

  private loadReceivedMessages(profileId: string): Promise<any> {
    return new Promise(resolve => {
      const receivedMessagePath: string = '/profiles/' + profileId + '/messages';
      this.http.get(receivedMessagePath)
        .subscribe(response => {
          // @ts-ignore
          this.inbox = new MatTableDataSource<Message>(response);
          // @ts-ignore
          this.inputMessageCount = response.length;
          resolve();
        }, () => {
          resolve();
        });
    });
  }

  private loadSentMessages(profileId: string): Promise<any> {
    return new Promise(resolve => {
      const sentMessagePath: string = '/profiles/' + profileId + '/messages/sent';
      this.http.get(sentMessagePath)
        .subscribe(response => {
          // @ts-ignore
          this.sentMessages = new MatTableDataSource<Message>(response);
          // @ts-ignore
          this.sentMessageCount = response.length;
          resolve();
        }, () => {
          resolve();
        });
    });
  }

  viewInbox() {
    this.displayState = DisplayState.INBOX;
  }

  viewSent() {
    this.displayState = DisplayState.SENT;
  }

  viewMessage(message: Message) {
    this.displayedMessage = message;
    if (this.displayState === DisplayState.INBOX) {
      this.displayState = DisplayState.RECEIVED_MESSAGE;
    } else {
      this.displayState = DisplayState.SENT_MESSAGE;
    }
  }

  openSendMessageDialog(receiverProfileId: string, receiverProfileName: string): void {
    const messageDialogConfig: any = {
      data: {
        senderProfileId: AppStorage.getProfileId(),
        receiverProfileId: receiverProfileId,
        receiverProfileName: receiverProfileName
      }
    };
    this.dialog.open(ComposeMessageDialogComponent, messageDialogConfig);
  }

}
