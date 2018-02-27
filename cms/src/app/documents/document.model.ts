import { Injectable } from "@angular/core";

@Injectable()
export class Document {

  constructor(
    public id: string,
    public name: string,
    public url: string,
    public children: string) {
  }
}
