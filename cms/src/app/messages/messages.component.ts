import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../contacts/contact.model";

@Component({
  selector: 'cms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Input() messages: string;
  constructor() { }

  ngOnInit() {
  }

}
