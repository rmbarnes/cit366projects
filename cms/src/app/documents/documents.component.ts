import {Component, Input, OnInit,} from '@angular/core';
import {Contact} from "../contacts/contact.model";

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @Input() documents: string;
  constructor() { }

  ngOnInit() {

  }

}
