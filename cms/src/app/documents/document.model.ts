export class Document {
  public documentId: number;
  public name: string;
  public description: string;
  public fileUrl: string;
  public children: string;

  constructor(
    documentId: number,
    name: string,
    description: string,
    fileUrl: string,
    children: string) {
      this.documentId = documentId;
      this.name = name;
      this.description = description;
      this.fileUrl = fileUrl;
      this.children = children;
  }
}
