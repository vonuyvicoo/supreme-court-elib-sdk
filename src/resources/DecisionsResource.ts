import type { IHttpClient } from '../interfaces/IHttpClient.js';
import { Bookshelf } from '../types/bookshelf.js';
import { BookshelfResource } from './BookshelfResource.js';

export class DecisionsResource extends BookshelfResource {
  constructor(httpClient: IHttpClient) {
    super(httpClient, Bookshelf.Decisions);
  }
}
