import axios from 'axios';
import type { IHttpClient } from '../interfaces/IHttpClient.js';

export class FetchHttpClient implements IHttpClient {
  async get(url: string): Promise<string> {
    const res = await axios.get<string>(url, { responseType: 'text' });
    return res.data;
  }
}
