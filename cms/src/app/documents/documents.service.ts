import {EventEmitter, Injectable, OnDestroy} from '@angular/core';

import { Document} from "./document.model";
import { MOCKDOCUMENTS} from "./MOCKDOCUMENTS";
import {Subject} from "rxjs/Subject";

import 'rxjs/Rx';
import {HttpHeaders, HttpClient, HttpResponse} from "@angular/common/http";

@Injectable()
export class DocumentsService implements OnDestroy {
  private documents: Document[] = [];
  maxDocumentId: number;
  documentsListClone: Document[] = [];
  documentChangedEvent = new EventEmitter<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
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

  addDocument(document: Document) {
    if (!document) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    document.id = '';
    const strDocument = JSON.stringify(document);

    this.http.post('http://localhost:3000/documents', strDocument, {headers: headers})
      .map((response: any) => {
        return response.obj;
      })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentChangedEvent.next(this.documents.slice());
        });
  }

  updateDocument(originalDocument: Document, newDocument: Document)
  {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0 ) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strDocument = JSON.stringify(newDocument);

    this.http.patch('http://localhost:3000/documents/' + originalDocument.id,
                    strDocument, {headers: headers})
      .map((response: any) => {
        return response.obj;
      })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentChangedEvent.next(this.documents.slice());
        });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    this.http.delete('http://localhost:3000/documents/' + document.id)
      .map((response: any) => {
        return response.obj;
      })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentChangedEvent.next(this.documents.slice());
        });
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
    return this.http.get('http://localhost:3000/documents')
      .map((response: any) => {
        return response.obj;
    })
      .subscribe((documentsReturned: Document[]) => {
        this.documents = documentsReturned;
        this.maxDocumentId = this.getMaxId();
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  storeDocuments() {
    JSON.stringify(this.documents);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put('https://cit366project.firebaseio.com/documents.json',
      this.documents,
      {headers: headers})
      .subscribe(() =>
        this.documentListChangedEvent.next(this.documents.slice())
      )
  }
}
