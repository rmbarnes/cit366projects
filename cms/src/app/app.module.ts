import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from "@angular/http";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactsDetailComponent } from './contacts/contacts-detail/contacts-detail.component';
import { ContactItemComponent } from './contacts/contact-list/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-list/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DropdownDirective } from './dropdown.directive';
import { ContactService} from "./contacts/contact.service";
import { DocumentsService } from "./documents/documents.service";
import { MessagesService} from "./messages/messages.service";
import { AppRouting } from "./app-routing";
import { DocumentViewComponent } from './documents/document-view/document-view.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { WindRefService } from "./wind-ref.service";
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactViewComponent } from './contacts/contact-view/contact-view.component';
import { DndModule} from "ng2-dnd";
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactsDetailComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessagesComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective,
    DocumentViewComponent,
    DocumentEditComponent,
    ContactEditComponent,
    ContactViewComponent,
    ContactsFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting,
    DndModule.forRoot(),
    HttpClientModule
  ],
  providers: [ContactService, DocumentsService, MessagesService, WindRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
