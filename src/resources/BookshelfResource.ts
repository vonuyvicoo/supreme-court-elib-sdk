import type { IHttpClient } from '../interfaces/IHttpClient.js';
import type { ELibDocument, ELibDocumentDetail } from '../types/document.js';
import { Month, normalizeMonth } from '../types/month.js';
import { DocumentListParser } from '../parsers/DocumentListParser.js';
import { DocumentDetailParser } from '../parsers/DocumentDetailParser.js';
import { BaseResource } from './BaseResource.js';
import type { Bookshelf } from '../types/bookshelf.js';

/**
 * Any month-browsable bookshelf. Every such shelf shares the same list and
 * detail page layout, so one resource covers decisions, laws and issuances.
 */
export class BookshelfResource extends BaseResource {
  constructor(httpClient: IHttpClient, bookshelf: Bookshelf) {
    super(httpClient, new DocumentListParser(), new DocumentDetailParser(), bookshelf);
  }

  async getDocumentsByDate(month: Month | string, year: number): Promise<ELibDocument[]> {
    const m = normalizeMonth(month as string);
    const html = await this.httpClient.get(this.listUrl(m, year));
    return this.listParser.parse(html, m, year);
  }

  async getDocumentById(elibId: string): Promise<ELibDocumentDetail> {
    const html = await this.httpClient.get(this.friendlyDetailUrl(elibId));
    return this.detailParser.parse(html, elibId, this.bookshelfId);
  }
}
