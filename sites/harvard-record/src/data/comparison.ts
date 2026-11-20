import type { Grade } from './grades';

interface Cell { text: string; cites: string[]; grade?: Grade }

export const comparison: { columns: string[]; rows: { element: string; cells: Cell[] }[] } = {
  columns: ['Harvard: Program for Evolutionary Dynamics', 'MIT: Media Lab', 'Harvard Medical School: Church and Thakuria'],
  rows: [
    {
      element: 'Funding before the 2008 conviction',
      cells: [
        { text: '$6.5 million founding gift in 2003, within $9.1 million to Harvard overall.', cites: ['harvard-2020-report'], grade: 'A1' },
        { text: 'One gift of $100,000 in 2002.', cites: ['mit-2020-report', 'techreview-2020-mit'], grade: 'A1' },
        { text: 'Foundation support for the Church lab, 2005 to 2007.', cites: ['harvard-2020-report', 'stat-2019-church'], grade: 'A1' },
      ],
    },
    {
      element: 'Direct funding after the conviction',
      cells: [
        { text: 'None. Harvard accepted no gifts from him after 2008.', cites: ['harvard-2020-report'], grade: 'A1' },
        { text: 'Nine gifts: $525,000 to the Media Lab and $225,000 to Professor Seth Lloyd.', cites: ['mit-2020-report'], grade: 'A1' },
        { text: 'None to Harvard. A $2,000 payment for sequencing, by a physician’s account.', cites: ['cnn-2026-thakuria'], grade: 'A2' },
      ],
    },
    {
      element: 'Funding from introduced donors',
      cells: [
        { text: '$7.5 million for Professor Nowak’s work, 2010 to 2015.', cites: ['harvard-2020-report'], grade: 'A1' },
        { text: 'Not addressed in the 2020 report’s findings; raised by 2026 reporting.', cites: ['tech-2026-mit'], grade: 'A2' },
        { text: '$2 million for Professor Church’s work, 2010 to 2015.', cites: ['harvard-2020-report'], grade: 'A1' },
      ],
    },
    {
      element: 'Access mechanism',
      cells: [
        { text: 'Key card, passcode and office key; more than 40 visits, 2010 to 2018.', cites: ['harvard-2020-report'], grade: 'A1' },
        { text: 'Nine campus visits as a guest, 2013 to 2017.', cites: ['mit-2020-report'], grade: 'A1' },
        { text: 'Faculty contact and enrolment as a research subject.', cites: ['stat-2026-tissue', 'cnn-2026-thakuria'], grade: 'A2' },
      ],
    },
    {
      element: 'DNA activity',
      cells: [
        { text: 'None on record.', cites: [] },
        { text: 'None on record.', cites: [] },
        { text: 'Cell lines derived in 2013; exome and fibroblast sequencing invoiced in 2014. Larger proposals not carried out.', cites: ['stat-2026-mystery', 'cnn-2026-thakuria'], grade: 'A2' },
      ],
    },
    {
      element: 'Who inside the institution knew',
      cells: [
        { text: 'The program’s director. The review found no evidence that University leadership knew of the website page.', cites: ['harvard-2020-report'], grade: 'A1' },
        { text: 'The lab’s director and, from 2013, three vice-presidents.', cites: ['mit-2020-report'], grade: 'A1' },
        { text: 'Lab members objected in 2013 when the sample’s source became known.', cites: ['stat-2026-tissue'], grade: 'A2' },
      ],
    },
    {
      element: 'Institutional response',
      cells: [
        { text: 'Director placed on leave in 2020 and sanctioned in 2021; program closed; sanctions lifted in 2023; second leave in 2026.', cites: ['crimson-2021-nowak', 'crimson-2023-nowak', 'crimson-2026-nowak-leave'], grade: 'A2' },
        { text: 'Lab director resigned in 2019; Professor Lloyd disciplined in 2020 and continued teaching.', cites: ['mit-2020-lloyd'], grade: 'A1' },
        { text: 'Public apology by Professor Church in 2019; covered by Harvard’s widened 2026 review; no finding published.', cites: ['stat-2019-church', 'crimson-2026-probe'], grade: 'A2' },
      ],
    },
    {
      element: 'Primary source',
      cells: [
        { text: 'Harvard General Counsel report, 2020.', cites: ['harvard-2020-report'], grade: 'A1' },
        { text: 'Goodwin Procter report for MIT, 2020.', cites: ['mit-2020-report'], grade: 'A1' },
        { text: 'Justice Department release, as reported by CNN and STAT.', cites: ['cnn-2026-thakuria', 'stat-2026-tissue'], grade: 'A2' },
      ],
    },
  ],
};
