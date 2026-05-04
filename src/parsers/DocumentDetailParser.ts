import { load } from 'cheerio';
import type { IDocumentDetailParser } from '../interfaces/IDocumentDetailParser.js';
import type { ELibDocumentDetail } from '../types/document.js';

const BASE_URL = 'https://elibrary.judiciary.gov.ph';

// Matches: [ G.R. No. 266431, January 29, 2026 ]
const HEADER_REGEX = /\[\s*(.*?),\s*([A-Z][a-z]+)\s+(\d{1,2}),\s*(\d{4})\s*\]/s;
const DATE_FALLBACK_REGEX = /([A-Z][a-z]+)\s+(\d{1,2}),\s*(\d{4})/;

const CONTENT_SELECTORS = [
  '.single_content',
  '#content',
  '#divContent',
  '#main-content',
  '.content-area',
  'article',
  '.decision-body',
  'main',
];

export class DocumentDetailParser implements IDocumentDetailParser {
  parse(html: string, elibId: string, bookshelfId: number): ELibDocumentDetail {
    const $ = load(html);

    // Remove nav/header/footer noise before extracting content
    $('nav, header, footer, script, style, noscript').remove();

    // Find the most content-rich container
    const foundSel =
      CONTENT_SELECTORS.find(sel => {
        const el = $(sel);
        return el.length > 0 && el.text().trim().length > 200;
      }) ?? 'body';
    const contentEl = $(foundSel);

    const rawHtml = contentEl.html() ?? '';
    const rawText = contentEl.text().replace(/\s{3,}/g, '\n').trim();

    // Parse header bracket: [ G.R. No. 266431, January 29, 2026 ]
    const headerMatch = rawText.match(HEADER_REGEX);

    let identifier = '';
    let month = '';
    let day = 1;
    let year = 0;

    if (headerMatch) {
      identifier = headerMatch[1].trim();
      month = headerMatch[2];
      day = parseInt(headerMatch[3], 10);
      year = parseInt(headerMatch[4], 10);
    } else {
      const dateMatch = rawText.match(DATE_FALLBACK_REGEX);
      if (dateMatch) {
        month = dateMatch[1];
        day = parseInt(dateMatch[2], 10);
        year = parseInt(dateMatch[3], 10);
      }
    }

    // Title: the line after the header bracket containing the parties
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
    let title = '';

    if (headerMatch) {
      const headerLineIdx = lines.findIndex(l => HEADER_REGEX.test(l));
      if (headerLineIdx >= 0) {
        title = lines[headerLineIdx + 1] ?? '';
      }
    }

    if (!title) {
      title =
        lines.find(l => /PETITIONER|RESPONDENT|COMPLAINANT|ACCUSED/i.test(l)) ?? '';
    }

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
