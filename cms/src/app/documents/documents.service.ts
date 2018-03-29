import {EventEmitter, Injectable, OnDestroy} from '@angular/core';

import { Document} from "./document.model";
import { MOCKDOCUMENTS} from "./MOCKDOCUMENTS";
import {Subject} from "rxjs/Subject";

import 'rxjs/Rx';
import {Headers, Http, Response} from "@angular/http";

@Injectable()
export class DocumentsService implements OnDestroy {
  private documents: Document[] = [];
  maxDocumentId: number;
  documentsListClone: Document[] = [];
  documentChangedEvent = new EventEmitter<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: Http) {
    this.inItDocuments();
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
      this.storeDocuments();

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
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (document == null || document == undefined) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentsListClone = this.documents.slice();
    this.storeDocuments();
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

  inItDocuments() {
      return this.http.get('https://cit366project.firebaseio.com/documents.json')
        .map(
          (response: Response) => {
            const data = response.json();
            return data;
          }
        ).subscribe((documentsReturned: Document[]) => {
          this.documents = documentsReturned;
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(this.documents.slice());
        });
  }

  storeDocuments() {
    JSON.stringify(this.documents);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://cit366project.firebaseio.com/documents.json',
      this.documents,
      {headers: headers})
      .subscribe(() =>
      this.documentListChangedEvent.next(this.documents.slice())
      )
  }
}
