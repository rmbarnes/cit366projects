import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Message} from "../message.model";
import { MessagesService} from "../messages.service";


@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
  }

  onSendMessage() {
   const subject = this.subjectInputRef.nativeElement.value;
   const msgText = this.msgTextInputRef.nativeElement.value;
   const sender = '1';
   let message: Message = new Message('1', subject, msgText, sender);
   this.messagesService.addMessage(message);

    // this.addMessageEvent.emit(message);
   this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }
}
