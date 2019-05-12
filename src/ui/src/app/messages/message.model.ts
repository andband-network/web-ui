interface Message {
  createdDate?: Date;
  senderProfileId?: string;
  senderProfileName?: string;
  receiverProfileId?: string;
  receiverProfileName?: string;
  subject: string;
  body: string
}
