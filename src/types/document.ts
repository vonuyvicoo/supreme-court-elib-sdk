export interface ELibDocument {
  title: string;
  original_identifier_number: string;
  url: string;
  elib_id: string;
  year: number;
  month: string;
  day: number;
}

export interface ELibDocumentDetail extends ELibDocument {
  html: string;
  text: string;
}
