import {Component, Input, OnInit, Output } from '@angular/core';
import {Contact} from "../contacts/contact.model";
import {DocumentsService} from "./documents.service";

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document = null;
  @Input() documents: string;

  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    this.documentsService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    )
  }

}
