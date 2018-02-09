import {Component, Input, OnInit, Output } from '@angular/core';
import {Contact} from "../contacts/contact.model";

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @Input() documents: string;
  @Output() selectedDocument: Document; //not sure if this is really an output variable
  constructor() { }

  ngOnInit() {

  }

}
