import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import {ContactService} from "../contact.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  @Input() contact: Contact;
  id: string;
  //   Contact[] = [
  //   new Contact(1, 'Bro. Jackson',
  //     'jacksonk@byui.edu', '208-496-3771',
  //     'https://web.byui.edu/Directory/Employee/jacksonk.jpg',
  //     'null')
  // ];
  constructor(private contactService: ContactService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log("contact = " + this.contact);
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id);
      }
    )
  }
  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contact']);
  }
}
