import { load } from 'cheerio';
import type { IDocumentListParser } from '../interfaces/IDocumentListParser.js';
import type { ELibDocument } from '../types/document.js';
import { MONTH_FULL_NAMES, Month, normalizeMonth } from '../types/month.js';

const BASE_URL = 'https://elibrary.judiciary.gov.ph';
const SHOWDOCS_REGEX = /\/showdocs\/\d+\/(\d+)/;
const DATE_REGEX = /([A-Z][a-z]+)\s+(\d{1,2}),\s*(\d{4})/;

export class DocumentListParser implements IDocumentListParser {
  parse(html: string, month: string, year: number): ELibDocument[] {
    const $ = load(html);
    const documents: ELibDocument[] = [];

    const fallbackMonth = MONTH_FULL_NAMES[normalizeMonth(month) as Month] ?? month;

    // Structure: <li style='text-align:justify;'>
    //   <a href='...showdocs/1/[ID]'>
    //     <STRONG>[identifier]</STRONG><br>
    //     <small>[title]</small><br>
    //     [date text node]
    //   </a>
    // </li>
    $("li[style*='text-align']").each((_, el) => {
      const li = $(el);
      const anchor = li.find('a[href*="showdocs"]').first();
      if (!anchor.length) return;

      const href = anchor.attr('href') ?? '';
      const idMatch = href.match(SHOWDOCS_REGEX);
      if (!idMatch) return;

      const elib_id = idMatch[1];
      const url = href.startsWith('http') ? href : `${BASE_URL}${href}`;

      const identifier = anchor.find('strong, b, STRONG, B').first().text().trim();
      const title = anchor.find('small').first().text().trim();

      // Date is a text node inside the anchor (after <small>)
      const anchorText = anchor.text().trim();
      const dateMatch = anchorText.match(DATE_REGEX);

      documents.push({
        title,
        original_identifier_number: identifier,
        url,
        elib_id,
        year: dateMatch ? parseInt(dateMatch[3], 10) : year,
        month: dateMatch ? dateMatch[1] : fallbackMonth,
        day: dateMatch ? parseInt(dateMatch[2], 10) : 1,
      });
    });

    return documents;
  }
}
