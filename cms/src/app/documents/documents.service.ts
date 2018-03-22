import {EventEmitter, Injectable, OnDestroy} from '@angular/core';

import { Document} from "./document.model";
import { MOCKDOCUMENTS} from "./MOCKDOCUMENTS";
import {Subject} from "rxjs/Subject";

@Injectable()
export class DocumentsService implements OnDestroy {
  private documents: Document[] = [];
  maxDocumentId: number;
  documentsListClone: Document[] = [];
  documentChangedEvent = new EventEmitter<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();


  }
  //Do I need this here?????? And is it on the listChangedEvent?
  ngOnDestroy() {
    this.documentListChangedEvent.unsubscribe();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  };

  getDocument(id: string): Document {
    for (let document of this.documents){
      if (document.id == id) {
        return document;
      }
    }
    return null;
  };

  addDocument(newDocument: Document) {
      if (newDocument == null || newDocument == undefined) {
        return;
      }
      this.maxDocumentId++;
      newDocument.id = this.maxDocumentId.toString();
      this.documents.push(newDocument);
      this.documentsListClone = this.documents.slice();
      this.documentListChangedEvent.next(this.documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document)
  {
    if (originalDocument == null || originalDocument == undefined ||
        newDocument == null || newDocument == undefined) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0 ) {
      return;
    }
    newDocument.id = originalDocument.id.slice();
    this.documents[pos] = newDocument;
    this.documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documentsListClone);
  }

  deleteDocument(document: Document) {
    if (document == null || document == undefined) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents = this.documents.splice(pos, 1);
    this.documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documentsListClone);
  }

  getMaxId(): number {
    let maxId: number = 0;
    for (let document of this.documents) {
      let currentId: number = parseInt(document.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
