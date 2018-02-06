import { Component, OnInit } from '@angular/core';

import {Message} from "../message.model";
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1,
      "hello",
      "What's up?",
      "Rachel"),
    new Message(1,
      "Hola",
      "Como esta?",
      "Vanessa")
  ];
  constructor() { }

  ngOnInit() {
  }
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
