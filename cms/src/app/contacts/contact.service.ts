import { Injectable, EventEmitter } from '@angular/core';

import { Contact } from "./contact.model";

import { MOCKCONTACTS} from "./MOCKCONTACTS";
import {Subject} from "rxjs/Subject";
import 'rxjs/Rx';
import {HttpHeaders, HttpClient, HttpResponse} from "@angular/common/http";
import {Document} from "../documents/document.model";

@Injectable()
export class ContactService {
  private contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  contactsListClone: Contact[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) {
    //this.inItContacts();
    //this.contacts =
      this.getContacts();
  }

  getContacts(): Contact[] {

    if (this.contacts.length > 0) {
      return this.contacts.slice();
    }

    this.http.get('http://localhost:3000/contacts')
      .map((response: any) => {
        return response.obj;
      })
      .subscribe((contactsReturned: Contact[]) => {
        this.contacts = contactsReturned;
        this.maxContactId = this.getMaxId();
        this.contactListChangedEvent.next(this.contacts.slice());
        return this.contacts.slice();
      });

  };

  getContact(id: string): Contact {
    for (let contact of this.contacts){
      if (contact.id == id) {
        return contact;
      }
    }
    return null;
  };

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    contact.id = '';
    const strContact = JSON.stringify(contact);

    //removed return
    this.http.post('http://localhost:3000/contacts', strContact, {headers: headers})
      .map((response: any) => {
        return response.obj;
      })
      .subscribe(
        (contacts: Contact[]) => {
        this.contacts = contacts;
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0 ) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strContact = JSON.stringify(newContact);

    //removed return 7:17pm
    this.http.patch('http://localhost:3000/contacts/' + originalContact.id,
                    strContact, {headers: headers})
      .map((response: any) => {
        return response.obj;
      })
      .subscribe(
        (contacts: Contact[]) => {
        this.contacts = contacts;
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .map((response: any) => {
        return response.obj;
      })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactChangedEvent.next(this.contacts.slice());
        });
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

  }

  storeContacts() {
    JSON.stringify(this.contacts);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put('https://cit366project.firebaseio.com/contacts.json',
      this.contacts,
      {headers: headers})
      .subscribe(() =>
        this.contactListChangedEvent.next(this.contacts.slice())
      )
  }
}
