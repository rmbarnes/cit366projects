import { Injectable, EventEmitter } from '@angular/core';

import { Contact } from "./contact.model";

import { MOCKCONTACTS} from "./MOCKCONTACTS";
import {Subject} from "rxjs/Subject";
import 'rxjs/Rx';
import {Headers, Http, Response} from "@angular/http";

@Injectable()
export class ContactService {
  private contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  contactsListClone: Contact[] = [];
  maxContactId: number;

  constructor(private http: Http) {
    this.inItContacts();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  };

  getContact(id: string): Contact {
    for (let contact of this.contacts){
      if (contact.id == id) {
        return contact;
      }
    }
    return null;
  };

  addContact(newContact: Contact) {
    if(newContact == null || newContact == undefined) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactsListClone = this.contacts.slice();
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact == null || originalContact == undefined ||
        newContact == null || newContact == undefined) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id.slice();
    this.contacts[pos] = newContact;
    this.contactsListClone = this.contacts.slice();
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (contact == null || contact == undefined) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactsListClone = this.contacts.slice();
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId: number = 0;
    for (let contact of this.contacts) {
      let currentId: number = parseInt(contact.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  inItContacts() {
    return this.http.get('https://cit366project.firebaseio.com/contacts.json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      ).subscribe((contactsReturned: Contact[]) => {
        this.contacts = contactsReturned;
        this.maxContactId = this.getMaxId();
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  storeContacts() {
    JSON.stringify(this.contacts);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://cit366project.firebaseio.com/contacts.json',
      this.contacts,
      {headers: headers})
      .subscribe(() =>
        this.contactListChangedEvent.next(this.contacts.slice())
      )
  }
}
