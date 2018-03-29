import { Injectable, EventEmitter } from '@angular/core';

import { Message } from "./message.model";
import { MOCKMESSAGES} from "./MOCKMESSAGES";
import {Document} from "../documents/document.model";
import 'rxjs/Rx';
import {Headers, Http, Response} from "@angular/http";
import {Subject} from "rxjs/Subject";

@Injectable()
export class MessagesService {
  messages: Message[] = [];
  messageChangeEvent = new EventEmitter<Message[]>();
  maxMessageId: number;
  messageListChangedEvent = new Subject<Message[]>();


  constructor(private http: Http) {
    this.inItMessages();
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }
  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id == id) {
        return message;
      }
    }
    return null;
  }
  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId: number = 0;
    for (let message of this.messages) {
      let currentId: number = parseInt(message.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  inItMessages() {
    return this.http.get('https://cit366project.firebaseio.com/messages.json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      ).subscribe((messagesReturned: Message[]) => {
        this.messages = messagesReturned;
        this.maxMessageId = this.getMaxId();
        this.messageListChangedEvent.next(this.messages.slice());
      });
  }

  storeMessages() {
    JSON.stringify(this.messages);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://cit366project.firebaseio.com/messages.json',
      this.messages,
      {headers: headers})
      .subscribe(() =>
        this.messageListChangedEvent.next(this.messages.slice())
      )
  }
}
