# @vonuyvico/supreme-court-elib-sdk

A simple SDK for scraping documents from the [Philippine Supreme Court E-Library](https://elibrary.judiciary.gov.ph). Built because there is no public API.

> **Server-side only.** This SDK uses HTTP requests that will fail in browser environments. Use it in Node.js, server actions, API routes, or any server-side runtime only.

## Installation

```bash
npm install @vonuyvico/supreme-court-elib-sdk
```

## Usage

```ts
import { elib, Month } from '@vonuyvico/supreme-court-elib-sdk';

// Get all decisions for a given month and year
const docs = await elib.decisions.getDocumentsByDate(Month.Jan, 2026);

// Get full document content (html + text) by elib_id
const detail = await elib.decisions.getDocumentById('70321');
```

### Other bookshelves

Laws and executive issuances share the same page layout as decisions, so any
month-browsable bookshelf works the same way:

```ts
import { elib, Bookshelf, Month } from '@vonuyvico/supreme-court-elib-sdk';

const acts = await elib.shelf(Bookshelf.RepublicActs).getDocumentsByDate(Month.Sep, 2026);
const detail = await elib.shelf(Bookshelf.RepublicActs).getDocumentById(acts[0].elib_id);
```

`elib.decisions` is the same as `elib.shelf(Bookshelf.Decisions)`. Available
shelves: `Decisions`, `RepublicActs`, `Constitutions`, `ExecutiveOrders`,
`AdministrativeOrders`, `PresidentialProclamations`, `MemorandumCirculars`,
`MemorandumOrders`, `BatasPambansa`, `PresidentialDecrees`, `Acts`,
`CommonwealthActs`, `GeneralOrders`.

### Document shape

```ts
// getDocumentsByDate returns ELibDocument[]
{
  title: string;
  original_identifier_number: string; // e.g. "G.R. No. 266431"
  url: string;
  elib_id: string;
  year: number;
  month: string;
  day: number;
}

// getDocumentById returns ELibDocumentDetail (extends ELibDocument)
{
  ...ELibDocument,
  html: string; // inner HTML of the decision body
  text: string; // plain text of the decision body
}
```

### Month enum

```ts
import { Month } from '@vonuyvico/supreme-court-elib-sdk';

Month.Jan // 'Jan'
Month.Feb // 'Feb'
// ...
```

String month names also work:

```ts
await elib.decisions.getDocumentsByDate('january', 2026);
```
