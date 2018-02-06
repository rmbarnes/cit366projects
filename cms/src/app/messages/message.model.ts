export class Message {
  public messageId: number;
  public subject: string;
  public msgText: string;
  public sender: string;

  constructor(
    messageId: number,
    subject: string,
    msgText: string,
    sender: string,) {
    this.messageId = messageId;
    this.subject = subject;
    this.msgText = msgText;
    this.sender = sender;
  }
}
