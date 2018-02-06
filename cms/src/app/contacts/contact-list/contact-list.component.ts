import { Component, OnInit, Output, EventEmitter} from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  // this is firing an event to the parent
 @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [
    new Contact(1, 'Bro. Jackson',
      'jacksonk@byui.edu', '208-496-3771',
      'https://web.byui.edu/Directory/Employee/jacksonk.jpg',
      'null'),
    new Contact(2, 'Bro. Barzee',
      'barzeer@byui.edu', '208-496-3768',
      'https://web.byui.edu/Directory/Employee/barzeer.jpg',
      'null')

  ];
  constructor() { }

  ngOnInit() {
  }

  //create a function that gets the selectedContactEvent and emits the contact stuff to the parent??
  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
}
