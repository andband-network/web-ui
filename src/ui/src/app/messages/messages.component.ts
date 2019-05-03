import { Component, OnInit } from '@angular/core';

import { HttpService } from '../common/service/http/http.service';
import { AppStorage } from '../common/util/app-storage';
import { ProgressSpinnerService } from '../common/service/progress-spinner/progress-spinner.service';

enum DisplayState {
  INDIVIDUAL_MESSAGE = 1,
  INBOX = 2,
  SENT = 3
}

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  displayedMessages: Array<Message>;
  displayedMessage: Message;
  private receivedMessages: Array<Message>;
  private sentMessages: Array<Message>;

  displayState: DisplayState = DisplayState.INBOX;

  constructor(private spinner: ProgressSpinnerService, private http: HttpService) {
  }

  ngOnInit() {
    this.spinner.show();
    const profileId: string = AppStorage.getProfileId();
    Promise.all([
      this.loadReceivedMessages(profileId),
      this.loadSentMessages(profileId)
    ]).then(() => {
      this.displayedMessages = this.receivedMessages;
      this.spinner.hide();
    });
  }

  private loadReceivedMessages(profileId: string): Promise<any> {
    return new Promise(resolve => {
      const receivedMessagePath: string = '/profiles/' + profileId + '/messages';
      this.http.get(receivedMessagePath)
        .subscribe(response => {
          // @ts-ignore
          this.receivedMessages = response;
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
          this.sentMessages = response;
          resolve();
        }, () => {
          resolve();
        });
    });
  }

  viewInbox() {
    this.displayedMessages = this.receivedMessages;
    this.displayState = DisplayState.INBOX;
  }

  viewSent() {
    this.displayedMessages = this.sentMessages;
    this.displayState = DisplayState.SENT;
  }

  viewMessage(message: Message) {
    this.displayedMessage = message;
    this.displayState = DisplayState.INDIVIDUAL_MESSAGE;
  }

}
