/** Frequently asked questions. `a` is HTML: keep it to paragraphs and links. */
export interface Faq { q: string; a: string }

export const faq: { section: string; items: Faq[] }[] = [
  {
    section: 'About the site',
    items: [
      {
        q: 'Is this an official Harvard website?',
        a: '<p>No. This is an independent project. It is not affiliated with, endorsed by, or sponsored by Harvard University, the Harvard Alumni Association, or any Harvard school or office. Harvard’s own alumni site is at alumni.harvard.edu. The <a href="/about/#disclaimer">full disclaimer</a> is on the About page.</p>',
      },
      {
        q: 'Who is this site for?',
        a: '<p>Prospective students and their families, current students, alumni, and researchers. The summary pages are written for a general reader. The <a href="/ledger/">claim ledger</a> and <a href="/sources/">source register</a> are there for people who want to check the work.</p>',
      },
      {
        q: 'What is the site’s position on the people it names?',
        a: '<p>It does not have one. The site reports what cited records say and marks how strong each record is. Appearing in a document, or on this site, is not evidence of wrongdoing. Where an institution has made a finding about a person, the finding is attributed to that institution. Where a person has denied a claim, the denial is included.</p>',
      },
      {
        q: 'Why does the site use Harvard’s name?',
        a: '<p>Only to identify the institution being discussed. The site does not use Harvard’s shield, seal, colors or typefaces, and every page carries a notice that it is independent.</p>',
      },
      {
        q: 'Does the site accept donations or advertising?',
        a: '<p>No. It carries no advertising, sells nothing, and does not ask for donations or personal information.</p>',
      },
      {
        q: 'Does the site contain private or leaked material?',
        a: '<p>No. Everything comes from public sources: institutional reports, court filings, government releases, statutes, and published reporting. The <a href="/methodology/#rules">editorial rules</a> set this out.</p>',
      },
    ],
  },
  {
    section: 'Reading the evidence',
    items: [
      {
        q: 'What do the grades A1, A2, B1 and B2 mean?',
        a: '<p>They describe the kind of source. A1 is a primary official record, such as an institutional report, a court filing or a statute. A2 is established reporting that quotes or closely follows such records. B1 is secondary analysis with clear sourcing. B2 is thin or unverified material, always flagged. The full definitions are in the <a href="/methodology/#grades">methodology</a>.</p>',
      },
      {
        q: 'Does a high grade mean a claim is true?',
        a: '<p>Not by itself. A grade tells you how reliable the source is as a record of what it says. A court complaint is an A1 record of what a party alleged. It is not proof that the allegation is correct. That is why each claim also carries an evidence state.</p>',
      },
      {
        q: 'What are the three evidence states?',
        a: '<p><strong>Stated intent</strong> means something was proposed or said. <strong>Documented activity</strong> means a record shows something was done. <strong>Verified implementation</strong> means an official finding or independent result confirms the act and its outcome. A fourth label, <strong>nothing on record</strong>, marks a statement that no record was found.</p>',
      },
      {
        q: 'Why keep a proposal separate from an act?',
        a: '<p>Because the record contains several priced proposals and stated plans that were never carried out. Presenting them alongside things that did happen, without marking the difference, would mislead. The <a href="/dna-genetics/">DNA and genetics page</a> shows the method applied item by item.</p>',
      },
      {
        q: 'What does “pending check” mean?',
        a: '<p>It means the entry was compiled from published summaries of the source and has not yet been re-read against the original document by a maintainer. Entries lose the label when a check date is recorded. Until then, treat the detail as provisional.</p>',
      },
      {
        q: 'What does “no record found” mean?',
        a: '<p>Exactly that: the sources reviewed do not contain it. It is not a finding that something did not happen. The site states absences this way on purpose.</p>',
      },
      {
        q: 'Why do some figures differ from what I have read elsewhere?',
        a: '<p>Outlets round differently, count different periods, or count different things. Where the site found a discrepancy, the page says so and explains which figure it uses. A common example is a university-wide gift total being quoted as if it were the amount given to one program.</p>',
      },
      {
        q: 'Why are unofficial document archives and wikis not cited?',
        a: '<p>They can be useful for finding a document, but they are not a reliable record of it. Text can be mis-transcribed, summarized inaccurately, or mixed with commentary. The site cites established reporting until the original document can be linked directly.</p>',
      },
    ],
  },
  {
    section: 'The record itself',
    items: [
      {
        q: 'Did Harvard take money from Jeffrey Epstein after his 2008 conviction?',
        a: '<p>Harvard’s own 2020 review found that it did not. The review counted about $9.1 million in gifts, all received between 1998 and 2008. What continued after 2008 was physical access to one research program and gifts from other donors he had introduced. See the <a href="/program-for-evolutionary-dynamics/">Program for Evolutionary Dynamics</a> page.</p>',
      },
      {
        q: 'What is an “introduced donor”?',
        a: '<p>A donor who was introduced to a faculty member or program by a third person. Harvard’s review recorded $9.5 million from donors Epstein had introduced. The donors denied that he directed their gifts, and the review found no evidence that he did. See <a href="/donor-pathways/">donor pathways</a>.</p>',
      },
      {
        q: 'Does the record show a genetics program?',
        a: '<p>No. It shows one small sequencing job, some unfunded proposals, consumer test kits sent as gifts, a business description that later drew a fraud allegation, and a second-hand account of something said. The record does not connect these, and it shows no shared database or research output. See the <a href="/dna-genetics/">DNA and genetics record</a>.</p>',
      },
      {
        q: 'Were people who received a DNA test kit involved in anything?',
        a: '<p>Nothing in the record suggests so. The emails show staff buying and posting a retail product as a gift. They do not show whether a recipient used a kit, and receiving one implies nothing about the recipient.</p>',
      },
      {
        q: 'Is Harvard’s review finished?',
        a: '<p>The 2020 review is complete and published. A second review opened in November 2025 and was widened in February 2026. No findings from it had been published when the pages were last reviewed. Each page shows its own “last reviewed” date.</p>',
      },
      {
        q: 'How does Harvard compare with MIT?',
        a: '<p>The patterns differ. MIT accepted gifts directly after the conviction, with the knowledge of senior administrators. Harvard did not accept direct gifts but allowed continued physical access at one program. The <a href="/comparison/">comparison table</a> sets the two side by side.</p>',
      },
    ],
  },
  {
    section: 'Campus safety',
    items: [
      {
        q: 'Where can I find current campus crime numbers?',
        a: '<p>In the Annual Security Report that every U.S. college participating in federal student aid must publish each October. The <a href="/campus-safety/#where">campus safety page</a> links to Harvard’s, and the guide to <a href="/guides/">reading a campus security report</a> explains what the tables do and do not count.</p>',
      },
      {
        q: 'Do higher reported numbers mean a campus is less safe?',
        a: '<p>Not necessarily. Reported incidents depend heavily on whether people feel able to report. A campus with strong reporting channels can show higher numbers than one where incidents go unreported. Survey prevalence and reported incidents measure different things and should be read together.</p>',
      },
      {
        q: 'Why does the site name some faculty members in the campus safety section?',
        a: '<p>Only where the University itself announced a finding or sanction, or a court record exists. Each summary is attributed, and each includes the person’s denial where one was made.</p>',
      },
      {
        q: 'Is there a documented link between the donor material and campus safety complaints?',
        a: '<p>No. Harvard’s 2020 review said it did not find evidence that Epstein engaged with undergraduate students during his visits, and no source reviewed documents a complaint arising from them. The two subjects are presented separately for that reason.</p>',
      },
      {
        q: 'I need help now. Can this site advise me?',
        a: '<p>No. This is a research reference. In the United States, the National Sexual Assault Hotline is 800-656-4673. Students and staff can find confidential resources on their own university’s website.</p>',
      },
    ],
  },
  {
    section: 'Corrections and use',
    items: [
      {
        q: 'How do I report an error?',
        a: '<p>Write to the address on the <a href="/about/#corrections">About page</a> with the page, the sentence, and a public source that can be checked. Confirmed errors are corrected on the page and recorded in the <a href="/updates/">update log</a>.</p>',
      },
      {
        q: 'I am named on the site. Can I respond?',
        a: '<p>Yes. Requests from people named on the site are handled first. A response can be added alongside the relevant passage, and material that cannot be supported by a public source at grade A2 or above is removed.</p>',
      },
      {
        q: 'How often is the site updated?',
        a: '<p>When a new public document appears or an error is found. Every page carries a “last reviewed” date, and every change is listed in the <a href="/updates/">update log</a>, which is also available as a feed.</p>',
      },
      {
        q: 'Can I cite or reuse this material?',
        a: '<p>You may link to and quote from the site with attribution. For anything you intend to publish, cite the original source rather than this site: each <a href="/sources/">source record</a> links to it. The register can be downloaded in several formats.</p>',
      },
      {
        q: 'Can I get the data?',
        a: '<p>Yes. The source register is available as JSON, CSV and BibTeX, and the claim ledger as JSON and CSV. Links are on the <a href="/sources/">sources</a> and <a href="/ledger/">ledger</a> pages.</p>',
      },
    ],
  },
];
