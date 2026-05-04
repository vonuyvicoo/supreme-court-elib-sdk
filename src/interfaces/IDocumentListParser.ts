import type { ELibDocument } from '../types/document.js';

export interface IDocumentListParser {
  parse(html: string, month: string, year: number): ELibDocument[];
}
