/**
 * Honest head-to-heads: ICS systems against the other ways a South Shore
 * business actually solves the same problem. One entry per alternative,
 * rendered at /compare/[slug].astro. Each one says plainly when the
 * alternative is the right call, because sometimes it is.
 */
export interface Alternative {
  slug: string;
  name: string;
  /** How people say it on the phone. */
  aka: string;
  eyebrow: string;
  headline: string;
  intro: string;
  /** What the alternative is, in one fair paragraph. */
  whatItIs: string;
  /** Typical cost of the alternative, stated as a range with the basis. */
  theirCost: string;
  /** The ICS system most often compared, and its published price. */
  icsSystem: string;
  icsCost: string;
  rows: [string, string, string][];
  chooseThem: string[];
  chooseIcs: string[];
  hiddenCosts: string[];
  questions: string[];
  faqs: { q: string; a: string }[];
  tool: { href: string; label: string };
  /** A worked example with numbers. */
  example: { setup: string; them: string; ics: string; verdict: string };
}

export const ALTERNATIVES: Alternative[] = [
  {
    slug: 'buying-leads',
    name: 'Buying shared leads',
    aka: 'Angi, HomeAdvisor, Thumbtack, and the lead-gen sites',
    eyebrow: 'ICS vs. lead marketplaces',
    headline: 'Renting leads versus owning the machine that makes them.',
    intro:
      'Lead marketplaces sell the same homeowner inquiry to three, four, or five contractors at once and charge each of you whether or not you win. It is the fastest way to get a phone ringing and the most expensive way to keep it ringing. Here is the honest comparison with a system you own.',
    whatItIs:
      'A marketplace captures homeowner requests with its own advertising, then sells each request to several local businesses in that category at a per-lead price. You pay for the lead, not the job. The marketplace owns the customer relationship, the reviews collected on its platform, and the pricing.',
    theirCost: '$25 to $120 per shared lead in most trades; $1,500 to $6,000 a month for an active account; win rates of 10% to 25%.',
    icsSystem: 'JobSite + Lead Engine',
    icsCost: '$6,500 to $9,500 plus $450 to $700 a month, or $12,000 to $18,000 plus $1,500 to $2,500 a month',
    rows: [
      ['Who owns the customer', 'The marketplace; the homeowner knows the platform, not you', 'You; the inquiry lands in your pipeline from your site, your profile, your number'],
      ['Competition on each lead', 'Three to five businesses called at once', 'None; they contacted you'],
      ['Cost per won job', '$200 to $600 once losses are counted', 'Falls every month as reviews and rankings compound'],
      ['Response speed', 'Whoever calls back first, which is why your phone must be answered on a roof', 'Under 60 seconds, automatically, 24/7'],
      ['Reviews', 'Collected on their platform, under their rules', 'Collected on Google, under your name, forever'],
      ['When you stop paying', 'The leads stop the same day', 'The site, the profile, and the reviews keep producing'],
      ['Pricing transparency', 'Per-lead prices change without notice', 'Published, fixed in writing'],
      ['Best use', 'Filling a gap this month', 'Building the next five years'],
    ],
    chooseThem: [
      'You are brand new and need any work at all in the next two weeks.',
      'You have a seasonal gap and a crew to keep busy, and you can answer every lead within five minutes.',
      'You are testing a new service line and want demand data before investing.',
    ],
    chooseIcs: [
      'You have been paying the marketplace for more than a year and the invoices are not getting smaller.',
      'You are tired of racing four competitors to a voicemail.',
      'You want the reviews, the rankings, and the customer list to be yours when you sell the business.',
    ],
    hiddenCosts: [
      'Paying for leads that were duplicates, out of area, or shopping for a price.',
      'Losing the race on the leads you did pay for because you were working.',
      'The reviews you earn living on a platform you do not control.',
      'Price-shopped jobs at thinner margins, because the homeowner got five quotes.',
    ],
    questions: [
      'How many other businesses receive this same lead?',
      'What is my win rate over the last ninety days, and what did each won job cost me all-in?',
      'Who owns the reviews I earn through your platform if I leave?',
      'Can I pause without losing my ranking?',
    ],
    faqs: [
      { q: 'Can I run both at once?', a: 'Yes, and many clients do for the first quarter. The system answers the marketplace leads in under a minute too, which lifts the win rate there, while the owned channels grow. Most clients turn the marketplace off between month four and month nine when the owned pipeline carries the schedule.' },
      { q: 'Why is the cost per won job so high on marketplaces?', a: 'Because you pay for every lead and win a fraction of them. At $60 a lead and a 20% win rate, each won job cost $300 before you counted the hours spent chasing the other four. Add price-shopping on the jobs you win and the real number is higher.' },
      { q: 'Do you guarantee leads?', a: 'We guarantee response in under 60 seconds and a measurable 90-day result against your own baseline, in writing, or the monthly fee stops until we hit it. We do not promise a number of leads because nobody honest can; we promise that none of the ones you get will be missed.' },
    ],
    tool: { href: '/payback/', label: 'Run your own numbers in the Payback Calculator' },
    example: {
      setup: 'A two-crew paving contractor in Abington spending $3,200 a month on marketplace leads.',
      them: '55 leads at about $58 each, 11 won, roughly $290 per won job plus the owner answering the phone from the truck. Stop paying and the leads stop.',
      ics: 'Lead Engine at $15,000 installed and $1,800 a month. By month six: 40 owned inquiries a month answered in under a minute, 16 won, and a review base of 70 that keeps ranking. Monthly cost per won job around $110 and falling.',
      verdict: 'The marketplace wins the first sixty days. The system wins every month after, and the asset is yours.',
    },
  },
  {
    slug: 'answering-service',
    name: 'A human answering service',
    aka: 'Virtual receptionists and call centers',
    eyebrow: 'ICS vs. answering services',
    headline: 'A person who takes a message versus a system that books the job.',
    intro:
      'An answering service solves the right problem, the unanswered phone, with the wrong tool: a stranger reading your script, taking a message, and emailing it to you. The message still has to be returned. The quote still has to be sent. The follow-up still does not happen. Here is the comparison with a system that does all three.',
    whatItIs:
      'A staffed service answers your line in your business name during the hours you choose, follows a script, and relays messages by email, text, or into a shared inbox. Better ones can book into a calendar you give them. You pay per minute or per call, with a monthly minimum.',
    theirCost: '$150 to $900 a month for most small businesses, billed by the minute or call; overage is common in busy months.',
    icsSystem: 'Lead Engine',
    icsCost: '$12,000 to $18,000 plus $1,500 to $2,500 a month',
    rows: [
      ['What happens on the call', 'A message is taken from a script', 'The caller is qualified, quoted a range where appropriate, and booked'],
      ['Texts and web forms', 'Usually not covered', 'Covered, same speed, same intake'],
      ['Follow-up after the call', 'None; the message is your to-do list', 'Automatic sequence until a decision'],
      ['Knowledge of your business', 'A script and a FAQ sheet', 'Your pricing rules, service area, calendar, and history'],
      ['Reviews and reactivation', 'Not in scope', 'Built in'],
      ['Cost in a busy month', 'Rises with volume', 'Fixed'],
      ['Reporting', 'Call logs', 'Response time, booked rate, revenue by source, monthly'],
      ['Best use', 'A professional voice for low-volume, high-touch calls', 'Any business that books work from inbound inquiries'],
    ],
    chooseThem: [
      'Your calls are rare, sensitive, and need a human voice every time, such as a small law practice or a bereavement-adjacent service.',
      'You only need overflow coverage for one line during a short season.',
      'Your intake cannot be structured because every call is genuinely different.',
    ],
    chooseIcs: [
      'Your callers want a time, a price range, or an answer, not a callback.',
      'You also get texts and web forms that nobody answers in under a minute.',
      'You want the follow-up and the review ask to happen without you.',
    ],
    hiddenCosts: [
      'The callback you still have to make, usually hours later, when the caller has moved on.',
      'Per-minute billing that climbs exactly in the months you can least watch it.',
      'A script that goes stale when your prices or service area change.',
      'No follow-up, which is where most of the money is lost.',
    ],
    questions: [
      'Can you book directly into my calendar with my rules, or do you take a message?',
      'Do you handle texts and web forms at the same speed as calls?',
      'What happens to the lead after the message is sent?',
      'Show me my average time from first call to booked appointment last month.',
    ],
    faqs: [
      { q: 'Is an AI receptionist worse than a human one?', a: 'For taking a message, a good human is lovely. For getting a caller to a booked, qualified appointment at 9pm, the system wins because it knows your calendar, your pricing, and your rules, and it follows up. Callers care about getting what they called for; most prefer a fast answer to a nice voice and a callback.' },
      { q: 'Can the system hand off to a person?', a: 'Yes, by rule: emergencies, high-value inquiries, upset callers, or anything it cannot resolve routes to you or your staff live, with a transcript. The point is not to remove people from your business; it is to stop the phone from ringing unanswered.' },
      { q: 'What about calls that need judgment?', a: 'They reach a human. The intake captures what the person needs and why it is urgent, so the human who picks up already knows. In practice 70% to 85% of inbound inquiries in service businesses are routine: hours, pricing, availability, booking. Those are the ones that were being missed.' },
    ],
    tool: { href: '/ai-services/#leak', label: 'What missed calls cost you per year: the Revenue Leak calculator' },
    example: {
      setup: 'A three-chair dental practice in Weymouth using an answering service for after-hours and lunch coverage at $420 a month.',
      them: 'Thirty-eight after-hours messages a month, returned the next morning. Nine became patients; the rest had booked elsewhere by 9am.',
      ics: 'Lead Engine books new patients directly at 9pm with insurance pre-check and sends forms. Twenty-two of thirty-eight book, and the recall campaign fills another twenty hygiene slots a month.',
      verdict: 'The service costs less per month and loses more per month. At $1,400 per new patient, thirteen extra patients a month is $18,000 of production the service was quietly handing to the practice across town.',
    },
  },
  {
    slug: 'hiring-in-house',
    name: 'Hiring a marketing person',
    aka: 'A full-time coordinator, or the office manager doing marketing on Fridays',
    eyebrow: 'ICS vs. an in-house hire',
    headline: 'One salary versus one system. Sometimes you want both.',
    intro:
      'At some size, a business should have a person who owns marketing. The question is whether that person should spend their day answering the phone, chasing quotes, and asking for reviews by hand, or whether those jobs should be done by a system so the person can do the work that needs a human. Here is the honest comparison.',
    whatItIs:
      'A salaried employee, usually a coordinator with two to five years of experience, who manages the website through a vendor, posts on social media, answers inbound inquiries during business hours, sends follow-ups, and reports what they can measure. Good ones are worth their weight. They still go home at five.',
    theirCost: '$55,000 to $75,000 salary plus 20% to 30% in taxes and benefits, plus software and the tools they buy; $70,000 to $100,000 a year all-in on the South Shore.',
    icsSystem: 'Lead Engine or Market Lock',
    icsCost: '$12,000 to $30,000 plus $1,500 to $6,000 a month; $30,000 to $100,000 in year one',
    rows: [
      ['Hours covered', '40 a week, business hours', '168 a week'],
      ['Response speed', 'Minutes to hours, when not in a meeting', 'Under 60 seconds'],
      ['Follow-up discipline', 'Depends on the person and the week', 'Every lead, every time, by rule'],
      ['Skills included', 'Generalist; specialists hired as vendors', 'Build, automation, local SEO, AEO, reporting, in one engagement'],
      ['When they leave', 'Knowledge walks out; a new hire restarts', 'The system, the accounts, and the documentation stay'],
      ['Reporting', 'What they can pull together', 'Monthly report tied to revenue, standard'],
      ['Management load', 'A direct report who needs direction', 'A monthly 30-minute review'],
      ['Best use', 'Judgment, relationships, content with a face on it', 'Speed, consistency, measurement, coverage'],
    ],
    chooseThem: [
      'You do more than $5 million in revenue and need someone owning brand, events, partnerships, and recruiting marketing.',
      'Your business is relationship-driven and the marketing job is mostly showing up in the community.',
      'You already have the systems and need a person to run them well.',
    ],
    chooseIcs: [
      'The job you are hiring for is mostly answering, quoting, following up, and asking for reviews.',
      'You cannot afford a strong hire and the weak one would cost you the same leads.',
      'You want coverage at 7am and 9pm and on Saturdays.',
    ],
    hiddenCosts: [
      'Recruiting, onboarding, and the three to six months before a new hire is productive.',
      'The software stack the hire buys to do the job, often $500 to $1,500 a month on its own.',
      'Turnover: the median tenure in coordinator roles is short, and each departure resets the clock.',
      'Business-hours-only coverage for a customer base that searches at night.',
    ],
    questions: [
      'What will this person do between 7am and 9am and after 5pm, when a third of inquiries arrive?',
      'What system will they use to make sure every quote gets followed up?',
      'What happens to what they built if they leave in fourteen months?',
      'How will I know, each month, what their work produced in revenue?',
    ],
    faqs: [
      { q: 'Does the system replace my office manager?', a: 'No. It takes the phone-answering, quote-chasing, and review-asking off their plate, which is usually the part of the job they like least and do least consistently. Office managers tell us the system made their job better, because the inbox stopped being an emergency.' },
      { q: 'What if I already have a marketing coordinator?', a: 'Then the system is their best tool. They point it, review the reports, and spend their time on the work a person should do: content, partnerships, community, hiring. The combination of a good coordinator and a system is stronger than either alone.' },
      { q: 'Is a system cheaper than a hire?', a: 'In year one they are comparable; after that the system is less. The bigger difference is coverage and consistency: 168 hours a week, every lead followed up, no vacations, no turnover. The honest exception is a business that genuinely needs human judgment on most inquiries, which is rarer than people think.' },
    ],
    tool: { href: '/payback/', label: 'Compare the year-one cost against the booked jobs in the Payback Calculator' },
    example: {
      setup: 'A solar installer in Plymouth deciding between a $65,000 coordinator and Market Lock.',
      them: 'The coordinator answers inquiries 9 to 5, sends proposals within two days, and posts twice a week. Nights and weekends go to voicemail; follow-up happens when the week allows.',
      ics: 'Market Lock at $25,000 installed and $4,500 a month: instant response on every inquiry, proposal follow-up on day 2, 5, and 9, referral program, reviews, and the solar category held exclusively in Plymouth.',
      verdict: 'Year one costs are similar. The system books the night-and-weekend third of inquiries the hire never saw. The right answer for this installer two years later: keep the system, hire a person to run community events and referrals.',
    },
  },
  {
    slug: 'franchise-marketing',
    name: 'The franchise marketing program',
    aka: 'The national brand fund and the approved vendor list',
    eyebrow: 'ICS vs. the franchisor\'s program',
    headline: 'National brand awareness versus local lead capture. You need the second one too.',
    intro:
      'A franchise marketing fund buys brand recognition at a scale no local operator could. It rarely answers your phone in Rockland at 7pm, and it almost never tells you which of your leads went unanswered. Most franchisees need both: the brand the fund buys and the local machine the fund does not. Here is where the line falls, and what your franchise agreement may allow.',
    whatItIs:
      'A percentage of revenue, commonly 1% to 4%, paid into a national or regional fund that buys brand advertising, maintains a corporate website with location pages, and sometimes runs lead campaigns that route to local units. Local marketing beyond the fund is usually permitted within brand standards, often through approved vendors.',
    theirCost: '1% to 4% of gross revenue into the fund, plus a required local spend of 1% to 2% in many systems, plus the approved vendor fees.',
    icsSystem: 'Lead Engine (built within brand standards)',
    icsCost: '$12,000 to $18,000 plus $1,500 to $2,500 a month',
    rows: [
      ['What it buys', 'Brand awareness, a corporate location page, national offers', 'Local response speed, follow-up, reviews, and town-level visibility'],
      ['Who answers your phone', 'You', 'The system, in under 60 seconds'],
      ['Local reviews', 'Your job', 'Automated ask tied to completed jobs'],
      ['Town-level search and AI visibility', 'A template location page', 'Your profile, your service-area pages, structured data, within brand rules'],
      ['Reporting', 'Fund-level, sometimes unit-level dashboards', 'Your unit, your revenue, monthly'],
      ['Control', 'Corporate sets the creative and the calendar', 'You set the territory, the intake, and the follow-up'],
      ['Approvals', 'Not needed', 'We work inside brand standards and the approved-vendor process where required'],
      ['Best use', 'Recognition and trust at first contact', 'Capturing and converting the contact'],
    ],
    chooseThem: [
      'The fund already runs lead campaigns that route to you, and your unit answers them within minutes with a documented follow-up process.',
      'Your franchise agreement prohibits any local vendor outside the approved list and the approved list includes a response-and-follow-up system.',
      'You are a single unit in a dense market where brand demand alone fills the schedule.',
    ],
    chooseIcs: [
      'The brand brings the call and the call goes to voicemail.',
      'Corporate reports impressions; you want booked jobs by town.',
      'You operate several units and need one intake, one follow-up standard, and unit-level numbers.',
    ],
    hiddenCosts: [
      'Brand-generated leads lost at the local phone, which the fund never reports.',
      'Approved vendors priced for the system, not for your unit.',
      'A corporate location page that cannot say the specific things your town searches for.',
      'Required local spend going to the same awareness channels the fund already covers.',
    ],
    questions: [
      'What does my franchise agreement allow for local marketing vendors and local pages?',
      'Of the leads the brand sent my unit last quarter, how many were answered within five minutes?',
      'Can I see unit-level reporting on booked revenue by source?',
      'Who collects reviews for my location, and how many did we add last month?',
    ],
    faqs: [
      { q: 'Will corporate allow an outside system?', a: 'Often yes for intake, follow-up, and reviews, because those sit below the brand layer; sometimes approval is required for anything that touches the website or ads. We read the marketing section of your agreement first and build inside it. Where the agreement says no, we say so and stop.' },
      { q: 'Does Market Lock conflict with a franchise territory?', a: 'They are different things. Your franchise territory is a right against other franchisees of the same brand. Market Lock is our promise not to install the same system for a competitor in your category in your town. One does not affect the other, and most franchisees want both.' },
      { q: 'Can one system run across several units?', a: 'Yes, and that is where it is strongest: one intake standard, one follow-up cadence, one review process, and unit-by-unit numbers on a single monthly report. Multi-unit operators usually find one underperforming location in the first report.' },
    ],
    tool: { href: '/ai-readiness/', label: 'Score your unit\'s local presence in two minutes, independent of the brand' },
    example: {
      setup: 'A two-unit home services franchisee in Brockton and Taunton paying 2% into the fund and 1% local.',
      them: 'The brand drives roughly 90 inquiries a month across both units. The office answers 60% live; the rest get a next-day callback. No unit-level revenue report.',
      ics: 'Lead Engine across both units at $16,000 installed and $2,200 a month, inside brand standards: 100% answered, follow-up on every quote, reviews tied to job completion, one report for both towns.',
      verdict: 'The fund keeps buying the calls. The system stops wasting 36 of them a month. At a $900 average ticket and a 40% close rate, that is about $13,000 a month the franchisee was already paying to generate and then losing.',
    },
  },
  {
    slug: 'software-subscription',
    name: 'Buying the software yourself',
    aka: 'A CRM, a chatbot, a booking app, and a texting tool, stitched together',
    eyebrow: 'ICS vs. a DIY software stack',
    headline: 'The tools are cheap. The system is the work.',
    intro:
      'Every piece of what ICS installs can be bought as a subscription: a CRM, an AI receptionist, a booking page, a review tool, a texting platform. Many owners buy three of them, connect two, and use one. The difference between a stack and a system is the configuration, the rules, and the person accountable for the number. Here is the honest comparison.',
    whatItIs:
      'A set of software subscriptions chosen and configured by the owner or a staff member: typically a CRM with automation, a booking tool, a review request tool, a call-tracking number, and an AI chat or voice product. Each is capable. Making them work as one, with your pricing and rules, is a project.',
    theirCost: '$300 to $1,500 a month in subscriptions, plus 40 to 120 hours of setup, plus the ongoing hours to keep it working.',
    icsSystem: 'Lead Engine',
    icsCost: '$12,000 to $18,000 plus $1,500 to $2,500 a month, software included',
    rows: [
      ['Who configures it', 'You, evenings and weekends, from help articles', 'Built, tested, and documented for you'],
      ['Time to working', 'Two to six months, if it gets finished', 'Four to six weeks, guaranteed'],
      ['Integration', 'Zapier glue that breaks quietly', 'One tested pipeline with monitoring'],
      ['Intake quality', 'Generic prompts', 'Your trade\'s questions, your pricing rules, your service area'],
      ['Accountability', 'Yours', 'A written 60-second and 90-day guarantee'],
      ['Reporting', 'Five dashboards that disagree', 'One monthly report tied to revenue'],
      ['When something breaks', 'You notice when leads stop', 'We notice first'],
      ['Best use', 'Technically confident owners with time', 'Owners who want the result, not the hobby'],
    ],
    chooseThem: [
      'You or someone on staff genuinely enjoys this work and has ten hours a week for it.',
      'Your volume is under ten inquiries a month and a simple booking link plus a reminder covers it.',
      'You are pre-revenue and the $12,000 install is not yet justified.',
    ],
    chooseIcs: [
      'You bought the tools last year and they are not connected.',
      'You want someone accountable for response time and booked rate in writing.',
      'The time you would spend configuring software is worth more on a job site.',
    ],
    hiddenCosts: [
      'The owner\'s hours, which are the most expensive hours in the business.',
      'Half-finished setups that answer some channels and miss others.',
      'Nobody watching when an integration silently stops.',
      'Subscription creep: tools bought for one feature and never cancelled.',
    ],
    questions: [
      'How many hours did we spend on this last month, and what did those hours cost?',
      'Which channels are answered in under a minute today, and which are not?',
      'When the integration broke in March, how long before anyone noticed?',
      'Who is accountable for the booked rate?',
    ],
    faqs: [
      { q: 'Do you use the same software I could buy?', a: 'Some of it, yes, plus custom pieces where the off-the-shelf tools fall short, such as QuoteBrain and the industry intake logic. The value is not the licenses; it is the configuration, the rules, the testing, the monitoring, and the written guarantee behind the result. The software is included in the monthly fee.' },
      { q: 'Can I keep my CRM?', a: 'Usually. We build around the system you already use if it is sound, and tell you plainly if it is the bottleneck. Clients keep their data and accounts either way; ownership is written into every engagement.' },
      { q: 'What if I already built most of it?', a: 'Then the Operator Session is the right first step: a paid half-day where we audit what you built, measure the response times, and hand you a written plan. Sometimes the plan is "finish these three things yourself." The fee credits toward any system if you go further.' },
    ],
    tool: { href: '/ai-readiness/', label: 'Find out which channels are leaking: the two-minute AI Readiness score' },
    example: {
      setup: 'An auto repair shop in Rockland with a CRM, a booking app, and a review tool, paying $640 a month and using one of them.',
      them: 'Calls still go to the service writer. Texts arrive in the CRM nobody opens. The review tool sends requests to a list last updated in the spring. The owner spent an estimated 90 hours on setup.',
      ics: 'Lead Engine at $14,000 installed and $1,700 a month: calls, texts, and forms answered in one intake, photo estimates with one-tap approval, reviews tied to pickup, service reminders from the repair-order history.',
      verdict: 'The subscriptions were cheaper and produced nothing measurable. The shop\'s approval rate rose 18 points in the first quarter on the system, which paid the install by month four.',
    },
  },
  {
    slug: 'freelancer',
    name: 'A freelancer or a friend',
    aka: 'The web designer, the social media person, or your nephew',
    eyebrow: 'ICS vs. a freelancer',
    headline: 'A good freelancer builds the website. Nobody is on the hook for the phone.',
    intro:
      'Freelancers do real work at fair prices, and a good one is worth keeping. The gap is scope: a freelancer builds and leaves; a system answers and follows up for years. Here is the honest comparison, including the cases where the freelancer is exactly the right call.',
    whatItIs:
      'An independent designer, developer, or marketer hired per project or on a small retainer. They build a site, set up a profile, run some ads, or post on social media. The best ones are skilled and responsive. They are rarely responsible for what happens after a lead arrives.',
    theirCost: '$1,500 to $8,000 for a site; $300 to $1,500 a month for a retainer; variable availability.',
    icsSystem: 'JobSite',
    icsCost: '$6,500 to $9,500 plus $450 to $700 a month',
    rows: [
      ['Scope', 'The deliverable: a site, a profile, a campaign', 'The result: a site that books, a response in 60 seconds, measured monthly'],
      ['Launch timeline', 'When they get to it', '21 days, or $1,000 a week back'],
      ['After launch', 'Hourly changes, when available', 'Hosting, updates, monitoring, and the monthly report included'],
      ['Lead response and follow-up', 'Not their job', 'Built in'],
      ['Local SEO and AI visibility', 'Depends entirely on the person', 'Structured data, service-area pages, llms.txt, standard'],
      ['Ownership', 'Usually yours, sometimes on their hosting', 'Yours, in writing: code, accounts, data'],
      ['If they disappear', 'You start over', 'Documented system, transferable'],
      ['Best use', 'Design, brand, a specific build', 'The whole revenue path'],
    ],
    chooseThem: [
      'You need a beautiful brochure site and your business does not depend on inbound leads.',
      'You have a specific creative project: a logo, a brand refresh, a photo shoot.',
      'You have the systems and want a skilled pair of hands for content.',
    ],
    chooseIcs: [
      'You have had three websites in eight years and none of them booked work.',
      'You want someone accountable for what happens after the click.',
      'You want it live in three weeks, not when the freelancer\'s other client ships.',
    ],
    hiddenCosts: [
      'The site that launches late because the freelancer took a bigger job.',
      'A design-first site with no intake, no booking, and no follow-up.',
      'Hosting on the freelancer\'s account, which becomes a problem when they move on.',
      'No measurement, so nobody can say whether it worked.',
    ],
    questions: [
      'When will it launch, and what happens if that date slips?',
      'Who answers the leads the site produces, and how fast?',
      'Who owns the hosting, the domain, and the code if we stop working together?',
      'How will we measure, each month, what the site produced?',
    ],
    faqs: [
      { q: 'Can I keep my freelancer and add the system?', a: 'Yes, and it often works well: they do design and content, the system handles intake, follow-up, reviews, and reporting. We document the handoffs so both sides know who owns what. Good freelancers like it because it makes their work measurable.' },
      { q: 'Is JobSite just a website?', a: 'No. It is a site built to book: instant quote or booking on the first screen, structured data and service-area pages for local and AI search, speed that passes every Core Web Vital, and the 21-day launch guarantee. The website is the visible part; the intake and measurement are the point.' },
      { q: 'What if my current site is fine?', a: 'Then we say so after a two-minute readiness check and point you at Lead Engine instead, which runs behind any site. Nobody needs a new website because a vendor needs a project.' },
    ],
    tool: { href: '/ai-readiness/', label: 'Check whether the current site is the problem: two minutes, no email' },
    example: {
      setup: 'A landscaping company in Hanover with a $4,000 site from a freelancer, launched eleven weeks late, no booking, no quote tool.',
      them: 'The site looks good. Inquiries arrive by a contact form that emails the owner, who answers at night. Roughly a third never get a reply.',
      ics: 'JobSite at $8,000 and $550 a month: QuoteBrain for mulch, cleanups, and hardscape ranges, booking on the first screen, missed-call text-back, review ask on job completion, monthly report. Live in 19 days.',
      verdict: 'The freelancer built a brochure. The system built a front door. The landscaper kept the freelancer for seasonal photography.',
    },
  },
];

export const alternativeFor = (slug: string) => ALTERNATIVES.find((a) => a.slug === slug);
