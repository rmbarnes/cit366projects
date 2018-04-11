import { Injectable, EventEmitter } from '@angular/core';

import { Message } from "./message.model";
import { MOCKMESSAGES} from "./MOCKMESSAGES";
import {Document} from "../documents/document.model";
import 'rxjs/Rx';
import {HttpHeaders, HttpClient, HttpResponse} from "@angular/common/http";
import {Subject} from "rxjs/Subject";
import {Contact} from "../contacts/contact.model";

@Injectable()
export class MessagesService {
  messages: Message[] = [];
  messageChangeEvent = new EventEmitter<Message[]>();
  maxMessageId: number;
  messageListChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient) {
    this.inItMessages();
  }

  getMessages(): Message[] {

    if (this.messages.length > 0) {
      return this.messages.slice();
    }

    //this is the same stuff as the initMessages()
    this.http.get('http://localhost:3000/messages')
      .map((response: any) => {
        return response.obj;
      })
      .subscribe((messagesReturned: Message[]) => {
        this.messages = messagesReturned;
        this.maxMessageId = this.getMaxId();
        this.messageListChangedEvent.next(this.messages.slice());
        return this.messages.slice();
      });

  }


  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id == id) {
        return message;
      }
    }
    return null;
  };

  addMessage(message: Message) {
    if (!message) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    message.id = '';
    const strMessage = JSON.stringify(message);

    this.http.post('http://localhost:3000/messages', strMessage, {headers: headers})
      .map((response: any) => {
        return response.obj;
      })
      .subscribe(
        (messages: Message[]) => {
        this.messages = messages;
        this.messageChangeEvent.next(this.messages.slice());
      });
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
    return this.http.get('http://localhost:3000/messages')
      .map((response: any) => {
        return response.obj;
      })
      .subscribe((messagesReturned: Message[]) => {
        this.messages = messagesReturned;
        this.maxMessageId = this.getMaxId();
        this.messageListChangedEvent.next(this.messages.slice());
      });
  }

  storeMessages() {
    JSON.stringify(this.messages);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put('https://cit366project.firebaseio.com/messages.json',
      this.messages,
      {headers: headers})
      .subscribe(() =>
        this.messageListChangedEvent.next(this.messages.slice())
      )
  }
}
