/**
 * AI Readiness Score — questions, scoring, grades, and prescriptions.
 * Four categories, 100 points total. Pure data + pure functions so the
 * assessment logic is testable and reusable in client installs/workshops.
 */

export interface Option {
  label: string;
  points: number;
}

export interface Question {
  id: string;
  category: CategoryKey;
  text: string;
  options: Option[];
}

export type CategoryKey = 'speed' | 'reputation' | 'operations' | 'visibility';

export const CATEGORIES: Record<CategoryKey, { name: string; max: number }> = {
  speed: { name: 'Lead Response Speed', max: 30 },
  reputation: { name: 'Reviews & Reputation', max: 20 },
  operations: { name: 'Back-Office Automation', max: 30 },
  visibility: { name: 'Search & AI Visibility', max: 20 },
};

export const QUESTIONS: Question[] = [
  {
    id: 'after-hours',
    category: 'speed',
    text: 'A new lead calls or messages at 7pm on a Tuesday. What actually happens?',
    options: [
      { label: 'A system or person responds within minutes, 24/7', points: 10 },
      { label: 'Voicemail — we call back the next business day', points: 4 },
      { label: 'It waits until someone checks messages', points: 2 },
      { label: 'Honestly? Some never get a response', points: 0 },
    ],
  },
  {
    id: 'response-time',
    category: 'speed',
    text: 'During work hours, how fast does a typical new lead get a first response?',
    options: [
      { label: 'Under 5 minutes', points: 10 },
      { label: 'Within the hour', points: 6 },
      { label: 'Same day, usually', points: 3 },
      { label: 'A day or more', points: 0 },
    ],
  },
  {
    id: 'quote-followup',
    category: 'speed',
    text: 'You sent a quote three days ago. No reply. What happens next?',
    options: [
      { label: 'Automatic follow-up sequence — day 2, 5, and 10', points: 10 },
      { label: 'I follow up when I remember', points: 4 },
      { label: "That's the customer's move, not mine", points: 0 },
    ],
  },
  {
    id: 'review-volume',
    category: 'reputation',
    text: 'How many new Google reviews did your business get in the last 30 days?',
    options: [
      { label: 'Five or more', points: 10 },
      { label: 'One to four', points: 6 },
      { label: 'Zero — but we have older ones', points: 2 },
      { label: 'We barely have reviews at all', points: 0 },
    ],
  },
  {
    id: 'review-asks',
    category: 'reputation',
    text: 'How do review requests actually get sent?',
    options: [
      { label: 'Automatically, after every completed job or visit', points: 10 },
      { label: 'We ask when we think of it', points: 4 },
      { label: "We don't ask", points: 0 },
    ],
  },
  {
    id: 'quoting',
    category: 'operations',
    text: 'How does a new estimate or proposal get built?',
    options: [
      { label: 'Templated or instant — minutes, not days', points: 10 },
      { label: 'A spreadsheet I rework for every job', points: 5 },
      { label: 'From scratch, every single time', points: 2 },
    ],
  },
  {
    id: 'invoices',
    category: 'operations',
    text: 'Who chases the unpaid invoices?',
    options: [
      { label: 'Automatic reminders — day 7, 14, 21', points: 10 },
      { label: 'Me or the bookkeeper, manually, eventually', points: 4 },
      { label: 'They slide. Sometimes for months', points: 0 },
    ],
  },
  {
    id: 'admin-hours',
    category: 'operations',
    text: 'How many hours a week does the owner personally spend on admin — scheduling, follow-up, paperwork?',
    options: [
      { label: 'Under 5 — systems handle most of it', points: 10 },
      { label: '5 to 10', points: 6 },
      { label: '10 to 20', points: 3 },
      { label: 'More than 20. It never ends', points: 0 },
    ],
  },
  {
    id: 'local-search',
    category: 'visibility',
    text: 'Someone searches "[your service] near me" in your town right now. Where do you show up?',
    options: [
      { label: 'Top 3 map results, with strong reviews', points: 10 },
      { label: 'First page, somewhere', points: 6 },
      { label: 'Buried a few pages back', points: 2 },
      { label: 'No idea — never checked', points: 0 },
    ],
  },
  {
    id: 'website-job',
    category: 'visibility',
    text: "Finish the sentence: my website's job is…",
    options: [
      { label: 'Generating measurable leads, every week', points: 10 },
      { label: 'Existing. It looks fine', points: 4 },
      { label: "Embarrassing me — it's badly outdated", points: 1 },
      { label: "What website?", points: 0 },
    ],
  },
];

export interface Grade {
  min: number;
  label: string;
  summary: string;
}

export const GRADES: Grade[] = [
  {
    min: 85,
    label: 'Ahead of your market',
    summary:
      "You're running systems most competitors don't know exist. The play now is compounding: sharper measurement, territory exclusivity, and staying ahead as AI search reshapes who gets found.",
  },
  {
    min: 65,
    label: 'Solid — with gaps to close',
    summary:
      'The foundation is real, but specific gaps below are costing you jobs every month — and they happen to be the cheapest problems on this list to fix.',
  },
  {
    min: 40,
    label: 'Losing to faster competitors',
    summary:
      "You're winning on skill and losing on systems. Every category below the line represents jobs going to whoever answers first, follows up longest, and shows up highest.",
  },
  {
    min: 0,
    label: 'Leaking revenue daily',
    summary:
      "The good news: you're the exact profile that sees the fastest, most measurable turnaround — because every fix below starts paying immediately.",
  },
];

export const PRESCRIPTIONS: Record<CategoryKey, { fix: string; system: string; href: string }> = {
  speed: {
    fix: 'Install instant lead response: every call, form, and message answered in under 60 seconds, 24/7, with qualifying questions that make sense for your business — plus automatic quote follow-up at day 2, 5, and 10.',
    system: 'Lead Engine — First-Minute Response',
    href: '/ai-services/',
  },
  reputation: {
    fix: 'Automate review requests after every completed job with a direct Google link. Review velocity is the currency of local search — and now of AI recommendations too.',
    system: 'Proof Engine (in Lead Engine)',
    href: '/ai-services/',
  },
  operations: {
    fix: 'Templatize quoting, automate invoice chasing, and put booking on a real calendar link. This is where owners typically reclaim 15–25 hours a month.',
    system: 'Lead Engine — quote & invoice automation',
    href: '/ai-services/',
  },
  visibility: {
    fix: 'A conversion-built site with local SEO, structured data, and answer-engine optimization — so you get found by Google and recommended by AI assistants, town by town.',
    system: 'JobSite + AEO program',
    href: '/ai-services/',
  },
};

export function grade(score: number): Grade {
  return GRADES.find((g) => score >= g.min)!;
}
