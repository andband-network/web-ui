interface Message {
  createdDate?: Date;
  senderProfileId?: string;
  senderProfileName?: string;
  receiverProfileId?: string;
  receiverProfileName?: string;
  name?: string;
  subject: string;
  body: string
}
