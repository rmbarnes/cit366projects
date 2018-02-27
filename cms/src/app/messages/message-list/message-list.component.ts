import { Component, OnInit } from '@angular/core';

import {Message} from "../message.model";
import {MessagesService} from "../messages.service";
import {ContactService} from "../../contacts/contact.service";
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  constructor(private messagesService: MessagesService, private contactService: ContactService) {
  }

  ngOnInit() {
    this.messages = this.messagesService.getMessages();

    this.messagesService.messageChangeEvent
      .subscribe((messages: Message[]) => {
        this.messages = messages;
      })

  }

}
