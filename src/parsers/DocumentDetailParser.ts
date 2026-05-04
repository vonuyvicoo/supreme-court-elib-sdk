import { load } from 'cheerio';
import type { IDocumentDetailParser } from '../interfaces/IDocumentDetailParser.js';
import type { ELibDocumentDetail } from '../types/document.js';

const BASE_URL = 'https://elibrary.judiciary.gov.ph';

// Matches: [ G.R. No. 266431, January 29, 2026 ]
const HEADER_REGEX = /\[\s*(.*?),\s*([A-Z][a-z]+)\s+(\d{1,2}),\s*(\d{4})\s*\]/s;

export class DocumentDetailParser implements IDocumentDetailParser {
  parse(html: string, elibId: string, bookshelfId: number): ELibDocumentDetail {
    const $ = load(html);

    // Printer-friendly page: entire body is the decision with no nav noise
    const rawHtml = $('body').html() ?? '';
    const rawText = $('body').text().replace(/\s{3,}/g, '\n').trim();

    // Header is in the <h2> containing brackets: [ G.R. No. 266431, January 29, 2026 ]
    const headerText = $('h2')
      .filter((_, el) => HEADER_REGEX.test($(el).text()))
      .first()
      .text()
      .trim();

    const headerMatch = headerText.match(HEADER_REGEX);

    let identifier = '';
    let month = '';
    let day = 1;
    let year = 0;

    if (headerMatch) {
      identifier = headerMatch[1].trim();
      month = headerMatch[2];
      day = parseInt(headerMatch[3], 10);
      year = parseInt(headerMatch[4], 10);
    }

    // Title is in <h3>: "PARTIES...<br><br>D E C I S I O N" — strip the ruling type suffix
    const title = $('h3')
      .first()
      .text()
      .split(/D\s+E\s+C\s+I\s+S\s+I\s+O\s+N|R\s+E\s+S\s+O\s+L\s+U\s+T\s+I\s+O\s+N|O\s+R\s+D\s+E\s+R/i)[0]
      .trim();

    const url = `${BASE_URL}/thebookshelf/showdocs/${bookshelfId}/${elibId}`;

    return {
      title,
      original_identifier_number: identifier,
      url,
      elib_id: elibId,
      year,
      month,
      day,
      html: rawHtml,
      text: rawText,
    };
  }
}
