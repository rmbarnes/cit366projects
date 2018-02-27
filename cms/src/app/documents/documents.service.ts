import {EventEmitter, Injectable} from '@angular/core';

import { Document} from "./document.model";
import { MOCKDOCUMENTS} from "./MOCKDOCUMENTS";


@Injectable()
export class DocumentsService {
  private documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
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
}
