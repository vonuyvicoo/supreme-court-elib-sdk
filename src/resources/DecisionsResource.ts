import type { IHttpClient } from '../interfaces/IHttpClient.js';
import type { ELibDocument, ELibDocumentDetail } from '../types/document.js';
import { Month, normalizeMonth } from '../types/month.js';
import { DocumentListParser } from '../parsers/DocumentListParser.js';
import { DocumentDetailParser } from '../parsers/DocumentDetailParser.js';
import { BaseResource } from './BaseResource.js';

export class DecisionsResource extends BaseResource {
  constructor(httpClient: IHttpClient) {
    super(httpClient, new DocumentListParser(), new DocumentDetailParser(), 1);
  }

  async getDocumentsByDate(month: Month | string, year: number): Promise<ELibDocument[]> {
    const m = normalizeMonth(month as string);
    const html = await this.httpClient.get(this.listUrl(m, year));
    return this.listParser.parse(html, m, year);
  }

  async getDocumentById(elibId: string): Promise<ELibDocumentDetail> {
    const html = await this.httpClient.get(this.detailUrl(elibId));
    return this.detailParser.parse(html, elibId, this.bookshelfId);
  }
}
