/**
 * Campus data rate calculator: reported incidents per 1,000 students.
 * A rate puts counts for one institution on a common scale across years. It does
 * not measure how often incidents happen, only how often they were reported and
 * counted within the definitions that apply.
 */

export interface ParsedNumber { value: number | null; error?: string }

/** Parse a whole, non-negative number. Blank is allowed (value null); commas and spaces are ignored. */
export function parseCount(raw: string, field = 'This figure'): ParsedNumber {
  const s = raw.trim().replace(/[,\s]/g, '');
  if (s === '') return { value: null };
  if (!/^\d+$/.test(s)) return { value: null, error: `${field} must be a whole number of 0 or more, with no decimals or other characters.` };
  const n = Number(s);
  if (!Number.isSafeInteger(n)) return { value: null, error: `${field} is too large.` };
  return { value: n };
}

/** Enrollment must be a whole number of at least 1. */
export function parseEnrollment(raw: string): ParsedNumber {
  const p = parseCount(raw, 'Enrollment');
  if (p.error) return p;
  if (p.value === null) return { value: null, error: 'Enter an enrollment figure to calculate rates.' };
  if (p.value === 0) return { value: null, error: 'Enrollment must be at least 1.' };
  return p;
}

export const ratePer1000 = (count: number, enrollment: number): number => (count / enrollment) * 1000;

/** Two decimal places, with thousands separators: 1234.5 -> "1,234.50". */
export const formatRate = (r: number): string =>
  r.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export interface YearInput { label: string; count: string }
export interface RateRow { label: string; count: number; rate: number; note?: string }
export interface RateResult {
  enrollment: number | null;
  rows: RateRow[];
  skipped: string[];
  errors: { field: string; message: string }[];
  warnings: string[];
}

export function computeRates(input: { enrollment: string; years: YearInput[]; category?: string }): RateResult {
  const errors: RateResult['errors'] = [];
  const warnings: string[] = [];
  const rows: RateRow[] = [];
  const skipped: string[] = [];

  const enr = parseEnrollment(input.enrollment);
  if (enr.error) errors.push({ field: 'enrollment', message: enr.error });

  const labels = new Set<string>();
  input.years.slice(0, 3).forEach((y, i) => {
    const label = y.label.trim() || `Year ${i + 1}`;
    if (y.label.trim() && !/^\d{4}(\s*[-–/]\s*\d{2,4})?$/.test(y.label.trim())) {
      errors.push({ field: `year-${i + 1}`, message: `Year ${i + 1}: use a year such as 2023 or 2023–24.` });
    }
    const c = parseCount(y.count, `The count for ${label}`);
    if (c.error) { errors.push({ field: `count-${i + 1}`, message: c.error }); return; }
    if (c.value === null) { if (y.label.trim()) skipped.push(label); return; }
    if (labels.has(label)) errors.push({ field: `year-${i + 1}`, message: `${label} is entered twice.` });
    labels.add(label);
    rows.push({
      label, count: c.value, rate: 0,
      note: c.value === 0 ? 'Zero reported incidents. This means none were reported and counted, not that none occurred.' : undefined,
    });
  });

  if (!rows.length && !errors.some((e) => e.field.startsWith('count'))) {
    errors.push({ field: 'count-1', message: 'Enter at least one year’s count. A blank count is left out; enter 0 for a year with no reported incidents.' });
  }
  if (errors.length || enr.value === null) return { enrollment: enr.value, rows: [], skipped, errors, warnings };

  for (const r of rows) r.rate = ratePer1000(r.count, enr.value);
  if (rows.some((r) => r.count > 0 && r.count < 10)) {
    warnings.push('Some counts are small. With fewer than 10 incidents, a change of one or two moves the rate a great deal, so year-to-year differences may mean little.');
  }
  if (rows.some((r) => r.count > enr.value!)) {
    warnings.push('A count is larger than enrollment. That can happen, because Clery counts include incidents involving people who are not students, but check the figures.');
  }
  if (rows.length > 1) {
    warnings.push('The same enrollment figure is used for every year. If enrollment changed, rates for other years are approximate.');
  }
  if (enr.value < 1000) {
    warnings.push('Enrollment is under 1,000, so the rate per 1,000 students is larger than the count of students it describes. Report the count alongside the rate.');
  }
  return { enrollment: enr.value, rows, skipped, errors, warnings };
}

export function ratesReport(r: RateResult, category = ''): string {
  if (!r.rows.length || r.enrollment === null) return '';
  return [
    `Reported incidents per 1,000 students${category ? `: ${category}` : ''}`,
    `Enrollment used: ${r.enrollment.toLocaleString('en-US')}`,
    ...r.rows.map((x) => `${x.label}: ${x.count.toLocaleString('en-US')} reported, ${formatRate(x.rate)} per 1,000 students`),
    'Reported incidents depend on reporting. Do not compare these figures across institutions.',
  ].join('\n') + '\n';
}
