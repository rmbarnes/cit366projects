import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact.model';

import { ContactService } from "../contact.service";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();

  }

  ngOnInit() {
  }

  //create a function that gets the selectedContactEvent and emits the contact stuff to the parent??
  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
