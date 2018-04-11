import { Component, OnInit, OnDestroy } from '@angular/core';

import {Message} from "../message.model";
import {MessagesService} from "../messages.service";
import {ContactService} from "../../contacts/contact.service";
import {Subscription} from "rxjs/Subscription";
import {Contact} from "../../contacts/contact.model";
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  subscription: Subscription;

  constructor(private messagesService: MessagesService,
              private contactService: ContactService) {
    this.messages = this.messagesService.getMessages();
  }

  ngOnInit() {

    this.contactService.getContacts();

    //changed this from messageListChangedEvent and the [] were {}
    this.messagesService.messageChangeEvent
      .subscribe((messages: Message[]) => [
        this.messages = messages
        ]
      )
    this.subscription = this.messagesService.messageListChangedEvent
      .subscribe(
        (messagesList: Message[]) => {
          this.messages = messagesList;
        }
      );

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
