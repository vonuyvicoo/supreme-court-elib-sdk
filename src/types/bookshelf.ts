/**
 * E-library bookshelf IDs, as they appear in `/thebookshelf/{id}` URLs.
 *
 * Only shelves browsable by month (`/thebookshelf/docmonth/{Mon}/{year}/{id}`)
 * are listed, since that is how documents are discovered. Rules of Court (11)
 * is a flat list with no month pages, so it is left out.
 */
export enum Bookshelf {
  Decisions = 1,
  RepublicActs = 2,
  Constitutions = 3,
  ExecutiveOrders = 5,
  AdministrativeOrders = 6,
  PresidentialProclamations = 7,
  MemorandumCirculars = 8,
  MemorandumOrders = 9,
  BatasPambansa = 25,
  PresidentialDecrees = 26,
  Acts = 28,
  CommonwealthActs = 29,
  GeneralOrders = 30,
}
