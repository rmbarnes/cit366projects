import { Component, OnInit } from '@angular/core';
import {ContactService} from "../contact.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Contact} from "../contact.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = null;
  originalContact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;

  constructor(private contactService: ContactService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        if (id == null || id == undefined){
          this.editMode = false;
          return;
        }
        this.originalContact = this.contactService.getContact(id);
        if (this.originalContact == null || this.originalContact == undefined) {
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact))


        if (this.contact.group) {
            this.groupContacts = this.originalContact.group.slice();
        }
      }
    )
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    values.group = this.groupContacts;
    const newContact = new Contact(values.id, values.name, values.email, values.phone, values.imageUrl, values.group);
    if (this.editMode == true) {
      this.contactService.updateContact(this.originalContact, newContact)
    }
    else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contact']);
  }

  onCancel() {
    this.router.navigate(['/contact']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }
    if (newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    this.hasGroup = this.isInvalidContact(selectedContact);
    if (this.hasGroup) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.contact.group = this.groupContacts.slice();
    //this.hasGroup = false;
  }

  onRemoveItem(contact: Contact) {
    //const id = parseInt(idx);
    if ( !contact ) {
      return;
    }
    const contactPosition = this.groupContacts.indexOf(contact)
    this.groupContacts.splice(contactPosition, 1);
    this.hasGroup = false;
  }
}
