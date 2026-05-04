import type { IHttpClient } from '../interfaces/IHttpClient.js';
import type { IDocumentDetailParser } from '../interfaces/IDocumentDetailParser.js';
import type { IDocumentListParser } from '../interfaces/IDocumentListParser.js';
import type { IResource } from '../interfaces/IResource.js';
import type { Month } from '../types/month.js';

export abstract class BaseResource implements IResource {
  protected readonly BASE_URL = 'https://elibrary.judiciary.gov.ph';

  constructor(
    protected readonly httpClient: IHttpClient,
    protected readonly listParser: IDocumentListParser,
    protected readonly detailParser: IDocumentDetailParser,
    protected readonly bookshelfId: number,
  ) {}

  protected listUrl(month: Month, year: number): string {
    return `${this.BASE_URL}/thebookshelf/docmonth/${month}/${year}/${this.bookshelfId}`;
  }

  protected detailUrl(elibId: string): string {
    return `${this.BASE_URL}/thebookshelf/showdocs/${this.bookshelfId}/${elibId}`;
  }
}
