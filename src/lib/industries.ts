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
  {
    slug: 'fitness-studios',
    name: 'Fitness & Studios',
    eyebrow: 'Gyms · Boutique fitness · Martial arts · Yoga & Pilates · Personal training',
    headline: 'Every January you fill up. Every March you leak. Fix the leak.',
    intro:
      "Fitness is a membership business wearing a lead-generation disguise: the trial class, the free week, the 'just looking' DM — each one a lead that either books within the hour or books with the studio down the road. Most owners are on the floor coaching when those leads arrive. Our systems book the trial, chase the no-show, and keep the member who's quietly drifting, so growth stops depending on New Year's resolutions.",
    pains: [
      'Trial-class inquiries arrive while you’re teaching — and go cold in an hour',
      'No-shows and ghosted trials never get a second nudge',
      'Churn is invisible until the card declines',
      'Big-box gyms and apps outspend you on ads you can’t match',
    ],
    installs: [
      { system: 'JobSite', why: 'A site built around one action — book the trial — with schedule, pricing, and reviews up front, so the first visit is a decision, not a question.' },
      { system: 'Lead Engine', why: 'Every inquiry answered in under 60 seconds, trials booked and reminded automatically, no-shows re-invited, and lapsing members nudged before they cancel.' },
      { system: 'Market Lock', why: 'One studio per category per town. When you own “yoga near Hingham,” the next studio calling us gets a no.' },
    ],
    tool: { href: '/ai-readiness/', label: 'Score your studio in two minutes — lead response, reviews, retention, and visibility, graded' },
  },
  {
    slug: 'veterinary-pet-services',
    name: 'Veterinary & Pet Services',
    eyebrow: 'Veterinary clinics · Groomers · Boarding & daycare · Trainers · Mobile pet care',
    headline: 'The 9pm “is this an emergency?” call is a client for life — if someone answers.',
    intro:
      "Pet owners search in moments of worry and book with whoever responds. A clinic or groomer with a full phone queue, a voicemail after hours, and a booking page that needs a phone call is handing new clients to the practice that answers. Our systems triage the inquiry, book the appointment, request the review, and remind the client who's due — so the front desk stops being the bottleneck on growth.",
    pains: [
      'After-hours inquiries hit voicemail and book elsewhere by morning',
      'The front desk is slammed, so new-client calls wait — or bounce',
      'Reviews are great but sparse; the clinic down the road has 400',
      'Reminders, recalls, and reactivations run on sticky notes',
    ],
    installs: [
      { system: 'JobSite', why: 'A site that books: services, pricing transparency where you want it, new-client forms, and reviews — built so a worried owner can act in one tap.' },
      { system: 'Lead Engine', why: 'Every call, text, and form answered in under 60 seconds, 24/7, with sensible triage — then booked, reminded, and followed up for the review.' },
      { system: 'Market Lock', why: 'One practice per category per territory, with the content and answer-engine visibility that makes you the recommended answer when someone asks their phone.' },
    ],
    tool: { href: '/ai-services/#leak', label: 'What do missed after-hours calls cost a clinic per year? Run your own numbers' },
  },
  {
    slug: 'childcare-education',
    name: 'Childcare & Early Education',
    eyebrow: 'Daycares · Preschools · Enrichment & tutoring · After-school programs',
    headline: 'Parents tour three centers and enroll at the one that answered first.',
    intro:
      "Enrollment is won months before the first day: a parent searches, shortlists, requests tours, and chooses the center that replied quickly, looked trustworthy online, and made the tour easy to book. Most centers are busy being excellent with children while those inquiries sit. Our systems answer the parent, book the tour, manage the waitlist, and keep the reviews coming — so your reputation does the recruiting.",
    pains: [
      'Tour requests wait for a free moment that never comes',
      'Waitlists live in a notebook; families drift to whoever confirms first',
      'Trust is everything, and your online presence doesn’t show it',
      'Seasonal enrollment swings leave rooms half-full in the wrong months',
    ],
    installs: [
      { system: 'JobSite', why: 'A site built for a parent’s decision: programs, tuition clarity, licensing, staff, reviews, and a tour you can book in one tap.' },
      { system: 'Lead Engine', why: 'Every inquiry answered in under 60 seconds, tours booked and confirmed, waitlists managed automatically, and enrolled families asked for the review that convinces the next one.' },
      { system: 'Market Lock', why: 'One center per town, with the content and visibility that makes you the answer to “preschool near me” — before the parent ever makes a call.' },
    ],
    tool: { href: '/start/', label: 'Three questions, 45 seconds — match your center to the right system with a published price' },
  },
  {
    slug: 'marine-boat-services',
    name: 'Marine & Boat Services',
    eyebrow: 'Marinas · Boat repair & service · Storage & winterization · Detailing · Charters',
    headline: 'The South Shore has a coastline. Your competitors’ websites don’t know it.',
    intro:
      "From Hingham Harbor to Plymouth, Scituate to Marshfield, the marine trade runs on a brutally seasonal calendar: the spring rush, the summer repairs, the fall winterization and storage scramble. Every one of those is a quote-and-book moment, and almost every marine business still handles it by phone tag. Our systems price the storage, quote the service, book the slip, and follow up — so the season is captured instead of chased.",
    pains: [
      'Winterization and storage quotes go out by phone, one at a time, in the busiest month',
      'Spring commissioning requests pile up and get answered in order of who yelled loudest',
      'Charter and detailing inquiries arrive on Instagram and die there',
      'A seasonal business with a website that looks the same in January and July',
    ],
    installs: [
      { system: 'JobSite', why: 'A site with instant quoting for the standard jobs — storage by length, winterization, detailing, bottom paint — so a boat owner prices and books in 60 seconds, in season or out.' },
      { system: 'Lead Engine', why: 'Every inquiry answered in under 60 seconds across phone, text, and social, booked into the season’s calendar, and followed up before the next marina does.' },
      { system: 'Market Lock', why: 'One marine operator per category per harbor, with seasonal content and the visibility that owns “boat storage near Plymouth” before the fall.' },
    ],
    tool: { href: '/quotebrain/', label: 'See instant quoting in action — the same engine that prices a driveway prices a winterization' },
  },
  {
    slug: 'cannabis-regulated-retail',
    name: 'Cannabis & Regulated Retail',
    eyebrow: 'Licensed MA dispensaries · Delivery · Cultivation-to-retail · Other restricted categories',
    headline: 'When the ad platforms won’t take your money, own the channels they can’t touch.',
    intro:
      "Licensed cannabis retail in Massachusetts runs with one hand tied: Google and Meta restrict or refuse the ads, the big marketplaces take the customer relationship, and compliance shapes every click. We already built for the hardest restricted category on the internet — a Massachusetts firearms dealer whose platform runs the store daily — and the playbook transfers: owned search and answer-engine visibility instead of rented ads, a live-inventory site the store runs from the counter, and reserve-and-pickup flows shaped to the compliance process. Lawful, licensed operators only.",
    pains: [
      'Paid ads are restricted or refused, so growth depends on channels you don’t own',
      'Menu marketplaces own your customer and charge you for the privilege',
      'Inventory changes daily and the website never keeps up',
      'Compliance rules make every off-the-shelf tool a liability',
    ],
    installs: [
      { system: 'JobSite', why: 'A compliant storefront with live inventory synced to the floor, an admin panel the manager runs from the counter, and product-level SEO for the searches the ad platforms won’t sell you.' },
      { system: 'Lead Engine', why: 'Reserve-and-pickup, order status, and loyalty follow-up — every inquiry answered in under 60 seconds within the rules, and the customer relationship kept in-house.' },
      { system: 'Market Lock', why: 'One dispensary per market, with the content system and answer-engine visibility that makes you the recommended answer — the only growth lever the platforms can’t restrict.' },
    ],
    tool: { href: '/ai-readiness/', label: 'Score your dispensary’s owned channels in two minutes — search, reviews, response, and visibility' },
    proof: { href: '/case-studies/outback-arms-retail-platform/', label: 'Regulated retail, proven: the Outback Arms platform — store-reported business up 300%' },
  },
];
