import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import {Message} from "../message.model";


@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
   const subject = this.subjectInputRef.nativeElement.value;
   const msgText = this.msgTextInputRef.nativeElement.value;
   const currentSender = 'Rachel';
   let message: Message = new Message(1, subject, msgText, currentSender);
   this.addMessageEvent.emit(message);
   this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }
}
