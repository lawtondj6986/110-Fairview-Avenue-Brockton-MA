/**
 * The figures behind the funding chart. Every row restates a ledger claim and
 * cites the same sources; change the ledger and this file together.
 */
export interface FundingRow {
  institution: 'Harvard' | 'MIT';
  route: string;
  period: string;
  after: boolean; // received after the 2008 conviction
  amount: number; // US dollars
  display: string; // how the amount is written
  note?: string;
  claim: string; // ledger id
  cites: string[];
}

export const funding: FundingRow[] = [
  {
    institution: 'Harvard', route: 'Direct gifts from Epstein', period: '1998 to 2008', after: false,
    amount: 9_100_000, display: '$9.1M', note: 'Of which $6.5M founded the Program for Evolutionary Dynamics in 2003.',
    claim: 'F-01', cites: ['harvard-2020-report'],
  },
  {
    institution: 'Harvard', route: 'Direct gifts from Epstein', period: 'After the 2008 conviction', after: true,
    amount: 0, display: 'None', note: 'Harvard decided in 2008 to accept no further gifts from him.',
    claim: 'F-03', cites: ['harvard-2020-report'],
  },
  {
    institution: 'Harvard', route: 'Donors he introduced, for Martin Nowak’s work', period: '2010 to 2015', after: true,
    amount: 7_500_000, display: '$7.5M',
    note: 'About $7M of this is attributed to Leon Black and his family foundation. The donors denied Epstein directed the gifts.',
    claim: 'D-01', cites: ['harvard-2020-report', 'axios-2020-black'],
  },
  {
    institution: 'Harvard', route: 'Donors he introduced, for George Church’s work', period: '2010 to 2015', after: true,
    amount: 2_000_000, display: '$2.0M', note: 'The donors denied Epstein directed the gifts.',
    claim: 'D-02', cites: ['harvard-2020-report'],
  },
  {
    institution: 'MIT', route: 'Direct gifts from Epstein', period: '2002', after: false,
    amount: 100_000, display: '$0.1M', note: 'One gift, before the conviction.',
    claim: 'M-01', cites: ['mit-2020-report', 'techreview-2020-mit'],
  },
  {
    institution: 'MIT', route: 'Direct gifts from Epstein', period: 'After the 2008 conviction', after: true,
    amount: 750_000, display: '$0.75M', note: 'Nine gifts: $525,000 to the Media Lab and $225,000 to Seth Lloyd.',
    claim: 'M-02', cites: ['mit-2020-report'],
  },
];
