import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(1, "Document 1",
      "This document is just a test",
      "test URL", 'children?'),
    new Document(2, "Document 2",
      "Another test document", "URL 2",
      "child number 2")
  ];
  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
