import type { EvidenceState } from './grades';

export interface TimelineEvent {
  date: string;          // display
  iso: string;           // machine-readable
  title: string;
  body: string;          // plain text or simple inline HTML
  kind: 'funding' | 'access' | 'response' | 'record';
  state?: EvidenceState;
  cites: { id: string; loc?: string }[];
}

/** Program for Evolutionary Dynamics: funding, access and institutional response. */
export const ped: TimelineEvent[] = [
  {
    date: '1998 to 2008', iso: '1998',
    title: 'Gifts to Harvard total about $9.1 million',
    body: 'Harvard’s review counted $9.1 million in gifts from Epstein to the University across this decade. This is the figure for all of Harvard, not for the Program alone.',
    kind: 'funding', state: 'verified',
    cites: [{ id: 'harvard-2020-report' }, { id: 'bacow-2020' }],
  },
  {
    date: '2003', iso: '2003',
    title: 'A $6.5 million gift establishes the Program',
    body: 'The largest single gift, $6.5 million, founded the Program for Evolutionary Dynamics under Professor Martin Nowak. Its offices were in a private building at One Brattle Square, Harvard Square.',
    kind: 'funding', state: 'verified',
    cites: [{ id: 'harvard-2020-report' }, { id: 'hm-2020-report' }],
  },
  {
    date: '2005 to 2006', iso: '2005',
    title: 'Visiting Fellow in the Department of Psychology',
    body: 'Epstein was admitted as a Visiting Fellow for 2005–06. The report says he lacked the academic qualifications Visiting Fellows typically have. He was readmitted for 2006–07 and withdrew after his arrest.',
    kind: 'access', state: 'verified',
    cites: [{ id: 'harvard-2020-report' }],
  },
  {
    date: '2008', iso: '2008',
    title: 'Florida conviction; Harvard stops accepting his gifts',
    body: 'After Epstein’s 2008 conviction, President Drew Faust decided Harvard would accept no further gifts from him. The review found none were received after that point. A faculty request to revisit the decision was declined in 2013.',
    kind: 'response', state: 'verified',
    cites: [{ id: 'harvard-2020-report' }, { id: 'hm-2020-report' }],
  },
  {
    date: '2010 to 2018', iso: '2010',
    title: 'More than 40 visits; key card, passcode and office key',
    body: 'Harvard’s review could not fix an exact number but understood that Epstein visited the Program’s offices more than 40 times in this period, at least once as late as October 2018. He held a visitor key card, the door passcode and a key to an office the Program informally called “Jeffrey’s Office.” Professor Nowak told reviewers the office was also used by other visitors.',
    kind: 'access', state: 'verified',
    cites: [{ id: 'harvard-2020-report' }, { id: 'crimson-2020-report' }],
  },
  {
    date: '2010 to 2015', iso: '2010-06',
    title: 'Introduced donors give $7.5 million for Nowak’s work',
    body: 'Donors whom Epstein had introduced gave $7.5 million to support Professor Nowak’s work and $2 million to support Professor George Church’s. The donors denied that Epstein directed their gifts, and the review found no evidence that he did.',
    kind: 'funding', state: 'verified',
    cites: [{ id: 'harvard-2020-report' }, { id: 'crimson-2020-report' }],
  },
  {
    date: '2013 to 2014', iso: '2013',
    title: 'Program website links to, then features, Epstein',
    body: 'At the request of Epstein’s publicist, the Program’s website linked to his foundation’s sites and, in 2014, carried a page about him. Professor Nowak approved both. The page came down in 2014 after a complaint from a sexual assault survivors’ group.',
    kind: 'access', state: 'verified',
    cites: [{ id: 'harvard-2020-report' }],
  },
  {
    date: '12 September 2019', iso: '2019-09-12',
    title: 'Harvard opens its review',
    body: 'After Epstein’s July 2019 arrest and his death that August, President Lawrence Bacow announced a review of his connections to the University.',
    kind: 'response',
    cites: [{ id: 'bacow-2020' }],
  },
  {
    date: '1 May 2020', iso: '2020-05-01',
    title: 'Report published; Nowak placed on paid leave',
    body: 'The General Counsel’s report was released. Professor Nowak was placed on paid administrative leave pending a Faculty of Arts and Sciences review. The unspent balance of Epstein’s gifts, $200,937, was divided between two organisations that support survivors of trafficking and sexual assault.',
    kind: 'response', state: 'verified',
    cites: [{ id: 'bacow-2020' }, { id: 'harvard-2020-report' }],
  },
  {
    date: 'March 2021', iso: '2021-03-26',
    title: 'Sanctions announced; the Program is closed',
    body: 'Dean Claudine Gay said the review found violations of policies on professional conduct, campus access and endorsements. The Program was to be shut down and Professor Nowak’s research moved into the Mathematics department. For two years he could not lead new grants or take on new advisees. He kept his appointments and continued to teach.',
    kind: 'response', state: 'verified',
    cites: [{ id: 'crimson-2021-nowak' }, { id: 'hm-2021-nowak' }],
  },
  {
    date: 'March 2023', iso: '2023-03',
    title: 'Sanctions lifted',
    body: 'The Crimson reported that the restrictions were lifted at the end of the two-year period. No formal University announcement was located.',
    kind: 'response',
    cites: [{ id: 'crimson-2023-nowak' }],
  },
  {
    date: 'November 2025', iso: '2025-11-18',
    title: 'Harvard opens a new review',
    body: 'After a congressional committee released Epstein emails, Harvard said it would review the ties of University affiliates named in the documents.',
    kind: 'response',
    cites: [{ id: 'crimson-2025-review' }],
  },
  {
    date: 'January to February 2026', iso: '2026-01-30',
    title: 'Justice Department release; review widened',
    body: 'A large Department of Justice release followed. Reporters found Professor Nowak’s name in more than 4,000 search results in the released database; that is a count of search hits, not of distinct messages. Harvard widened its review to donors and faculty named in the new records.',
    kind: 'record',
    cites: [{ id: 'ihe-2026-names' }, { id: 'crimson-2026-probe' }, { id: 'hm-2026-probe' }],
  },
  {
    date: 'Late February 2026', iso: '2026-02-25',
    title: 'Nowak placed on paid leave a second time',
    body: 'The Faculty of Arts and Sciences cited new information from the released documents and a recommendation for a formal investigation into possible policy violations. The reasons were not made public in detail, and he is not accused of a crime. In statements to reporters he has said he had no knowledge of Epstein’s crimes and regrets the connection.',
    kind: 'response',
    cites: [{ id: 'crimson-2026-nowak-leave' }, { id: 'hm-2026-nowak' }],
  },
  {
    date: 'Spring 2026', iso: '2026-04-02',
    title: 'Resignation from the Austrian Academy of Sciences',
    body: 'Professor Nowak resigned his membership before the Academy’s ethics process concluded.',
    kind: 'response',
    cites: [{ id: 'crimson-2026-nowak-academy' }],
  },
  {
    date: '17 June 2026', iso: '2026-06-17',
    title: 'Congressional letter requests records',
    body: 'The ranking member of the House Judiciary Committee wrote to Harvard’s president asserting that the University’s earlier review was incomplete and requesting records from 1998 onward. Harvard referred to its ongoing review. No outcome of that review had been published when this page was last reviewed.',
    kind: 'record',
    cites: [{ id: 'raskin-2026' }, { id: 'crimson-2026-raskin' }],
  },
];

/** Harvard Medical School, George Church and Joseph Thakuria. */
export const hms: TimelineEvent[] = [
  {
    date: '2005 to 2007', iso: '2005',
    title: 'Direct gifts to the Church laboratory',
    body: 'Before the 2008 conviction, Epstein’s foundation supported Professor George Church’s research. Harvard’s report is cited for a total of $686,000.',
    kind: 'funding', state: 'verified',
    cites: [{ id: 'harvard-2020-report' }, { id: 'stat-2019-church' }],
  },
  {
    date: 'July 2012', iso: '2012-07',
    title: 'A $75 million donor capacity rating',
    body: 'The Crimson reported that Harvard Medical School’s development records generated a $75 million “active” donor rating for Epstein. A capacity rating estimates what a person could give. It is not a pledge, a gift or a solicitation. Harvard declined to comment.',
    kind: 'record', state: 'activity',
    cites: [{ id: 'crimson-2026-hms-rating' }],
  },
  {
    date: '2013', iso: '2013',
    title: 'Tissue sample and a dispute in the lab',
    body: 'STAT reported that a push to move one person’s sample ahead of others waiting for sequencing caused an uproar in the Church lab when the person was identified as Epstein, and that internal objections stopped any special treatment. Cell lines were derived from the sample that year. Professor Church confirmed the episode and said he had not personally pushed for special treatment.',
    kind: 'access', state: 'activity',
    cites: [{ id: 'stat-2026-tissue' }, { id: 'stat-2026-mystery' }],
  },
  {
    date: '2010 to 2015', iso: '2014',
    title: '$2 million from introduced donors',
    body: 'Harvard’s report records $2 million for Professor Church’s work from donors Epstein had introduced. The donors denied that he directed the gifts.',
    kind: 'funding', state: 'verified',
    cites: [{ id: 'harvard-2020-report' }],
  },
  {
    date: 'June 2014', iso: '2014-06',
    title: 'The Thakuria invoice',
    body: 'Dr Joseph Thakuria, then a physician at Massachusetts General Hospital, sent an invoice with an initial $2,000: $1,000 to sequence the exome and $1,000 to sequence fibroblasts. The same document priced further work that the record does not show was done.',
    kind: 'record', state: 'activity',
    cites: [{ id: 'cnn-2026-thakuria' }],
  },
  {
    date: 'August 2019', iso: '2019-08-05',
    title: 'Church apologises for continued contact',
    body: 'Professor Church publicly apologised for his contacts with Epstein after the 2008 conviction.',
    kind: 'response',
    cites: [{ id: 'stat-2019-church' }],
  },
  {
    date: 'February to March 2026', iso: '2026-02-06',
    title: 'Document release and new reporting',
    body: 'CNN, STAT and the Boston Globe reported on emails in the Justice Department release. Harvard’s widened review covers faculty named in the documents. No disciplinary finding concerning Professor Church or Dr Thakuria was located.',
    kind: 'record',
    cites: [{ id: 'cnn-2026-thakuria' }, { id: 'stat-2026-tissue' }, { id: 'globe-2026-spotlight' }, { id: 'crimson-2026-probe' }],
  },
];
