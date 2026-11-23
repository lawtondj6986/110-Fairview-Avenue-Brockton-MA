/**
 * The AI Onboarding Retainer: one published structure, priced per practice.
 * The law-office figure is the published example; every other retainer is
 * quoted in writing before anything is signed. Rendered at /retainer/.
 */
export const RETAINER = {
  exampleAmount: 5000,
  onboardingDays: 30,
  includedMonths: 2,
  noticeDays: 30,
};

export interface RetainerPractice {
  key: string;
  name: string;
  who: string;
  /** Published figure, or null when the retainer is quoted per engagement. */
  amount: number | null;
  onboarding: string[];
  care: string;
}

export const PRACTICES: RetainerPractice[] = [
  {
    key: 'legal',
    name: 'Law office',
    who: 'Solo attorneys and small firms',
    amount: 5000,
    onboarding: [
      'A working session with every attorney and staff member on the tools the firm will actually use',
      'Intake, scheduling, and follow-up set up so no inquiry waits for a callback',
      'Drafting, summarizing, and research workflows, with the rules for checking every output',
      'A written firm AI policy: what may and may not go into a tool, and who reviews what',
    ],
    care: 'Client confidences stay inside the firm. ICS trains and configures; it does not practice law, and nothing ICS sets up replaces an attorney\'s review.',
  },
  {
    key: 'medical',
    name: 'Medical or dental practice',
    who: 'Private practices and clinics',
    amount: null,
    onboarding: [
      'Front-desk training on answering, booking, reminders, and recall',
      'Scheduling and reminder workflows connected to the practice system or a synced calendar',
      'Templates for patient messages that carry no clinical detail',
      'A written practice AI policy reviewed with your compliance officer',
    ],
    care: 'No clinical advice and no triage by any system. Where a vendor touches protected health information, a business associate agreement is in place before launch.',
  },
  {
    key: 'real-estate',
    name: 'Real estate office',
    who: 'Brokerages, teams, and property managers',
    amount: null,
    onboarding: [
      'Lead response and follow-up for buyer, seller, and tenant inquiries',
      'Listing, market-update, and client-letter workflows with a review step',
      'Showing and open-house scheduling with reminders',
      'A written office AI policy, including fair-housing language checks',
    ],
    care: 'Training and systems only. In Florida, ICS does no brokerage; a property matter there is handled alongside a licensed Florida broker.',
  },
  {
    key: 'business',
    name: 'Business or professional office',
    who: 'Accounting, insurance, trades, retail, and service companies',
    amount: null,
    onboarding: [
      'A working session for the owner and staff on the tools that fit the business',
      'Answering, quoting, and follow-up set up for the way the business takes work',
      'Document, email, and reporting workflows that save the most hours first',
      'A written AI policy sized for the company',
    ],
    care: 'The work is scoped to the bottleneck you name first, so the first month pays for itself in hours saved.',
  },
];
