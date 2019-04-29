import { Component, OnInit } from '@angular/core';

import { HttpService } from '../common/service/http/http.service';
import { AppStorage } from '../common/util/app-storage';

enum DisplayState {
  INDIVIDUAL_MESSAGE = 1,
  INBOX = 2,
  SENT = 3
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  private displayedMessages: Array<Message>;
  private displayedMessage: Message;
  private receivedMessages: Array<Message>;
  private sentMessages: Array<Message>;

  private displayState: DisplayState = DisplayState.INBOX;


  constructor(private http: HttpService) {
  }

  ngOnInit() {
    const profileId: string = AppStorage.getProfileId();

    const receivedMessagePath: string = '/profiles/' + profileId + '/messages';
    this.http.get(receivedMessagePath)
      .subscribe(response => {
        // @ts-ignore
        this.receivedMessages = response;
        this.displayedMessages = this.receivedMessages;
      });

    const sentMessagePath: string = '/profiles/' + profileId + '/messages/sent';
    this.http.get(sentMessagePath)
      .subscribe(response => {
        // @ts-ignore
        this.sentMessages = response;
      });

  }

  private viewInbox() {
    this.displayedMessages = this.receivedMessages;
    this.displayState = DisplayState.INBOX;
  }

  private viewSent() {
    this.displayedMessages = this.sentMessages;
    this.displayState = DisplayState.SENT;
  }

  private viewMessage(message: Message) {
    this.displayedMessage = message;
    this.displayState = DisplayState.INDIVIDUAL_MESSAGE;

  }

}
