import { Component, OnInit } from '@angular/core';
import { Document} from "../document.model";
import {DocumentsService} from "../documents.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {WindRefService} from "../../wind-ref.service";

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;
  nativeWindow: any;
  constructor(private documentService: DocumentsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private windRefService: WindRefService) {
    this.nativeWindow = windRefService.getNativeWindow();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    )
  }

  onView() {
    if(this.document.url){
      this.nativeWindow.open(this.document.url)
    }
  }
  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

}
