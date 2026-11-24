import type { EvidenceState, Grade } from './grades';

/**
 * The claim ledger: one row per factual claim the site makes.
 *
 * This is the working record behind the prose. Before launch, and whenever a
 * source changes, a maintainer checks each row against its sources and sets
 * `checked`. A claim with no `checked` date is shown as "pending check".
 *
 * `grade` is the grade of the strongest source that directly supports the claim.
 * `caveat` records limits that must travel with the claim wherever it is repeated.
 */
export interface Claim {
  id: string;
  page: string; // path of the page that makes the claim
  topic: 'Funding' | 'Access' | 'Institutional response' | 'Introduced donors' | 'Genetics' | 'U.S. Virgin Islands' | 'MIT' | 'Campus safety' | 'Law';
  claim: string;
  state: EvidenceState;
  grade: Grade;
  sources: string[];
  caveat?: string;
  checked?: string;
}

const PED = '/program-for-evolutionary-dynamics/';
const HMS = '/harvard-medical-school/';
const DON = '/donor-pathways/';
const DNA = '/dna-genetics/';
const SAF = '/campus-safety/';

export const claims: Claim[] = [
  // ------------------------------------------------------------ Funding
  {
    id: 'F-01', page: PED, topic: 'Funding',
    claim: 'Epstein’s gifts to Harvard totalled about $9.1 million between 1998 and 2008.',
    state: 'verified', grade: 'A1', sources: ['harvard-2020-report', 'bacow-2020'],
    caveat: 'University-wide total. Some coverage gives $9,179,000 or “nearly $9.2 million”, which is more than rounding; confirm in the report.',
  },
  {
    id: 'F-02', page: PED, topic: 'Funding',
    claim: 'A $6.5 million gift in 2003 established the Program for Evolutionary Dynamics.',
    state: 'verified', grade: 'A1', sources: ['harvard-2020-report', 'hm-2020-report'],
  },
  {
    id: 'F-03', page: PED, topic: 'Funding',
    claim: 'Harvard accepted no gifts from Epstein after his 2008 conviction.',
    state: 'verified', grade: 'A1', sources: ['harvard-2020-report'],
    caveat: 'The decision was made by the President in 2008 and was not formally recorded at the time.',
  },
  {
    id: 'F-04', page: PED, topic: 'Funding',
    claim: 'A faculty request to reconsider the decision was declined in 2013.',
    state: 'verified', grade: 'A2', sources: ['hm-2020-report'],
  },
  {
    id: 'F-05', page: PED, topic: 'Funding',
    claim: 'The unspent balance of Epstein’s gifts, $200,937, was given to two organisations supporting survivors.',
    state: 'verified', grade: 'A1', sources: ['bacow-2020'],
  },
  {
    id: 'F-06', page: HMS, topic: 'Funding',
    claim: 'Before 2008, Epstein’s foundation gave $686,000 to support George Church’s research.',
    state: 'verified', grade: 'A1', sources: ['harvard-2020-report', 'stat-2019-church'],
    caveat: 'The figure is attributed to a footnote of the report and must be confirmed in the PDF.',
  },

  // ------------------------------------------------------------ Access
  {
    id: 'A-01', page: PED, topic: 'Access',
    claim: 'Epstein visited the Program’s offices more than 40 times between 2010 and 2018.',
    state: 'verified', grade: 'A1', sources: ['harvard-2020-report'],
    caveat: 'An estimate. The report says the records do not allow a precise count.',
  },
  {
    id: 'A-02', page: PED, topic: 'Access',
    claim: 'He held a visitor key card, the door passcode and a key to an office.',
    state: 'verified', grade: 'A1', sources: ['harvard-2020-report'],
  },
  {
    id: 'A-03', page: PED, topic: 'Access',
    claim: 'The Program informally called one office “Jeffrey’s Office.”',
    state: 'verified', grade: 'A1', sources: ['harvard-2020-report'],
    caveat: 'The Program’s director told reviewers that other visitors also used the room.',
  },
  {
    id: 'A-04', page: PED, topic: 'Access',
    claim: 'The Program’s website linked to Epstein’s foundation sites from 2013 and carried a page about him in 2014.',
    state: 'verified', grade: 'A1', sources: ['harvard-2020-report'],
    caveat: 'The page was removed in 2014 after a complaint.',
  },
  {
    id: 'A-05', page: PED, topic: 'Access',
    claim: 'Epstein was a Visiting Fellow in the Department of Psychology in 2005–06.',
    state: 'verified', grade: 'A1', sources: ['harvard-2020-report'],
  },
  {
    id: 'A-06', page: PED, topic: 'Access',
    claim: 'The review did not find evidence that he engaged with undergraduate students during visits or as a Visiting Fellow.',
    state: 'verified', grade: 'A1', sources: ['harvard-2020-report'],
    caveat: 'Limited to undergraduates and to what the review could find. Reporting notes he attended one undergraduate class.',
  },
  {
    id: 'A-07', page: PED, topic: 'Access',
    claim: 'Martin Nowak’s name returns more than 4,000 results in the Justice Department’s released database.',
    state: 'activity', grade: 'A2', sources: ['ihe-2026-names'],
    caveat: 'A count of search hits, including duplicates. Not a count of messages.',
  },
  {
    id: 'A-08', page: PED, topic: 'Access',
    claim: 'The Program’s offices were in a private building at One Brattle Square.',
    state: 'verified', grade: 'A1', sources: ['harvard-2020-report'],
  },

  // ------------------------------------------------------------ Institutional response
  {
    id: 'R-01', page: PED, topic: 'Institutional response',
    claim: 'Harvard’s President announced a review of Epstein’s connections in September 2019.',
    state: 'verified', grade: 'A1', sources: ['bacow-2020'],
  },
  {
    id: 'R-02', page: PED, topic: 'Institutional response',
    claim: 'The General Counsel’s report was published on 1 May 2020 and Martin Nowak was placed on paid administrative leave.',
    state: 'verified', grade: 'A1', sources: ['bacow-2020', 'harvard-2020-report'],
  },
  {
    id: 'R-03', page: PED, topic: 'Institutional response',
    claim: 'In March 2021 the Faculty of Arts and Sciences found policy violations, imposed two-year restrictions and closed the Program.',
    state: 'verified', grade: 'A2', sources: ['crimson-2021-nowak', 'hm-2021-nowak'],
  },
  {
    id: 'R-04', page: PED, topic: 'Institutional response',
    claim: 'The restrictions were lifted in March 2023.',
    state: 'activity', grade: 'A2', sources: ['crimson-2023-nowak'],
    caveat: 'Reported by the student newspaper. No formal University announcement located.',
  },
  {
    id: 'R-05', page: PED, topic: 'Institutional response',
    claim: 'Harvard opened a new review in November 2025 and widened it in February 2026 to donors and faculty named in released records.',
    state: 'activity', grade: 'A2', sources: ['crimson-2025-review', 'crimson-2026-probe', 'hm-2026-probe'],
    caveat: 'No findings had been published when last reviewed.',
  },
  {
    id: 'R-06', page: PED, topic: 'Institutional response',
    claim: 'Martin Nowak was placed on paid administrative leave a second time in late February 2026.',
    state: 'activity', grade: 'A2', sources: ['crimson-2026-nowak-leave', 'hm-2026-nowak'],
    caveat: 'He is not accused of a crime. Sources differ by a day on the date. Outcome not published.',
  },
  {
    id: 'R-07', page: PED, topic: 'Institutional response',
    claim: 'Martin Nowak resigned from the Austrian Academy of Sciences in spring 2026.',
    state: 'activity', grade: 'A2', sources: ['crimson-2026-nowak-academy'],
  },
  {
    id: 'R-08', page: PED, topic: 'Institutional response',
    claim: 'On 17 June 2026 the ranking member of the House Judiciary Committee wrote to Harvard requesting records from 1998 onward.',
    state: 'activity', grade: 'A1', sources: ['raskin-2026', 'crimson-2026-raskin'],
    caveat: 'The letter’s characterisations are assertions by its authors.',
  },
  {
    id: 'R-09', page: HMS, topic: 'Institutional response',
    claim: 'George Church publicly apologised in August 2019 for contact with Epstein after the conviction.',
    state: 'verified', grade: 'A2', sources: ['stat-2019-church'],
  },

  // ------------------------------------------------------------ Introduced donors
  {
    id: 'D-01', page: DON, topic: 'Introduced donors',
    claim: 'Between 2010 and 2015, donors Epstein had introduced gave $7.5 million for Martin Nowak’s work.',
    state: 'verified', grade: 'A1', sources: ['harvard-2020-report'],
  },
  {
    id: 'D-02', page: DON, topic: 'Introduced donors',
    claim: 'In the same period, introduced donors gave $2 million for George Church’s work.',
    state: 'verified', grade: 'A1', sources: ['harvard-2020-report'],
  },
  {
    id: 'D-03', page: DON, topic: 'Introduced donors',
    claim: 'The donors denied that Epstein directed their gifts, and the review found no evidence that he did.',
    state: 'verified', grade: 'A1', sources: ['harvard-2020-report', 'crimson-2020-report'],
  },
  {
    id: 'D-04', page: DON, topic: 'Introduced donors',
    claim: 'About $7 million of the gifts for Martin Nowak’s work came from Leon Black, his wife and their family foundation.',
    state: 'verified', grade: 'A2', sources: ['axios-2020-black'],
    caveat: 'Whether the report itself names the donors must be confirmed in the PDF.',
  },
  {
    id: 'D-05', page: DON, topic: 'Introduced donors',
    claim: 'A representative of Leon Black confirmed the introduction and said the funds were not provided by Epstein.',
    state: 'verified', grade: 'A2', sources: ['axios-2020-black'],
  },
  {
    id: 'D-06', page: DON, topic: 'Introduced donors',
    claim: 'The Black family foundation’s 2018 gift of $7.5 million for military and veteran fellowships has no public documented connection to Epstein.',
    state: 'none', grade: 'A1', sources: ['hks-2018-black'],
    caveat: 'A statement of absence. The gift itself is documented by the school’s announcement.',
  },
  {
    id: 'D-07', page: DON, topic: 'Introduced donors',
    claim: 'A congressional letter asserts that Harvard development staff knew of and encouraged Epstein’s role in the Black gifts.',
    state: 'intent', grade: 'A1', sources: ['raskin-2026'],
    caveat: 'An assertion. Harvard has published no finding on it.',
  },
  {
    id: 'D-08', page: HMS, topic: 'Introduced donors',
    claim: 'Harvard Medical School’s development records generated a $75 million “active” donor rating for Epstein in July 2012.',
    state: 'activity', grade: 'A2', sources: ['crimson-2026-hms-rating'],
    caveat: 'A capacity estimate, not a gift, pledge or solicitation. Single outlet. Harvard declined to comment.',
  },
  {
    id: 'D-09', page: DON, topic: 'Introduced donors',
    claim: 'Reporting describes a 2014 biotechnology investment venture discussed between Epstein and George Church.',
    state: 'intent', grade: 'A2', sources: ['cnn-2026-donations', 'globe-2026-spotlight'],
  },

  // ------------------------------------------------------------ Genetics
  {
    id: 'G-01', page: HMS, topic: 'Genetics',
    claim: 'In 2013 an attempt to prioritise Epstein’s tissue sample caused a dispute in the Church lab, and objections stopped special treatment.',
    state: 'activity', grade: 'A2', sources: ['stat-2026-tissue'],
    caveat: 'George Church confirmed the episode and said he had not personally pressed for priority.',
  },
  {
    id: 'G-02', page: HMS, topic: 'Genetics',
    claim: 'Cell lines containing Epstein’s DNA were created in 2013; their present whereabouts are unknown.',
    state: 'activity', grade: 'A2', sources: ['stat-2026-mystery'],
    caveat: 'Single outlet.',
  },
  {
    id: 'G-03', page: HMS, topic: 'Genetics',
    claim: 'A June 2014 invoice from Joseph Thakuria listed an initial $2,000: $1,000 for exome sequencing and $1,000 for fibroblast sequencing.',
    state: 'activity', grade: 'A2', sources: ['cnn-2026-thakuria'],
    caveat: 'Payment rests on his statement that a $2,000 cheque was provided.',
  },
  {
    id: 'G-04', page: HMS, topic: 'Genetics',
    claim: 'The same invoice priced further work to a total of $193,400, including a $160,000 item called “The Venus Project.”',
    state: 'intent', grade: 'A2', sources: ['cnn-2026-thakuria'],
    caveat: 'No record of payment or performance. He described the idea as preliminary and unfunded.',
  },
  {
    id: 'G-05', page: HMS, topic: 'Genetics',
    claim: 'Joseph Thakuria was a physician at Massachusetts General Hospital and was not directly employed by Harvard.',
    state: 'verified', grade: 'A2', sources: ['cnn-2026-thakuria'],
    caveat: 'The hospital says it has no record of approving the studies described. No wrongdoing is alleged.',
  },
  {
    id: 'G-06', page: DNA, topic: 'Genetics',
    claim: 'In September 2016 Epstein was told 23andMe kits had arrived for delivery to Woody Allen and Soon-Yi Previn.',
    state: 'activity', grade: 'A2', sources: ['nypost-2026-kits'],
    caveat: 'Receiving a kit implies nothing about the recipient.',
  },
  {
    id: 'G-07', page: DNA, topic: 'Genetics',
    claim: 'In April 2017 Karyna Shuliak asked for two 23andMe kits to be sent to Noam and Valeria Chomsky; two kits bought on Amazon were shipped.',
    state: 'activity', grade: 'A2', sources: ['nypost-2026-kits'],
    caveat: 'Receiving a kit implies nothing about the recipient. No research use is described.',
  },
  {
    id: 'G-08', page: DNA, topic: 'Genetics',
    claim: 'In summer 2017 an assistant placed a bulk 23andMe order that, according to the correspondence, was for colleagues of Sultan Ahmed bin Sulayem; the company queried it and cancelled it.',
    state: 'activity', grade: 'A2', sources: ['sfgate-2026-kits'],
    caveat: 'Accounts differ on the number of kits and on what became of them.',
  },
  {
    id: 'G-09', page: DNA, topic: 'Genetics',
    claim: 'Epstein told people of a wish to have women inseminated at his New Mexico ranch.',
    state: 'intent', grade: 'B2', sources: ['nyt-2019-seed'],
    caveat: 'The fullest account is second-hand. The newspaper reported no evidence the idea was acted on.',
  },
  {
    id: 'G-10', page: DNA, topic: 'Genetics',
    claim: 'No public record shows a shared genetic database, a research output or an operational programme connecting these items.',
    state: 'none', grade: 'A2', sources: ['cnn-2026-thakuria', 'nypost-2026-kits'],
    caveat: 'A statement of absence across the sources reviewed.',
  },
  {
    id: 'G-11', page: DNA, topic: 'Genetics',
    claim: 'The Repository for Germinal Choice opened in 1980 and produced about 215 children.',
    state: 'verified', grade: 'B1', sources: ['plotz-2005'],
    caveat: 'Background calibration only.',
  },

  // ------------------------------------------------------------ U.S. Virgin Islands
  {
    id: 'V-01', page: DNA, topic: 'U.S. Virgin Islands',
    claim: 'In November 2012 Southern Trust Company was described to a tax-incentive commission as consulting in “biomedical and financial informatics.”',
    state: 'intent', grade: 'A2', sources: ['source-2022-settlement'],
  },
  {
    id: 'V-02', page: DNA, topic: 'U.S. Virgin Islands',
    claim: 'The company received a ten-year package of tax incentives in 2013.',
    state: 'activity', grade: 'A2', sources: ['source-2022-settlement'],
  },
  {
    id: 'V-03', page: DNA, topic: 'U.S. Virgin Islands',
    claim: 'The Attorney General alleged that Southern Trust made fraudulent misrepresentations to obtain the benefits and performed no visible informatics services.',
    state: 'intent', grade: 'A1', sources: ['usvi-complaint'],
    caveat: 'An allegation in a complaint. The case settled without a ruling.',
  },
  {
    id: 'V-04', page: DNA, topic: 'U.S. Virgin Islands',
    claim: 'The case settled in November 2022 for more than $105 million; the government said more than $80 million in tax benefits would be returned.',
    state: 'verified', grade: 'A1', sources: ['usvi-2022-settlement'],
    caveat: 'Whether the $80 million is inside or in addition to the $105 million must be confirmed from the release.',
  },

  // ------------------------------------------------------------ MIT
  {
    id: 'M-01', page: DON, topic: 'MIT',
    claim: 'MIT received ten gifts from Epstein totalling $850,000 between 2002 and 2017.',
    state: 'verified', grade: 'A1', sources: ['mit-2020-report'],
  },
  {
    id: 'M-02', page: DON, topic: 'MIT',
    claim: 'Nine of the gifts came after the 2008 conviction: $525,000 to the Media Lab and $225,000 to Seth Lloyd.',
    state: 'verified', grade: 'A1', sources: ['mit-2020-report'],
  },
  {
    id: 'M-03', page: DON, topic: 'MIT',
    claim: 'Three vice-presidents learned of the gifts in 2013 and allowed them to continue on informal conditions, including anonymity.',
    state: 'verified', grade: 'A1', sources: ['mit-2020-report', 'techreview-2020-mit'],
  },
  {
    id: 'M-04', page: DON, topic: 'MIT',
    claim: 'Epstein visited the MIT campus nine times between 2013 and 2017.',
    state: 'verified', grade: 'A1', sources: ['mit-2020-report'],
  },
  {
    id: 'M-05', page: DON, topic: 'MIT',
    claim: 'The Media Lab’s director resigned in September 2019; Seth Lloyd was placed on leave, later disciplined, and continued to teach.',
    state: 'verified', grade: 'A1', sources: ['mit-2020-lloyd'],
  },
  {
    id: 'M-06', page: DON, topic: 'MIT',
    claim: 'In 2026 MIT’s student newspaper reported donor connections that the 2020 review had not covered.',
    state: 'activity', grade: 'A2', sources: ['tech-2026-mit'],
  },

  // ------------------------------------------------------------ Campus safety
  {
    id: 'S-01', page: SAF, topic: 'Campus safety',
    claim: 'In December 2014 the federal Office for Civil Rights found that Harvard Law School had violated Title IX, and the school signed a resolution agreement.',
    state: 'verified', grade: 'A1', sources: ['ocr-2014-letter', 'ocr-2014-agreement'],
  },
  {
    id: 'S-02', page: SAF, topic: 'Campus safety',
    claim: 'A separate federal investigation of Harvard College opened in April 2014 and was still reported open in 2018.',
    state: 'activity', grade: 'A2', sources: ['crimson-2018-college-ocr'],
    caveat: 'No public record of its resolution was located.',
  },
  {
    id: 'S-03', page: SAF, topic: 'Campus safety',
    claim: 'In the 2015 survey, about 31 percent of senior undergraduate women reported some form of nonconsensual sexual contact while at Harvard.',
    state: 'verified', grade: 'A2', sources: ['hm-2015-aau'],
    caveat: 'Seniors only. Not comparable like-for-like with 2019.',
  },
  {
    id: 'S-04', page: SAF, topic: 'Campus safety',
    claim: 'In the 2019 survey, about a third of undergraduate women surveyed reported some form of nonconsensual sexual contact.',
    state: 'verified', grade: 'A2', sources: ['crimson-2019-aau'],
    caveat: 'Reported as 32 or 33 percent. Take the exact figure from Harvard’s tables.',
  },
  {
    id: 'S-05', page: SAF, topic: 'Campus safety',
    claim: 'Harvard reported a statistically significant decline in its 2024 survey and described prevalence as still “alarmingly high.”',
    state: 'verified', grade: 'A1', sources: ['harvard-2024-hesma'],
  },
  {
    id: 'S-06', page: SAF, topic: 'Campus safety',
    claim: 'In May 2019 Harvard announced that a Title IX investigation had found unwelcome sexual conduct by Jorge Domínguez over nearly four decades, and revoked his emeritus status.',
    state: 'verified', grade: 'A2', sources: ['hm-2019-dominguez'],
    caveat: 'His own public response must be added from the cited reporting.',
  },
  {
    id: 'S-07', page: SAF, topic: 'Campus safety',
    claim: 'A 2021 External Review Committee concluded that power disparities, inadequate reporting mechanisms and a permissive culture allowed the conduct to continue.',
    state: 'verified', grade: 'A1', sources: ['erc-2021'],
  },
  {
    id: 'S-08', page: SAF, topic: 'Campus safety',
    claim: 'A year later, three of the committee’s nine recommendations were reported as not yet carried out.',
    state: 'activity', grade: 'A2', sources: ['crimson-2022-recs'],
    caveat: 'Status as of March 2022.',
  },
  {
    id: 'S-09', page: SAF, topic: 'Campus safety',
    claim: 'In July 2019 Roland Fryer was placed on administrative leave for two years and his lab was closed. He denied discrimination or harassment.',
    state: 'verified', grade: 'A1', sources: ['gay-2019-fryer', 'hm-2019-fryer'],
    caveat: 'Confirm the wording of the findings from the Dean’s letter.',
  },
  {
    id: 'S-10', page: SAF, topic: 'Campus safety',
    claim: 'Roland Fryer returned to teaching and research in 2021 under conditions.',
    state: 'verified', grade: 'A2', sources: ['crimson-2021-fryer'],
  },
  {
    id: 'S-11', page: SAF, topic: 'Campus safety',
    claim: 'In January 2022 Harvard placed John Comaroff on unpaid leave after reviews found verbal conduct violating its policies. He has denied the allegations.',
    state: 'verified', grade: 'A1', sources: ['harvard-2022-statement', 'crimson-2022-comaroff'],
  },
  {
    id: 'S-12', page: SAF, topic: 'Campus safety',
    claim: 'A lawsuit by three graduate students against the University ended in August 2024 with a voluntary dismissal after mediation, without a ruling on the merits.',
    state: 'verified', grade: 'A2', sources: ['crimson-2024-comaroff-suit'],
    caveat: 'Settlement terms undisclosed. John Comaroff was not a defendant.',
  },
  {
    id: 'S-13', page: SAF, topic: 'Campus safety',
    claim: 'John Comaroff retired in June 2024.',
    state: 'verified', grade: 'A2', sources: ['crimson-2024-comaroff-retires'],
  },
  {
    id: 'S-14', page: SAF, topic: 'Campus safety',
    claim: 'No source reviewed documents an assault or harassment complaint at Harvard arising from Epstein’s campus visits.',
    state: 'none', grade: 'A1', sources: ['harvard-2020-report'],
    caveat: 'A statement of absence across the sources reviewed.',
  },

  // ------------------------------------------------------------ Law
  {
    id: 'L-01', page: DNA, topic: 'Law',
    claim: 'GINA bars health insurers and employers with fifteen or more employees from using genetic information in coverage or employment decisions.',
    state: 'verified', grade: 'A1', sources: ['gina-statute'],
  },
  {
    id: 'L-02', page: DNA, topic: 'Law',
    claim: 'GINA does not reach life, disability or long-term-care insurance.',
    state: 'verified', grade: 'B1', sources: ['nsgc-gina'],
    caveat: 'An absence from the statute, cited to a secondary authority.',
  },
  {
    id: 'L-03', page: DNA, topic: 'Law',
    claim: 'No source reviewed alleges a GINA violation in connection with this material.',
    state: 'none', grade: 'A1', sources: ['gina-statute'],
    caveat: 'A statement of absence.',
  },
];
