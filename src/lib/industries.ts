/**
 * Industry landing pages — one entry per vertical, rendered by
 * /industries/[slug].astro. Same pattern as towns.ts: distinct copy per
 * entry, parsed by scripts/generate-og.mjs via regex on slug/name.
 * Retail intentionally lives at /retail/ — the index page points there.
 */
export interface Industry {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  intro: string;
  pains: string[];
  installs: { system: string; why: string }[];
  tool: { href: string; label: string };
  proof?: { href: string; label: string };
}

export const INDUSTRIES: Industry[] = [
  {
    slug: 'trades-home-services',
    name: 'Trades & Home Services',
    eyebrow: 'Contractors · Paving · Roofing · HVAC · Landscaping · Plumbing',
    headline: 'The job goes to whoever answers first. Be first, every time.',
    intro:
      "Trades work is won in the first hour: the homeowner calls three companies and hires the one that picks up, quotes fast, and looks legitimate online. Most contractors lose that race while they're on a roof doing the actual work. Our systems run the race for you — answering, quoting, and following up while your hands stay on the tools.",
    pains: [
      'Leads call while you’re on a job — and hire whoever answered',
      'Quotes go out late and follow-up dies after one text',
      'Word-of-mouth is great until the referral checks your website',
      'The big franchises outspend you on ads you can’t match',
    ],
    installs: [
      { system: 'JobSite', why: 'A conversion storefront with an instant-quote calculator — the customer prices their own job in 60 seconds and lands in your pipeline, not a competitor’s.' },
      { system: 'Lead Engine', why: 'Every call and form answered in under 60 seconds, 24/7, with qualifying questions that make sense for your trade — then chased to a decision.' },
      { system: 'Market Lock', why: 'One contractor per trade, per territory. When you hold your category, your competitor calling us gets a no.' },
    ],
    tool: { href: '/quotebrain/', label: 'Try QuoteBrain on your own driveway — the live demo prices pavement in 60 seconds' },
    proof: { href: '/case-studies/south-shore-paving-contractor/', label: 'From word-of-mouth to a lead machine: the paving case study' },
  },
  {
    slug: 'restaurants-food',
    name: 'Restaurants & Food',
    eyebrow: 'Restaurants · Cafés · Catering · Food trucks',
    headline: 'Full tables are a systems problem, not a luck problem.',
    intro:
      "Every empty table at 7pm is a search that went to somebody else: 'best dinner near me,' asked to Google or an AI assistant, answered by whoever's reviews, photos, and hours looked sharpest. Kitchens are too busy to do marketing — which is exactly why the marketing has to run itself.",
    pains: [
      'Google and AI assistants recommend the competitor with 400 reviews',
      'The menu online is a PDF from two summers ago',
      'Catering inquiries sit unanswered through the dinner rush',
      'You’re paying third-party platforms for customers who were already yours',
    ],
    installs: [
      { system: 'JobSite', why: 'A site that loads fast on a phone at 6:45pm — live menu, hours, photos, reservations and catering inquiries that actually get captured.' },
      { system: 'Lead Engine', why: 'Catering and private-event requests answered in under a minute with real questions — date, headcount, budget — booked before the other caterer checks email.' },
      { system: 'Market Lock', why: 'Own "your dish, your town" in search and AI answers, with a review engine compounding every happy table into tomorrow’s customers.' },
    ],
    tool: { href: '/ai-readiness/', label: 'Score your restaurant’s online presence in 2 minutes — free' },
  },
  {
    slug: 'medical-dental',
    name: 'Medical & Dental',
    eyebrow: 'Dental · Physical therapy · Chiropractic · Med spas · Private practices',
    headline: 'Patients choose the practice that answers. Then they stay for the care.',
    intro:
      "Healthcare is booked, not browsed: a patient searches, calls two offices, and schedules with the one that picked up. Front desks juggle check-ins, insurance, and phones — so after-hours calls and website inquiries leak quietly away. The fix isn't more front desk; it's systems that never put a caller on hold.",
    pains: [
      'After-hours callers book with whoever answers in the morning first',
      'New-patient forms and reminders still run on paper and phone tag',
      'Your reviews trail the practice across town — and patients read them',
      'Insurance questions eat the front desk’s day',
    ],
    installs: [
      { system: 'JobSite', why: 'A practice site that converts: services explained plainly, insurance answered up front, online booking patients actually use.' },
      { system: 'Lead Engine', why: 'Every inquiry answered in under 60 seconds — day, night, lunch rush — with scheduling, reminders, and recall sequences running automatically.' },
      { system: 'Market Lock', why: 'Be the practice AI assistants recommend in your town, with review velocity your competitors can’t match manually.' },
    ],
    tool: { href: '/ai-readiness/', label: 'Two-minute readiness score for your practice — free, no email gate' },
  },
  {
    slug: 'salons-wellness',
    name: 'Salons & Wellness',
    eyebrow: 'Salons · Barbershops · Spas · Fitness studios',
    headline: 'Your chairs make money when they’re full. Fill them automatically.',
    intro:
      "A salon's revenue is its calendar. Every no-show, every empty Tuesday afternoon, every new-client inquiry that waited a day for a reply — that's inventory that expired. The shops that win run on systems: booking that never sleeps, reminders that kill no-shows, and reviews that make the next client's choice for them.",
    pains: [
      'DMs and calls pile up mid-appointment and go cold by closing',
      'No-shows burn the calendar and nobody rebooks the slot',
      'New clients pick from Instagram and reviews — and yours trail',
      'Gift cards, memberships, and retail live in three different systems',
    ],
    installs: [
      { system: 'JobSite', why: 'A booking-first site with your work front and center — portfolio, services, prices, and a calendar clients book without calling.' },
      { system: 'Lead Engine', why: 'Inquiries answered instantly, waitlists worked automatically, no-show reminders and rebooking sequences that keep chairs full.' },
      { system: 'Market Lock', why: 'Own your specialty in your town — the review engine and content system make you the obvious choice before they ever message you.' },
    ],
    tool: { href: '/ai-readiness/', label: 'Score your shop’s online presence — 10 questions, 2 minutes' },
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    eyebrow: 'Law · Accounting · Insurance · Consulting',
    headline: 'Referrals built your firm. Systems make sure they convert.',
    intro:
      "Professional work runs on trust — but even a referred client checks the website before calling, and a prospect who emails Friday afternoon expects acknowledgment before Monday. The firms growing fastest aren't better lawyers or accountants; they're the ones whose intake never sleeps and whose expertise is visible where clients actually look.",
    pains: [
      'Referrals check your website and quietly downgrade their expectations',
      'Intake runs on one inbox — and stalls when that person is in a meeting',
      'Prospects ask AI assistants who to hire, and you’re not in the answer',
      'Billable hours leave no hours for marketing',
    ],
    installs: [
      { system: 'JobSite', why: 'A firm site that carries authority: practice areas explained in client language, credentials visible, consultations booked online.' },
      { system: 'Lead Engine', why: 'Every inquiry acknowledged in under a minute with conflict-aware intake questions, scheduled consultations, and follow-up that never forgets.' },
      { system: 'Market Lock', why: 'Territory-exclusive visibility: when someone asks Google or an AI who handles your specialty in your county, the answer is your firm.' },
    ],
    tool: { href: '/ai-readiness/', label: 'Free 2-minute assessment of your firm’s intake and visibility' },
  },
  {
    slug: 'auto-services',
    name: 'Auto Services',
    eyebrow: 'Repair shops · Detailing · Tire · Body shops',
    headline: 'Bays empty? Your phone rang. Nobody answered.',
    intro:
      "Car trouble doesn't schedule itself politely — people search, call, and book with the first shop that responds while the problem is urgent. A shop floor is loud, hands are greasy, and the counter is three cars deep; the call that could've filled Thursday's bay rings out. Systems answer it.",
    pains: [
      'Calls ring out while every tech is under a car',
      'Estimates promised “by end of day” slip to next week',
      'The chain shop up the road outranks you for every search',
      'Great work, thin reviews — and reviews are how strangers choose',
    ],
    installs: [
      { system: 'JobSite', why: 'A shop site that books: services, honest pricing signals, and appointment requests that land in a system instead of a voicemail.' },
      { system: 'Lead Engine', why: 'Every call and form answered in under 60 seconds, estimates followed up automatically, and reminders that bring maintenance work back.' },
      { system: 'Market Lock', why: 'One shop per specialty per territory — own collision, detailing, or performance in your corner of the South Shore.' },
    ],
    tool: { href: '/ai-readiness/', label: 'Two minutes: find out why the chain shop outranks you' },
  },
  {
    slug: 'solar-energy',
    name: 'Solar & Energy',
    eyebrow: 'Solar installers · HVAC/heat pumps · Energy retrofits',
    headline: 'Long sales cycles reward whoever follows up longest. Automate the patience.',
    intro:
      "Solar and energy work has the trades' speed problem plus a brutal second act: a quote that takes days to produce and a decision that takes weeks — with every competitor circling the same homeowner the whole time. The installer who quotes fastest and follows up relentlessly wins; doing either manually caps your pipeline.",
    pains: [
      'Site visits and manual proposals stretch quote time to a week',
      'Prospects go quiet for three weeks and nobody re-engages them',
      'Incentive and financing questions stall deals you’d already won',
      'National players flood the zone with ads and call centers',
    ],
    installs: [
      { system: 'Lead Engine', why: 'Instant response with qualification built for energy — roof, bill, timeline, financing — and sequences that stay politely relentless for the whole decision cycle.' },
      { system: 'Market Lock', why: 'Territory exclusivity plus AEO: when a homeowner asks an AI assistant whether solar is worth it in Massachusetts, your name is in the answer.' },
      { system: 'JobSite', why: 'A conversion site with calculators and financing clarity that pre-sells the consultation before your rep ever drives out.' },
    ],
    tool: { href: '/ai-readiness/', label: 'Free readiness score — see where your pipeline leaks' },
    proof: { href: '/case-studies/solar-installer-quoting/', label: 'Quote-to-close cut from 11 days to 4: the solar case study' },
  },
];
