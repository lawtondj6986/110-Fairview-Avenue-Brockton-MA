/**
 * Index of people and bodies named on the site.
 *
 * Purpose: fairness. For each name it states, in one place, why the name
 * appears, the strongest thing the cited record says, and what the record does
 * not say. Entries add nothing beyond the claim ledger; `claims` lists the
 * ledger rows each entry rests on.
 *
 * `role` describes why the name appears:
 *   subject      the person the record is about
 *   faculty      a faculty member or researcher whose conduct an institution reviewed or reported on
 *   donor        a donor named in an institutional report or established reporting
 *   staff        an employee or associate who appears as the author or handler of a document
 *   recipient    someone named only as the recipient of a gift or message
 *   source       someone whose account is relayed
 *   institution  an organisation
 */
export interface Named {
  name: string;
  sort: string;
  role: 'subject' | 'faculty' | 'donor' | 'staff' | 'recipient' | 'source' | 'institution';
  why: string;
  recordSays: string;
  recordDoesNotSay: string;
  response?: string;
  claims: string[];
  pages: string[];
}

export const roleLabels: Record<Named['role'], string> = {
  subject: 'Subject of the record',
  faculty: 'Faculty or researcher',
  donor: 'Donor',
  staff: 'Staff or associate',
  recipient: 'Named only as a recipient',
  source: 'Relayed account',
  institution: 'Institution',
};

const PED = '/program-for-evolutionary-dynamics/';
const HMS = '/harvard-medical-school/';
const DON = '/donor-pathways/';
const DNA = '/dna-genetics/';
const SAF = '/campus-safety/';

export const named: Named[] = [
  {
    name: 'Jeffrey Epstein', sort: 'Epstein', role: 'subject',
    why: 'The donor whose gifts, introductions and campus access are the subject of the institutional reviews summarised here.',
    recordSays: 'Convicted in Florida in 2008. Gave Harvard about $9.1 million between 1998 and 2008, and kept access to one research program until 2018. Died in August 2019.',
    recordDoesNotSay: 'The site makes no claim about his conduct beyond what the cited institutional reports, filings and reporting state.',
    claims: ['F-01', 'F-02', 'F-03', 'A-01', 'A-02'], pages: [PED, DON, DNA],
  },
  {
    name: 'Martin Nowak', sort: 'Nowak', role: 'faculty',
    why: 'Director of the Program for Evolutionary Dynamics, which Epstein’s 2003 gift established.',
    recordSays: 'Harvard’s Faculty of Arts and Sciences found in 2021 that he had violated policies on professional conduct, campus access and endorsements, and imposed two-year restrictions that were lifted in 2023. He was placed on paid leave a second time in February 2026 pending an investigation.',
    recordDoesNotSay: 'He is not accused of a crime. No published finding addresses research misconduct. The outcome of the 2026 investigation has not been published.',
    response: 'He has said he had no knowledge of Epstein’s crimes and regrets the connection.',
    claims: ['R-02', 'R-03', 'R-04', 'R-06', 'R-07', 'A-07'], pages: [PED],
  },
  {
    name: 'George Church', sort: 'Church', role: 'faculty',
    why: 'Harvard Medical School geneticist whose laboratory received support from Epstein’s foundation before 2008 and from introduced donors afterward.',
    recordSays: 'Harvard’s report records $2 million for his work from introduced donors between 2010 and 2015. Reporting describes a 2013 dispute in his lab over prioritising Epstein’s tissue sample, which he confirmed.',
    recordDoesNotSay: 'No disciplinary finding against him was located. Reporting states he is not accused of wrongdoing.',
    response: 'He apologised publicly in 2019 for continued contact, and has said he did not personally press for special treatment of the sample.',
    claims: ['D-02', 'F-06', 'G-01', 'R-09', 'D-09'], pages: [HMS, DON],
  },
  {
    name: 'Joseph Thakuria', sort: 'Thakuria', role: 'faculty',
    why: 'Physician who sent the June 2014 invoice for genetic sequencing.',
    recordSays: 'Then a senior physician at Massachusetts General Hospital, not directly employed by Harvard. The invoice listed an initial $2,000 for sequencing and priced further proposals.',
    recordDoesNotSay: 'Reporting states he is not accused of wrongdoing. There is no record that the larger proposals were paid for or performed.',
    response: 'He said a $2,000 cheque covered sequencing, that Epstein was a research subject, and that the larger project was a preliminary idea that never went anywhere.',
    claims: ['G-03', 'G-04', 'G-05'], pages: [HMS, DNA],
  },
  {
    name: 'Leon Black', sort: 'Black', role: 'donor',
    why: 'Financier identified in reporting on Harvard’s review as the largest of the donors Epstein introduced.',
    recordSays: 'About $7 million in gifts for Professor Nowak’s work between 2011 and 2015 is attributed to him, his wife and their family foundation.',
    recordDoesNotSay: 'Harvard’s review found no evidence that Epstein directed the gifts. No public record connects the family foundation’s separate 2018 fellowship gift to Epstein.',
    response: 'A representative confirmed the introduction and said the funds were not provided by Epstein.',
    claims: ['D-04', 'D-05', 'D-06'], pages: [DON],
  },
  {
    name: 'Karyna Shuliak', sort: 'Shuliak', role: 'staff',
    why: 'Author of an April 2017 email asking for two consumer DNA test kits to be sent as gifts.',
    recordSays: 'The email is quoted in reporting on the Justice Department release.',
    recordDoesNotSay: 'The email describes a gift of a retail product. It does not describe research, analysis or any use of results.',
    claims: ['G-07'], pages: [DNA],
  },
  {
    name: 'Lesley Groff', sort: 'Groff', role: 'staff',
    why: 'Assistant who placed a bulk order for consumer DNA test kits in summer 2017.',
    recordSays: 'Reporting describes her correspondence with the company’s customer support about the order.',
    recordDoesNotSay: 'The correspondence concerns purchasing and shipping. It does not describe any use of the kits.',
    claims: ['G-08'], pages: [DNA],
  },
  {
    name: 'Bella Klein', sort: 'Klein', role: 'staff',
    why: 'Accountant who asked that an email be kept as backup for a reimbursement.',
    recordSays: 'A one-line bookkeeping note quoted in reporting.',
    recordDoesNotSay: 'Nothing beyond routine expense handling.',
    claims: ['G-07'], pages: [DNA],
  },
  {
    name: 'Noam Chomsky and Valeria Chomsky', sort: 'Chomsky', role: 'recipient',
    why: 'Named in an April 2017 email as the intended recipients of two consumer DNA test kits.',
    recordSays: 'Two kits were bought on Amazon and shipped.',
    recordDoesNotSay: 'Nothing shows whether the kits were used. Receiving a gift implies nothing about the recipient, and no wrongdoing is alleged or suggested.',
    claims: ['G-07'], pages: [DNA],
  },
  {
    name: 'Woody Allen and Soon-Yi Previn', sort: 'Allen', role: 'recipient',
    why: 'Named in a September 2016 email as the intended recipients of consumer DNA test kits.',
    recordSays: 'An email says kits had arrived and would be delivered.',
    recordDoesNotSay: 'Nothing shows whether the kits were used. Receiving a gift implies nothing about the recipient, and no wrongdoing is alleged or suggested.',
    claims: ['G-06'], pages: [DNA],
  },
  {
    name: 'Sultan Ahmed bin Sulayem', sort: 'Sulayem', role: 'recipient',
    why: 'Named in correspondence as the person for whose colleagues a bulk order of consumer DNA test kits was placed.',
    recordSays: 'The company queried the order and cancelled it under its terms of use.',
    recordDoesNotSay: 'Accounts differ on the size of the order and what became of the kits. Nothing describes any use of results.',
    claims: ['G-08'], pages: [DNA],
  },
  {
    name: 'Jaron Lanier', sort: 'Lanier', role: 'source',
    why: 'Author whose account of a conversation is relayed in a 2019 newspaper report.',
    recordSays: 'He described what a third person told him at a dinner.',
    recordDoesNotSay: 'He did not hear the account from Epstein, and the newspaper reported no evidence that the idea was acted on. He appears only as a source.',
    claims: ['G-09'], pages: [DNA],
  },
  {
    name: 'Joi Ito', sort: 'Ito', role: 'faculty',
    why: 'Director of the MIT Media Lab during the period covered by MIT’s 2020 report.',
    recordSays: 'MIT’s report found the Media Lab received $525,000 from Epstein after his conviction. He resigned in September 2019.',
    recordDoesNotSay: 'The report concluded that accepting the gifts did not violate an MIT policy then in force, while calling the decisions errors of judgement.',
    claims: ['M-02', 'M-05'], pages: [DON, '/comparison/'],
  },
  {
    name: 'Seth Lloyd', sort: 'Lloyd', role: 'faculty',
    why: 'MIT professor who received gifts from Epstein after the conviction.',
    recordSays: 'MIT’s report records $225,000 in gifts. He was placed on paid leave, later disciplined, and continued to teach.',
    recordDoesNotSay: 'The details of the discipline should be read from MIT’s own letter.',
    claims: ['M-02', 'M-05'], pages: [DON, '/comparison/'],
  },
  {
    name: 'Jorge Domínguez', sort: 'Domínguez', role: 'faculty',
    why: 'Former Harvard government professor whose case led to an external review of how the University handles sexual harassment.',
    recordSays: 'In 2019 Harvard announced that a Title IX investigation had found unwelcome sexual conduct toward several individuals over nearly four decades, revoked his emeritus status and barred him from campus.',
    recordDoesNotSay: 'This summary does not yet include his own public response, which is recorded in the cited reporting.',
    claims: ['S-06', 'S-07'], pages: [SAF],
  },
  {
    name: 'Roland Fryer', sort: 'Fryer', role: 'faculty',
    why: 'Harvard economics professor sanctioned in 2019.',
    recordSays: 'Placed on administrative leave for two years, with his lab closed, following complaints of unwelcome sexual conduct. He returned to teaching and research in 2021 under conditions.',
    recordDoesNotSay: 'The exact wording of the findings should be read from the Dean’s letter.',
    response: 'He denied engaging in discrimination or harassment.',
    claims: ['S-09', 'S-10'], pages: [SAF],
  },
  {
    name: 'John Comaroff', sort: 'Comaroff', role: 'faculty',
    why: 'Former Harvard professor placed on unpaid leave in 2022.',
    recordSays: 'Harvard said internal reviews found that he engaged in verbal conduct violating its sexual harassment and professional conduct policies. He retired in June 2024.',
    recordDoesNotSay: 'He was not a defendant in the lawsuit brought against the University by three graduate students, which ended without a ruling on the merits.',
    response: 'He has denied the allegations.',
    claims: ['S-11', 'S-12', 'S-13'], pages: [SAF],
  },
  {
    name: 'Harvard University', sort: 'Harvard', role: 'institution',
    why: 'The institution whose public record this site reviews.',
    recordSays: 'Published a review of Epstein’s connections in 2020, sanctioned a faculty member and closed a program in 2021, and opened a second review in 2025 that it widened in 2026.',
    recordDoesNotSay: 'No findings from the second review had been published when the pages were last reviewed.',
    claims: ['F-03', 'R-02', 'R-03', 'R-05'], pages: [PED, HMS, DON, SAF],
  },
  {
    name: 'Massachusetts Institute of Technology', sort: 'MIT', role: 'institution',
    why: 'Included for comparison. MIT commissioned its own fact-finding report in 2020.',
    recordSays: 'Received ten gifts totalling $850,000, nine of them after the 2008 conviction, with the knowledge of three vice-presidents from 2013.',
    recordDoesNotSay: 'The 2020 report predates the 2026 document release, and later reporting describes connections it did not cover.',
    claims: ['M-01', 'M-02', 'M-03', 'M-04', 'M-06'], pages: [DON, '/comparison/'],
  },
  {
    name: 'Massachusetts General Hospital', sort: 'Massachusetts General', role: 'institution',
    why: 'Employer of the physician who issued the 2014 sequencing invoice.',
    recordSays: 'The hospital said it has no record of approving the studies described in the emails.',
    recordDoesNotSay: 'No finding by the hospital was located.',
    claims: ['G-05'], pages: [HMS],
  },
  {
    name: 'Southern Trust Company', sort: 'Southern Trust', role: 'institution',
    why: 'Epstein’s U.S. Virgin Islands company, described to a tax-incentive commission as an informatics consultancy.',
    recordSays: 'The territory’s Attorney General alleged that it made fraudulent misrepresentations to obtain tax benefits. The case settled in 2022.',
    recordDoesNotSay: 'No court ruled on the allegations. No public output shows that the company did genetic work.',
    claims: ['V-01', 'V-02', 'V-03', 'V-04'], pages: [DNA],
  },
  {
    name: '23andMe', sort: '23andMe', role: 'institution',
    why: 'Maker of the consumer DNA test kits that appear in the released emails.',
    recordSays: 'Its customer support questioned a bulk order and cancelled it under the company’s terms of use.',
    recordDoesNotSay: 'Nothing suggests the company did anything other than sell a retail product and enforce its terms.',
    claims: ['G-08'], pages: [DNA],
  },
];
