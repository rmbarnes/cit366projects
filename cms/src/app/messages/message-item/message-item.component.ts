import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../../contacts/contact.model";
import {Message} from "../message.model";
import {ContactService} from "../../contacts/contact.service";

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    let contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }

}
