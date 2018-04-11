import {Component, OnDestroy, OnInit} from '@angular/core';

import { Contact } from '../contact.model';

import { ContactService } from "../contact.service";
import {Subscription} from "rxjs/Subscription";
import {Message} from "../../messages/message.model";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription: Subscription;
  term: string;
  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();

  }

  ngOnInit() {
    this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => [
        this.contacts = contacts
      ]
    )

    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
      (contactsList: Contact[]) => {
        this.contacts = contactsList;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //create a function that gets the selectedContactEvent and emits the contact stuff to the parent??
  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }

  onKeyPress(value: string) {
    this.term = value;
  }
}
