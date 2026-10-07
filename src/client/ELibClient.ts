import { FetchHttpClient } from '../http/FetchHttpClient.js';
import type { IHttpClient } from '../interfaces/IHttpClient.js';
import { BookshelfResource } from '../resources/BookshelfResource.js';
import { DecisionsResource } from '../resources/DecisionsResource.js';
import type { Bookshelf } from '../types/bookshelf.js';

export class ELibClient {
  public readonly decisions: DecisionsResource;

  constructor(private readonly httpClient: IHttpClient = new FetchHttpClient()) {
    this.decisions = new DecisionsResource(httpClient);
  }

  shelf(bookshelf: Bookshelf): BookshelfResource {
    return new BookshelfResource(this.httpClient, bookshelf);
  }
}

export const elib = new ELibClient();
