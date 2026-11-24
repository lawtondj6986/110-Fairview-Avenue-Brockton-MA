/** Public change log. Newest first. Add an entry for every substantive edit or correction. */
export const updates: { date: string; kind: 'Edition' | 'Update' | 'Correction'; text: string }[] = [
  {
    date: '2026-11-24',
    kind: 'Correction',
    text: 'Program for Evolutionary Dynamics page: we had said the difference between “$9.1 million” and “$9,179,000” was rounding. It is not, since $9,179,000 rounds to $9.2 million. The page now says the figures differ and uses the University’s own figure until the report is checked. Also reworded one claim about a bulk test-kit order to say whom the correspondence says it was for, instead of calling it “linked”.',
  },
  {
    date: '2026-11-24',
    kind: 'Update',
    text: 'Added a funding chart on one scale, a one-page printable briefing, filters on the claim ledger, glossary links on the record pages, and direct links between guides and law explainers. No claims were added or changed.',
  },
  {
    date: '2026-11-21',
    kind: 'Update',
    text: 'Reference section added: glossary, law explainers, guides and templates, a claim ledger, an index of people and bodies named, per-source record pages, search, and privacy and accessibility statements. No claims about named people were added.',
  },
  {
    date: '2026-11-20',
    kind: 'Edition',
    text: 'First edition published. Source entries are marked “pending check” until each has been re-read against the original document.',
  },
];
