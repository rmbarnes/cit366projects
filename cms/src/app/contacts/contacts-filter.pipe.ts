import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from "./contact.model";

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: any, [term]: any): any {
    let filteredArray: Contact[] = [];

    filteredArray = contacts.filter(
      (contact: any) => contact.name.toLowerCase().includes(term.toLowerCase())
    );

    if (filteredArray.length < 1 || term === '') {
      return contacts.slice();
    }
    return filteredArray;
  }

}
