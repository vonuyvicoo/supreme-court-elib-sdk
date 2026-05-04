export enum Month {
  Jan = 'Jan',
  Feb = 'Feb',
  Mar = 'Mar',
  Apr = 'Apr',
  May = 'May',
  Jun = 'Jun',
  Jul = 'Jul',
  Aug = 'Aug',
  Sep = 'Sep',
  Oct = 'Oct',
  Nov = 'Nov',
  Dec = 'Dec',
}

const MONTH_MAP: Record<string, Month> = {
  jan: Month.Jan, january: Month.Jan,
  feb: Month.Feb, february: Month.Feb,
  mar: Month.Mar, march: Month.Mar,
  apr: Month.Apr, april: Month.Apr,
  may: Month.May,
  jun: Month.Jun, june: Month.Jun,
  jul: Month.Jul, july: Month.Jul,
  aug: Month.Aug, august: Month.Aug,
  sep: Month.Sep, september: Month.Sep,
  oct: Month.Oct, october: Month.Oct,
  nov: Month.Nov, november: Month.Nov,
  dec: Month.Dec, december: Month.Dec,
};

export function normalizeMonth(input: string): Month {
  const key = input.toLowerCase().trim();
  const month = MONTH_MAP[key];
  if (!month) throw new Error(`Invalid month: "${input}"`);
  return month;
}

export const MONTH_FULL_NAMES: Record<Month, string> = {
  [Month.Jan]: 'January',
  [Month.Feb]: 'February',
  [Month.Mar]: 'March',
  [Month.Apr]: 'April',
  [Month.May]: 'May',
  [Month.Jun]: 'June',
  [Month.Jul]: 'July',
  [Month.Aug]: 'August',
  [Month.Sep]: 'September',
  [Month.Oct]: 'October',
  [Month.Nov]: 'November',
  [Month.Dec]: 'December',
};
