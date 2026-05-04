import type { ELibDocumentDetail } from '../types/document.js';

export interface IDocumentDetailParser {
  parse(html: string, elibId: string, bookshelfId: number): ELibDocumentDetail;
}
