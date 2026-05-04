import { FetchHttpClient } from '../http/FetchHttpClient.js';
import type { IHttpClient } from '../interfaces/IHttpClient.js';
import { DecisionsResource } from '../resources/DecisionsResource.js';

export class ELibClient {
  public readonly decisions: DecisionsResource;

  constructor(httpClient: IHttpClient = new FetchHttpClient()) {
    this.decisions = new DecisionsResource(httpClient);
  }
}

export const elib = new ELibClient();
