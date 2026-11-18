/**
 * Industry playbooks: the operating detail behind each /industries/ page,
 * rendered at /industries/[slug]/playbook/. One entry per industry in
 * industries.ts, keyed by the same slug. Everything here is specific to
 * how that trade wins and loses work on the South Shore: the season, the
 * numbers worth tracking, the questions the intake asks, the scripts the
 * system sends, and the math behind the leak.
 */
export interface PlaybookKpi {
  name: string;
  baseline: string;
  target: string;
  why: string;
}
export interface PlaybookScript {
  name: string;
  when: string;
  text: string;
}
export interface PlaybookMath {
  /** Average job, ticket, case, or first-year patient value in dollars. */
  avgTicket: number;
  /** Inbound inquiries per month for a typical single-location operator. */
  leadsPerMonth: number;
  /** Share of inquiries that go unanswered or are answered too late today. */
  missedShare: number;
  /** Close rate on inquiries that are answered promptly. */
  closeRate: number;
  /** What the ticket number means, in the trade's own words. */
  ticketLabel: string;
}
export interface Playbook {
  slug: string;
  /** One line under the industry name on the playbook page. */
  promise: string;
  season: { month: string; note: string }[];
  kpis: PlaybookKpi[];
  intake: string[];
  scripts: PlaybookScript[];
  math: PlaybookMath;
  firstThirty: string[];
  mistakes: string[];
  faqs: { q: string; a: string }[];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const season = (notes: string[]) => notes.map((note, i) => ({ month: MONTHS[i], note }));

export const PLAYBOOKS: Playbook[] = [
  {
    slug: 'trades-home-services',
    promise: 'Answer first, quote same day, follow up until they decide.',
    season: season([
      'Planning season. Homeowners price spring projects; the contractor who quotes in January books March.',
      'Storm and ice-dam calls. Emergency work rewards whoever picks up.',
      'Spring rush starts. Paving, roofing, and landscaping inquiries triple by month end.',
      'Peak inquiry month for exterior trades. Response time decides the year.',
      'Backlog builds. Quote turnaround slips; the follow-up sequence does the chasing.',
      'HVAC changeover and first heat wave. Cooling calls spike in the second week.',
      'Deposits for fall work. Reviews from spring jobs should be landing now.',
      'Second paving wave; schools-out projects. Quiet week before Labor Day.',
      'Fall exterior season. Gutters, roofing, final paving before plants close.',
      'Heating season turnover. Furnace and boiler calls stack by the third week.',
      'Winterization and last exterior work. Book January planning calls now.',
      'Slow month for exteriors, busy for plumbing and heating. Review the year.',
    ]),
    kpis: [
      { name: 'Speed to lead', baseline: '2 to 6 hours (voicemail)', target: 'Under 60 seconds, 24/7', why: 'The homeowner calls three companies; the first to answer gets the visit.' },
      { name: 'Quote turnaround', baseline: '3 to 7 days', target: 'Same day for standard jobs', why: 'Quotes older than 48 hours close at half the rate.' },
      { name: 'Quote-to-close rate', baseline: '20 to 30%', target: '40%+ with follow-up', why: 'Most lost quotes were never followed up, not lost on price.' },
      { name: 'Reviews per month', baseline: '0 to 2', target: '8 to 15', why: 'Review count is the tiebreaker when two quotes are close.' },
      { name: 'Booked work (weeks ahead)', baseline: 'Unknown', target: 'Visible every Monday', why: 'A backlog you can see is one you can price for.' },
    ],
    intake: [
      'What kind of work is it, and is it a repair or a full replacement?',
      'Where is the property? (Town and street, so the right crew is routed.)',
      'Is this urgent today, this week, or are you planning ahead?',
      'Roughly how big is it? (Square feet, linear feet, or number of units.)',
      'Have you had a quote from anyone else yet?',
      'Best number to text photos to, and when can someone look at it?',
    ],
    scripts: [
      { name: 'Missed-call text-back', when: 'Within 30 seconds of a missed call', text: 'Hi, this is [Company]. Sorry we missed you, we are on a job. What can we help with? Text a photo and a town and we will get you a time today.' },
      { name: 'Quote follow-up, day two', when: '48 hours after a quote with no reply', text: 'Hi [Name], [Owner] here. Checking in on the [driveway] quote. Any questions I can answer? If timing is the issue, we can hold your spot for the [May] schedule with no deposit until the week before.' },
      { name: 'Review ask', when: 'Two hours after the job is marked complete', text: 'Thanks for having us out today, [Name]. If the crew did right by you, a quick Google review helps the next homeowner find us: [link]. Takes 60 seconds.' },
    ],
    math: { avgTicket: 6800, leadsPerMonth: 45, missedShare: 0.35, closeRate: 0.35, ticketLabel: 'average job' },
    firstThirty: [
      'Call tracking on every number you advertise, so the baseline is real.',
      'Missed-call text-back live on day one; it pays for the month by itself.',
      'QuoteBrain calculator for your two most common jobs, with photos required.',
      'Review ask automated from job completion; first ten reviews in three weeks.',
      'Monday morning booked-work number texted to the owner.',
    ],
    mistakes: [
      'Letting the office line go to a personal cell that is on a roof.',
      'Quoting by email with no follow-up sequence behind it.',
      'Asking for reviews in person and never sending the link.',
      'Running ads to a homepage with no way to price the job.',
    ],
    faqs: [
      { q: 'Will the AI quote my jobs without me seeing them?', a: 'No. QuoteBrain gives a range from your own pricing rules and photos, then books the site visit. You confirm the final number. The point is that the homeowner gets a credible range in 60 seconds instead of waiting three days for a callback.' },
      { q: 'We are slammed in May. Why would we want more leads?', a: 'May is when the system should be filling September. Fast responses in peak season turn overflow into deposits for later months instead of referrals to a competitor, and the follow-up sequence keeps those quotes warm until you have a slot.' },
      { q: 'How many reviews should a South Shore contractor have?', a: 'Enough to be the obvious choice in your town: in most trades that is 100 or more with recent ones every week. The number matters less than the velocity; a shop adding ten a month overtakes a shop sitting on 150 old ones within a year.' },
    ],
  },
  {
    slug: 'restaurants-food',
    promise: 'Be the answer to "dinner near me," and catch the catering money the dinner rush drops.',
    season: season([
      'Slowest dining month. Restaurant Week style promotions and gift-card redemptions carry it.',
      'Valentine weekend is the biggest reservation night of the winter. Book it in January.',
      'St. Patrick weekend; spring catering RFPs for graduations start arriving.',
      'Patio prep. Easter brunch sells out a week ahead with the right reminder.',
      'Mother\'s Day is the year\'s top brunch. Graduation parties book catering now.',
      'Patio season opens; Father\'s Day and wedding-season catering peaks.',
      'Peak tourist traffic on the coast. Hours and menu accuracy matter most this month.',
      'Still peak. Staff shortages make missed catering calls most expensive here.',
      'Back to school drops weekday covers; holiday party inquiries begin after Labor Day.',
      'Corporate holiday parties book in October. The caterer who answers first wins December.',
      'Thanksgiving pies and takeout orders; private-room holiday bookings fill.',
      'Holiday parties and gift cards. The best month to ask for reviews from happy tables.',
    ]),
    kpis: [
      { name: 'Google Business Profile views', baseline: 'Not tracked', target: 'Up 30% in 90 days', why: 'Most diners decide inside Google Maps, never reaching your website.' },
      { name: 'Review velocity', baseline: '3 to 5 per month', target: '25+ per month', why: 'AI assistants and Maps rank restaurants by recent, consistent reviews.' },
      { name: 'Catering response time', baseline: 'Next business day', target: 'Under 5 minutes', why: 'Catering is the highest-margin inquiry and the one most often lost to voicemail.' },
      { name: 'Direct order share', baseline: 'Mostly third-party apps', target: '50% direct', why: 'Every direct order saves 15 to 30% in platform commission.' },
      { name: 'Menu accuracy', baseline: 'PDF from last year', target: 'Live, structured, updated weekly', why: 'An outdated menu is the top reason a diner picks somewhere else.' },
    ],
    intake: [
      'Is this a reservation, a catering or private-event inquiry, or a question about tonight?',
      'For events: what date, how many guests, and is it drop-off, buffet, or full service?',
      'Any dietary needs we should plan for?',
      'What is your budget per person, roughly?',
      'Where is the event? (We route by delivery radius.)',
      'Best contact to send the proposal to, and when do you need it by?',
    ],
    scripts: [
      { name: 'Catering missed call', when: 'Within 30 seconds, during service', text: 'Thanks for calling [Restaurant]. We are mid-service but we want your event. Reply with the date, headcount, and town and you will have a proposal within the hour.' },
      { name: 'Reservation reminder', when: 'The morning of a reservation', text: 'See you tonight at 7:00, party of 4. Running late or need to change? Reply here. Street parking is free after 6.' },
      { name: 'Review ask', when: 'Ninety minutes after the check closes (opt-in guests)', text: 'Thank you for dining with us tonight. If the kitchen earned it, a Google review helps a small restaurant more than you would think: [link].' },
    ],
    math: { avgTicket: 1850, leadsPerMonth: 22, missedShare: 0.5, closeRate: 0.45, ticketLabel: 'average catering order' },
    firstThirty: [
      'Google Business Profile rebuilt: categories, attributes, 40 fresh photos, structured menu.',
      'Catering inquiry line split from the main line, with instant text-back.',
      'Review ask tied to the POS or reservation system for opted-in guests.',
      'Live menu on the site, with the same items and prices as the profile.',
      'Event proposal template that the system fills and sends in minutes.',
    ],
    mistakes: [
      'Treating the Google profile as something you set once in 2019.',
      'Letting catering inquiries land in the same inbox as reservation spam.',
      'Buying followers instead of reviews.',
      'Paying platform commission on regulars who would order direct if asked.',
    ],
    faqs: [
      { q: 'Can the AI take reservations?', a: 'It answers the phone, handles the common questions, and books into whatever reservation system you already use, or a simple one we install. It also recognizes a catering inquiry and treats it as the priority it is, because that call is worth fifty covers.' },
      { q: 'Our regulars find us fine. Who is this for?', a: 'The 60% of diners who search instead of remember, plus everyone visiting the coast in July. Regulars keep the lights on; searchers and catering fill the gaps and the shoulder seasons.' },
      { q: 'Do reviews really move the needle for a restaurant?', a: 'More than for any other industry. Maps ranks on recency and volume, AI assistants cite the same signals, and diners read the newest three. A restaurant adding 25 reviews a month changes its ranking in its town within a quarter.' },
    ],
  },
  {
    slug: 'medical-dental',
    promise: 'Never put a new patient on hold. Then keep them with recall that runs itself.',
    season: season([
      'New-year insurance resets. "Dentist near me accepting new patients" peaks in the first two weeks.',
      'Benefits-driven elective procedures. Whitening and aligner inquiries climb.',
      'Spring sports physicals and allergy visits. Pediatric volume rises.',
      'Slower month; the right time to run recall on overdue hygiene patients.',
      'Graduation and wedding season drives cosmetic consults.',
      'Summer camp and school forms. Front desk is busiest with paperwork, not patients.',
      'Staff vacations. After-hours and lunchtime calls go unanswered most this month.',
      'Back-to-school physicals and cleanings. The second-biggest new-patient month.',
      'Fall schedules settle. Good month for a reactivation campaign.',
      'Flu season visits; insurance "use it or lose it" messaging begins.',
      'Year-end benefits rush. Crowns, implants, and PT plans of care book now.',
      'Peak use-it-or-lose-it demand with a short calendar. Every open slot should be filled.',
    ]),
    kpis: [
      { name: 'New-patient calls answered', baseline: '60 to 70% live', target: '100% answered, 95% within 60 seconds', why: 'An unanswered new-patient call becomes someone else\'s patient by morning.' },
      { name: 'Online booking share', baseline: 'Under 10%', target: '35% of new appointments', why: 'Patients book at 9pm; a form that says "we will call you" loses them.' },
      { name: 'Show rate', baseline: '80 to 85%', target: '93%+', why: 'Reminders by text at 48 and 2 hours cut no-shows in half.' },
      { name: 'Recall compliance', baseline: 'Unknown', target: '70% of due patients booked within 30 days', why: 'Recall is the cheapest production in the practice.' },
      { name: 'Reviews per month', baseline: '2 to 4', target: '15 to 25', why: 'Patients choose between two practices by the newest reviews, not the count.' },
    ],
    intake: [
      'Are you a new or existing patient?',
      'What do you need: a cleaning and exam, a specific concern, or an emergency today?',
      'Which insurance do you have? (We confirm in-network status before booking.)',
      'Preferred days and times, mornings or afternoons?',
      'Any pain right now, on a scale of 1 to 10? (Emergencies are routed to the on-call line.)',
      'Best mobile number for forms and reminders?',
    ],
    scripts: [
      { name: 'After-hours new patient', when: 'Any call outside office hours', text: 'Thanks for calling [Practice]. We are closed but we are accepting new patients. Reply with your insurance and preferred days and we will hold a time for you first thing. Dental emergency? Reply URGENT.' },
      { name: 'Appointment reminder', when: '48 hours before, then 2 hours before', text: 'Reminder: [Name], you are booked [Thursday] at [10:30] with [Dr. Lee]. Reply C to confirm or R to reschedule. Forms: [link].' },
      { name: 'Recall', when: 'Thirty days before the hygiene due date', text: 'Hi [Name], you are due for a cleaning in [March]. Tap to pick a time: [link]. Most insurance covers two per year; yours resets in [January].' },
    ],
    math: { avgTicket: 1400, leadsPerMonth: 70, missedShare: 0.3, closeRate: 0.55, ticketLabel: 'first-year patient value' },
    firstThirty: [
      'Call answering and intake live for new-patient lines, with insurance pre-check.',
      'Online booking that writes to the practice management system or a synced calendar.',
      'Two-touch reminders by text with confirm and reschedule replies.',
      'Review ask after checkout for opted-in patients, HIPAA-conscious wording.',
      'Recall list cleaned and the first campaign sent to patients 60+ days overdue.',
    ],
    mistakes: [
      'A phone tree that asks a new patient to press 4.',
      'A "request appointment" form that nobody checks until Tuesday.',
      'Reminder calls from a blocked number at 9am.',
      'Letting a bad review sit without the calm, compliant reply it deserves.',
    ],
    faqs: [
      { q: 'Is this HIPAA compliant?', a: 'The systems are built to handle scheduling and reminders without collecting clinical detail by text, with consent captured and a business associate agreement where the vendor touches protected information. Your compliance officer or counsel reviews the setup before launch; we document it in writing.' },
      { q: 'Our front desk is good. What changes?', a: 'Nothing about how they treat patients. What changes is that the phone never rings unanswered at lunch, after 5pm, or when two people are checking in at once. The desk handles the people in front of them; the system handles the ones on the line.' },
      { q: 'How fast do recall campaigns pay back?', a: 'Usually within the first send. A practice with 400 overdue hygiene patients that books 15% of them has 60 appointments of pure production from a list it already owned. That is why recall is in the first thirty days of every medical install.' },
    ],
  },
  {
    slug: 'salons-wellness',
    promise: 'Keep the book full with rebooking and reminders, and let your reviews do the advertising.',
    season: season([
      'Resolution month. "Near me" searches for spas, facials, and new stylists peak.',
      'Valentine gift cards and couples bookings; promote by the first week.',
      'Spring color and brow services climb; prom consultations begin.',
      'Prom, communion, and wedding-trial season for salons in every South Shore town.',
      'Mother\'s Day is the top gift-card week of the year. Sell online, not just at the desk.',
      'Wedding season peak. Bridal parties book Saturdays months ahead.',
      'Summer slows weekday chairs; beach-season waxing and brows are steady.',
      'Back-to-school cuts. The busiest two weeks for family salons.',
      'Fall color change. Rebooking campaigns pay best here.',
      'Holiday party bookings begin; gift-card page should be live by month end.',
      'Thanksgiving week is heavy; Black Friday gift-card promotions.',
      'Peak gift cards and holiday styling. Ask every happy chair for a review.',
    ]),
    kpis: [
      { name: 'Rebooking rate at checkout', baseline: '40 to 50%', target: '75%+', why: 'A client who leaves without a next appointment is a client you are re-marketing to.' },
      { name: 'No-show rate', baseline: '10 to 15%', target: 'Under 4%', why: 'Each no-show is an empty chair you already paid a stylist for.' },
      { name: 'Online booking share', baseline: '20 to 30%', target: '60%+', why: 'Clients book between 8pm and midnight, when the desk is closed.' },
      { name: 'Reviews per month', baseline: '2 to 5', target: '20+', why: 'New clients pick a stylist by photos and recent reviews, in that order.' },
      { name: 'Gift-card revenue (Nov to Dec)', baseline: 'In-person only', target: 'Up 40% with online sales', why: 'Online gift cards sell at midnight on December 23.' },
    ],
    intake: [
      'Which service are you looking for, and do you have a stylist or provider in mind?',
      'New to us? (We book a little extra time for a consultation.)',
      'Preferred days and times?',
      'For color or extensions: do you have a photo of what you want?',
      'Any allergies or sensitivities we should know about?',
      'Best mobile number for your confirmation and reminder?',
    ],
    scripts: [
      { name: 'Missed call', when: 'Within 30 seconds while the desk is busy', text: 'Hi, it is [Salon]. We are with a client but we can book you right here. What service, and when works? Or tap to book: [link].' },
      { name: 'Rebook nudge', when: 'Five weeks after a cut or color with no appointment on the books', text: 'Hi [Name], it has been about six weeks. [Stylist] has openings [Tuesday] and [Thursday] next week. Want one? Reply with the day or tap: [link].' },
      { name: 'Review ask', when: 'Two hours after checkout', text: 'Thanks for coming in today, [Name]. If you love it, a quick Google review with a photo helps [Stylist] more than any ad: [link].' },
    ],
    math: { avgTicket: 95, leadsPerMonth: 120, missedShare: 0.3, closeRate: 0.6, ticketLabel: 'average visit (first of many)' },
    firstThirty: [
      'Online booking live with provider-level availability and deposits for long services.',
      'Reminders at 48 and 2 hours, with cancellation policy stated plainly.',
      'Missed-call text-back during peak desk hours.',
      'Review ask after checkout, with photo prompt.',
      'Rebooking nudge sequence for clients off the books at five weeks.',
    ],
    mistakes: [
      'Booking only through Instagram DMs.',
      'No deposit on two-hour color appointments.',
      'Letting a stylist\'s followers be the only marketing.',
      'A website with no prices and no way to book.',
    ],
    faqs: [
      { q: 'Will clients mind texts from the salon?', a: 'They prefer them. Confirmation and reminder texts are expected now, and opt-in is captured at booking. The rebooking nudge is one message, five weeks out, and clients tell us it feels like good service, not marketing.' },
      { q: 'We use a booking app already. Does this replace it?', a: 'Usually not. Lead Engine wraps around the booking tool you have: it answers the phone, captures the client, and books into that system. If the tool is the problem, we say so and recommend a switch.' },
      { q: 'How do I compete with a shop that has 900 reviews?', a: 'Recency. A shop with 900 reviews and three this month loses to a shop with 150 and twenty this month in the eyes of Maps and most clients. Velocity is something you control; a total count is something you inherit.' },
    ],
  },
  {
    slug: 'professional-services',
    promise: 'Make intake instant and consultation booking effortless, with every lead qualified before it reaches you.',
    season: season([
      'Tax season starts; "accountant near me" peaks. Estate planning resolutions.',
      'Tax season peak for CPAs; insurance renewals for January-start policies.',
      'Last push before the April deadline; real estate attorneys see spring closings begin.',
      'Post-deadline slump for CPAs, the best month for advisory marketing.',
      'Spring real estate closings peak; family-law inquiries rise after school year ends.',
      'Mid-year planning. Business formation inquiries climb with new ventures.',
      'Quietest month for most firms. Build the content and reviews now.',
      'Back-to-school; estate planning for parents of new college students.',
      'Q4 planning and extension deadlines (September 15 and October 15).',
      'Open enrollment for insurance; year-end tax planning calls begin.',
      'Year-end business decisions; entity changes effective January 1.',
      'Short, busy month. Every inquiry is someone who waited too long.',
    ]),
    kpis: [
      { name: 'Intake response time', baseline: 'Same day, business hours', target: 'Under 60 seconds, 24/7', why: 'A person looking for a lawyer at 9pm calls until someone answers.' },
      { name: 'Consultation booking rate', baseline: '30 to 40% of inquiries', target: '60%+', why: 'Qualified callers who can book immediately rarely shop further.' },
      { name: 'Consultation show rate', baseline: '70%', target: '90%+', why: 'Reminders and a pre-consult form turn a maybe into a client.' },
      { name: 'Qualified-lead share', baseline: 'Unknown', target: '70% of booked consults in your practice areas', why: 'Intake questions filter out the matters you do not take.' },
      { name: 'Reviews per month', baseline: '0 to 2', target: '6 to 10', why: 'Professional buyers read reviews for tone, not stars; a steady stream signals a living firm.' },
    ],
    intake: [
      'What kind of matter is this? (Practice areas listed, with a route for "other".)',
      'Is there a deadline, court date, or filing date we should know about?',
      'Where are you located, and where is the matter? (Jurisdiction matters.)',
      'Have you worked with another firm on this?',
      'What outcome are you hoping for?',
      'Best time for a 20-minute consultation, and by phone or video?',
    ],
    scripts: [
      { name: 'After-hours inquiry', when: 'Any inquiry outside office hours', text: 'Thanks for contacting [Firm]. To get you to the right attorney, reply with a sentence about your matter and the town. We will confirm a consultation time by 9am. Nothing you send here is legal advice or creates representation yet.' },
      { name: 'Consultation reminder', when: '24 hours before, with the intake form', text: 'Reminder: your consultation with [Attorney] is [Wednesday] at [2:00] by [video]. The short form here saves ten minutes of your call: [link].' },
      { name: 'Review ask', when: 'At matter close, after the final invoice is paid', text: 'Thank you for trusting us with this, [Name]. If we served you well, a brief Google review helps the next person in your position find us: [link]. No case details needed.' },
    ],
    math: { avgTicket: 4200, leadsPerMonth: 35, missedShare: 0.3, closeRate: 0.4, ticketLabel: 'average matter or engagement' },
    firstThirty: [
      'Intake line answered around the clock with practice-area routing and conflict-check fields.',
      'Consultation scheduling with pre-consult form and reminders.',
      'Practice-area pages that answer the first ten questions a prospect asks.',
      'Review ask at matter close, worded for professional-conduct rules.',
      'Monday pipeline report: inquiries, consults booked, consults held, matters opened.',
    ],
    mistakes: [
      'Intake handled by whoever is near the phone.',
      'A contact form that promises a reply "within two business days."',
      'Treating reviews as beneath the firm while prospects read them anyway.',
      'No pipeline numbers; the firm cannot say how many inquiries it lost last month.',
    ],
    faqs: [
      { q: 'Can an AI answer legal or financial questions?', a: 'It does not. It gathers the facts needed to route and schedule, states clearly that it is not giving advice, and gets the person to the professional. Where your rules require it, the disclaimer language is yours and we build to it.' },
      { q: 'What about conflict checks?', a: 'Intake captures the names needed for a conflict check before a consultation is confirmed, and holds the booking as tentative until your process clears it. Nothing substantive is discussed before that point.' },
      { q: 'We get referrals. Why would we need this?', a: 'Because referred clients still search you, read reviews, and call. If the call goes to voicemail, a share of referrals leaks to the firm with the better front door. The system protects the referrals you already earn.' },
    ],
  },
  {
    slug: 'auto-services',
    promise: 'Win the "shop near me" search, quote faster than the chain, and keep every car coming back.',
    season: season([
      'Dead batteries and no-starts. Cold-weather emergencies reward live answering.',
      'Pothole season begins; alignment and suspension work climbs.',
      'Spring inspections and tire changeovers; the busiest month for tire shops.',
      'Detailing and body work after winter salt. Repair backlog peaks.',
      'AC repairs start with the first warm week. Road-trip inspections.',
      'Summer travel prep; brakes and tires before vacation.',
      'AC and overheating peak. Shops are short-staffed and phones ring unanswered.',
      'Back-to-school car prep for students; used-car inspections.',
      'Fall maintenance; winter tire inquiries begin in the last week.',
      'Winter tire changeover is the second busiest window. Book by text.',
      'Batteries, wipers, and heater cores. Pre-holiday travel inspections.',
      'Holiday travel checks and slower bays mid-month: run reactivation.',
    ]),
    kpis: [
      { name: 'Calls answered live', baseline: '50 to 70%', target: '100% answered, 95% in 60 seconds', why: 'The chain shop has a call center. You now have better.' },
      { name: 'Estimate turnaround', baseline: 'Hours to next day', target: 'Under 2 hours for common jobs', why: 'A customer waiting on an estimate is calling the next shop.' },
      { name: 'Approval rate on recommended work', baseline: '40 to 50%', target: '65%+ with photo estimates', why: 'Customers approve what they can see.' },
      { name: 'Return visit within 12 months', baseline: 'Unknown', target: '70%', why: 'Service reminders turn a one-time repair into a customer for the life of the car.' },
      { name: 'Reviews per month', baseline: '2 to 5', target: '20+', why: 'Trust is the whole sale in auto repair; reviews are how strangers measure it.' },
    ],
    intake: [
      'What is the vehicle: year, make, model?',
      'What is it doing, or what service do you need?',
      'Is it drivable, or do you need a tow?',
      'When do you need it back by?',
      'Do you want a loaner, a shuttle, or to wait?',
      'Best mobile number for photo estimates and approvals?',
    ],
    scripts: [
      { name: 'Missed call', when: 'Within 30 seconds', text: 'Hi, this is [Shop]. We are under a car but we can help by text. What is the vehicle and what is it doing? If it is not drivable, reply TOW.' },
      { name: 'Photo estimate', when: 'When the technician finishes inspection', text: 'Hi [Name], here is what we found on the [Civic]: [link with photos]. Recommended today: [brakes, $489]. Can wait: [cabin filter]. Reply YES to approve the recommended items.' },
      { name: 'Service reminder', when: 'Five months after the last oil service', text: 'Hi [Name], the [Civic] is about due for service. Tap to pick a time this week: [link]. We will check the brakes and tires while it is in.' },
    ],
    math: { avgTicket: 480, leadsPerMonth: 160, missedShare: 0.35, closeRate: 0.55, ticketLabel: 'average repair order' },
    firstThirty: [
      'Phones answered live with vehicle intake and tow routing.',
      'Photo-based digital estimates with one-tap approval.',
      'Online scheduling for the ten most common services.',
      'Review ask at vehicle pickup.',
      'Service reminder sequence built from your last 18 months of repair orders.',
    ],
    mistakes: [
      'The service writer answers the phone, writes tickets, and sells work, all at once.',
      'Estimates by voicemail.',
      'No reminders, so the next oil change goes to the quick lube next to the grocery store.',
      'Fighting a bad review in public instead of replying like a professional.',
    ],
    faqs: [
      { q: 'Does this integrate with my shop management system?', a: 'With most of the common ones, yes, for scheduling and customer records; where there is no integration we run a synced calendar and a nightly export. We check your system before quoting the install so there are no surprises.' },
      { q: 'Why do approval rates jump with photos?', a: 'Because the customer stops guessing whether you are honest. A photo of a worn pad next to a new one, with a price, approves itself. Shops that move to photo estimates typically see approval rates rise fifteen to twenty points.' },
      { q: 'Can a one-location shop outrank a national chain in Rockland or Weymouth?', a: 'Yes, in its own town, routinely. Maps ranks on proximity, relevance, and reviews; the chain cannot out-local you, and most of them have mediocre reviews. Velocity on reviews plus a fast answer is how the independent wins.' },
    ],
  },
  {
    slug: 'solar-energy',
    promise: 'Qualify fast, quote in a day, and close before the homeowner\'s fourth proposal arrives.',
    season: season([
      'Tax-credit planning. Homeowners who installed last year file; new ones research.',
      'Heat-pump and insulation inquiries peak with the heating bill.',
      'Spring solar inquiry season begins; roof condition questions dominate intake.',
      'Peak proposal month. Quote speed decides who gets the site visit.',
      'Install backlog builds; interconnection timelines stretch.',
      'Second inquiry wave with the first electric bill of AC season.',
      'Highest bills, highest urgency. Battery and AC-related inquiries rise.',
      'Install season peak; crews booked out. Keep quoting for fall.',
      'Incentive-deadline messaging drives a third wave.',
      'Heat-pump season; weatherization and energy audit requests climb.',
      'Year-end incentive push; installs before December 31 for tax purposes.',
      'Quiet on solar, busy on heating. Plan Q1 pipeline.',
    ]),
    kpis: [
      { name: 'Speed to lead', baseline: '1 to 24 hours', target: 'Under 5 minutes', why: 'Solar leads are shopped to four or five installers; first contact sets the frame.' },
      { name: 'Quote-to-close time', baseline: '11 days', target: '4 days', why: 'The solar case study cut it from 11 to 4; close rate followed.' },
      { name: 'Qualified-lead share', baseline: '40%', target: '70%', why: 'Shade, roof age, ownership, and credit filter out half of raw inquiries early.' },
      { name: 'Site-visit show rate', baseline: '65%', target: '85%+', why: 'A confirmed, reminded visit is a half-closed deal.' },
      { name: 'Referral rate', baseline: '5%', target: '20% of installs', why: 'Neighbors watch the install. Ask while the array is new.' },
    ],
    intake: [
      'Do you own the home, and roughly how old is the roof?',
      'What is your average monthly electric bill?',
      'Is the roof mostly sunny, or are there large trees nearby?',
      'Are you interested in solar, a battery, a heat pump, or a combination?',
      'Have you received other proposals? (We will benchmark against them honestly.)',
      'Best time for a 15-minute call and a remote roof review?',
    ],
    scripts: [
      { name: 'Instant response', when: 'Within 60 seconds of any inquiry', text: 'Hi [Name], thanks for asking about solar for [Street]. We just pulled your roof on satellite. Reply with your average electric bill and we will send a real estimate, not a teaser, within the hour.' },
      { name: 'Proposal follow-up', when: 'Day 2, 5, and 9 after the proposal', text: 'Hi [Name], [Owner] here. Your proposal shows a [$142] monthly saving in year one with the [30%] credit. The two questions most people ask at this point are about the roof and the warranty; happy to answer either on a quick call.' },
      { name: 'Referral ask', when: 'The week after inspection passes', text: 'Your system is live, [Name]. If a neighbor asks, we pay [$500] for any referral that installs, and they get the same pricing you did. Here is a link you can text them: [link].' },
    ],
    math: { avgTicket: 24000, leadsPerMonth: 30, missedShare: 0.25, closeRate: 0.22, ticketLabel: 'average residential install' },
    firstThirty: [
      'Instant response and remote roof review on every inquiry.',
      'Intake that qualifies on ownership, bill, roof, and shade before a human calls.',
      'Proposal follow-up sequence with the two most-asked questions answered.',
      'Site-visit confirmation and reminder flow.',
      'Referral program live for every completed install.',
    ],
    mistakes: [
      'Buying shared leads and responding tomorrow.',
      'Sending a proposal and waiting.',
      'Promising a savings number before seeing a bill.',
      'Leaving the referral ask to the installers.',
    ],
    faqs: [
      { q: 'Will the AI promise savings it cannot deliver?', a: 'No. It collects the bill and the roof facts and the estimate comes from your own pricing and production model, with the assumptions stated. Over-promising is the fastest way to a bad review in this industry, so the system is built to under-claim.' },
      { q: 'Incentives change constantly. How does the content keep up?', a: 'Incentive language lives in one place and is reviewed monthly, with dates on everything. Nothing on your site states a credit percentage without the "as of" date next to it.' },
      { q: 'We do heat pumps as well as solar. One system or two?', a: 'One, with two intake paths. The heating customer and the solar customer ask different questions and buy on different timelines, so the intake and follow-up are separate, but they share the phone line, the reviews, and the referral program.' },
    ],
  },
  {
    slug: 'fitness-studios',
    promise: 'Convert the January wave, stop the March churn, and keep every trial from going cold.',
    season: season([
      'The wave. New-member inquiries triple; response time in the first week of January sets the year.',
      'Retention month. January joiners who have not visited in 10 days are already leaving.',
      'The churn cliff. Cancellations peak; the win-back sequence earns its keep.',
      'Spring challenge season. Small-group and 6-week programs sell.',
      'Summer-body push; outdoor classes begin on the coast.',
      'Summer slowdown starts; freeze requests spike. Offer the freeze before they cancel.',
      'Lowest attendance month. Run referral and bring-a-friend.',
      'Back-to-school routine reset. Second-best inquiry month.',
      'Fall programming launch; corporate wellness inquiries.',
      'Steady. Holiday-proof challenge sign-ups begin.',
      'Thanksgiving week dips; Black Friday membership offers.',
      'Pre-sell January. Founding-rate offers for new programs.',
    ]),
    kpis: [
      { name: 'Trial-to-member conversion', baseline: '30 to 40%', target: '60%+', why: 'Trials that get a text within an hour and a coach follow-up convert double.' },
      { name: 'Lead response time', baseline: 'Hours (front desk)', target: 'Under 60 seconds', why: 'A fitness inquiry is an impulse; the studio that answers first books the trial.' },
      { name: 'First-30-day visit count', baseline: 'Unknown', target: '8+ visits', why: 'Members who hit eight visits in the first month stay past a year.' },
      { name: 'Monthly churn', baseline: '5 to 8%', target: 'Under 3%', why: 'Every point of churn is a month of new sales just to stand still.' },
      { name: 'Reviews per month', baseline: '2 to 6', target: '20+', why: 'Studios are chosen on vibe; reviews and photos are the vibe, online.' },
    ],
    intake: [
      'What are you training for, or what would you like to change?',
      'Have you done [classes, strength training, martial arts] before?',
      'Which days and times could you realistically come?',
      'Any injuries or conditions a coach should know about?',
      'Would you like a free trial class or an intro session with a coach?',
      'Best mobile number to confirm your trial and send the waiver?',
    ],
    scripts: [
      { name: 'Trial booking', when: 'Within 60 seconds of an inquiry', text: 'Hi [Name], it is [Studio]. First class is on us. Tuesday 6am or Wednesday 5:30pm? Reply with one and the waiver link follows. Wear sneakers, we handle the rest.' },
      { name: 'Post-trial follow-up', when: 'Two hours after the trial class', text: 'Great work today, [Name]. Coach [Dana] said you picked up the rows fast. Founding rate holds until [Friday]: [link]. Questions? Reply here, a human answers.' },
      { name: 'At-risk member', when: 'Ten days without a check-in', text: 'Hey [Name], we have not seen you in a bit. Life happens. The [Thursday 6pm] class has a spot with your name on it. Want it?' },
    ],
    math: { avgTicket: 1560, leadsPerMonth: 60, missedShare: 0.3, closeRate: 0.45, ticketLabel: 'first-year membership value' },
    firstThirty: [
      'Trial booking by text with waiver and reminders.',
      'Post-trial follow-up sequence over seven days.',
      'At-risk member detection from check-in data, with a coach-voiced nudge.',
      'Review ask after a member\'s fourth visit.',
      'Freeze-instead-of-cancel flow, offered before the cancellation form.',
    ],
    mistakes: [
      'Letting trials book through a DM with no reminder.',
      'Selling the membership before the trial, not after.',
      'Noticing churn when the payment fails.',
      'A website that shows the schedule as a screenshot.',
    ],
    faqs: [
      { q: 'We run on a gym management platform. Does this plug in?', a: 'Most of the common ones expose check-ins and memberships, which is all the at-risk and trial flows need. Where a platform is closed, we read a nightly export. We confirm before quoting.' },
      { q: 'Isn\'t texting members pushy?', a: 'Not when it sounds like a coach who noticed. The messages are short, in your voice, and consented at sign-up. Members tell owners the ten-day check-in is the reason they came back.' },
      { q: 'How many trials should a studio book from January inquiries?', a: 'With a 60-second response and a two-option booking text, 70% or more of January inquiries should book a trial, and 60% of those should join. A studio with 150 January inquiries should sign about 60 members from that month alone.' },
    ],
  },
  {
    slug: 'veterinary-pet-services',
    promise: 'Answer every worried owner in under a minute and keep the recall calendar full without the front desk doing it.',
    season: season([
      'Post-holiday illness visits; "emergency vet near me" peaks after New Year.',
      'Dental health month for clinics; grooming slows.',
      'Spring puppy and kitten wave begins; vaccine series bookings.',
      'Flea, tick, and heartworm season; boarding inquiries for summer begin.',
      'Peak new-pet month. Grooming demand spikes with shedding season.',
      'Summer boarding and daycare fill; book-by dates matter.',
      'Fireworks anxiety and heat; after-hours calls peak over the Fourth.',
      'Boarding peak; back-to-school daycare enrollments.',
      'Senior pet wellness pushes; fall grooming.',
      'Halloween and cold-weather prep; holiday boarding books now.',
      'Thanksgiving boarding fills by the first week.',
      'Holiday boarding peak and gift certificates for grooming.',
    ]),
    kpis: [
      { name: 'Calls answered within 60 seconds', baseline: '50 to 65%', target: '100% answered, 95% in 60 seconds', why: 'A worried owner on hold hangs up and calls the clinic across town.' },
      { name: 'Reminder-driven bookings', baseline: 'Postcards', target: '60% of due pets booked within 30 days', why: 'Vaccine and wellness recall is the most reliable revenue in the clinic.' },
      { name: 'No-show rate', baseline: '8 to 12%', target: 'Under 4%', why: 'Text reminders with one-tap confirm cut no-shows in half.' },
      { name: 'Boarding occupancy (peak weeks)', baseline: 'Full, with turned-away calls uncounted', target: 'Waitlist captured and converted', why: 'Every turned-away holiday booking is a customer for the next one if you capture it.' },
      { name: 'Reviews per month', baseline: '3 to 6', target: '20+', why: 'Pet owners choose on trust; recent reviews about how staff treated a scared dog are the deciding factor.' },
    ],
    intake: [
      'What kind of pet, and what is their name?',
      'Is this an emergency right now? (If yes, routed immediately with the nearest emergency hospital named.)',
      'Is this a wellness visit, a specific concern, grooming, boarding, or daycare?',
      'For boarding: drop-off and pick-up dates, and are vaccines current?',
      'Is your pet an existing patient or client here?',
      'Best mobile number for confirmation and updates?',
    ],
    scripts: [
      { name: 'Missed call, clinic', when: 'Within 30 seconds', text: 'Thanks for calling [Clinic]. If this is an emergency, call [Emergency Hospital] at [number] now. Otherwise, tell us your pet\'s name and what is going on and we will get you the first available time.' },
      { name: 'Reminder', when: '48 hours and 2 hours before', text: 'Reminder: [Biscuit] is booked [Tuesday] at [3:15] for [annual exam and vaccines]. Reply C to confirm or R to reschedule. Please bring a fresh stool sample if you can.' },
      { name: 'Boarding waitlist', when: 'When peak dates are full', text: 'Hi [Name], we are full for [Thanksgiving] but you are first on the waitlist. We will text the moment a kennel opens. For next time, [Christmas] still has space: reply YES to hold it.' },
    ],
    math: { avgTicket: 310, leadsPerMonth: 180, missedShare: 0.35, closeRate: 0.6, ticketLabel: 'average visit or stay' },
    firstThirty: [
      'Emergency routing and live answering on every line.',
      'Reminders and recall by text, built from the practice management export.',
      'Online booking for wellness, grooming, and daycare.',
      'Boarding waitlist capture for peak dates.',
      'Review ask after checkout, with the pet\'s name in it.',
    ],
    mistakes: [
      'A phone tree between a scared owner and a human.',
      'Recall by postcard.',
      'Turning away holiday boarding without taking a name.',
      'No reply to the one bad review about wait times.',
    ],
    faqs: [
      { q: 'How does the system handle emergencies?', a: 'First, before anything else. Any inquiry that signals an emergency gets the nearest emergency hospital\'s number immediately and the clinic is alerted. It never triages or gives medical guidance; it gets the owner to a person fast.' },
      { q: 'Our practice management software is old. Will this work?', a: 'Almost always. If there is no integration we work from a nightly export for reminders and recall, and online bookings land on a synced calendar your desk confirms. The clinic keeps its system; the phone stops ringing unanswered.' },
      { q: 'Groomers and daycares too, or just clinics?', a: 'All of them. Grooming and daycare win on booking convenience and photo-heavy reviews; clinics win on answering and recall. The system is tuned for each, and a combined practice runs both.' },
    ],
  },
  {
    slug: 'childcare-education',
    promise: 'Fill the fall roster by spring, answer every tour request the same hour, and keep the waitlist warm.',
    season: season([
      'New-year enrollment inquiries; parents returning to work after leave.',
      'Fall enrollment opens at most centers. Tour requests climb.',
      'Peak tour season. The center that confirms a tour first usually enrolls the family.',
      'Summer camp and program registration; deposits due.',
      'Fall rosters near full; waitlists form in popular rooms.',
      'Transitions: kindergarten send-offs, summer program start.',
      'Summer program running; fall inquiry trickle from relocating families.',
      'Last-minute fall enrollment; the waitlist converts now.',
      'Fall start. Reviews from happy first-week families are the easiest of the year.',
      'Open houses for next year; tuition and schedule updates published.',
      'Early registration for returning families.',
      'Holiday closures communicated; January inquiries begin before New Year.',
    ]),
    kpis: [
      { name: 'Tour request response time', baseline: 'Next business day', target: 'Under 60 seconds, 7 days', why: 'Parents inquire after bedtime; the center that answers that night books the tour.' },
      { name: 'Inquiry-to-tour rate', baseline: '40%', target: '70%+', why: 'Instant two-option scheduling removes the back-and-forth that loses families.' },
      { name: 'Tour-to-enrollment rate', baseline: '50%', target: '70%+', why: 'Follow-up after the tour, with the one thing the parent asked about, closes it.' },
      { name: 'Waitlist conversion', baseline: 'Untracked', target: '50% of openings filled from the list within 7 days', why: 'A warm waitlist fills an opening in days instead of weeks of ads.' },
      { name: 'Reviews per month', baseline: '1 to 3', target: '8 to 12', why: 'Parents choose childcare on other parents\' words, nearly exclusively.' },
    ],
    intake: [
      'How old is your child, and when do you need care to start?',
      'Which days and hours do you need? (Full-time, part-time, before and after school.)',
      'Which location or program are you interested in?',
      'Does your child have any allergies, needs, or an IEP we should plan for?',
      'Would you like to book a tour? (Two times offered immediately.)',
      'Best mobile number to confirm the tour and send the enrollment packet?',
    ],
    scripts: [
      { name: 'Tour booking', when: 'Within 60 seconds of an inquiry, any hour', text: 'Hi [Name], thanks for asking about [Center]. We have openings in the [toddler] room starting [September]. Tours this week: [Tuesday 9:30] or [Thursday 4:00]. Which works? Reply with one and we will confirm.' },
      { name: 'Post-tour follow-up', when: 'Same evening as the tour', text: 'It was lovely meeting [Child] today. You asked about [nap schedules]; here is how we handle it: [two sentences]. The enrollment packet is here: [link]. The [toddler] spot holds for 72 hours.' },
      { name: 'Waitlist opening', when: 'When a spot opens in a room', text: 'Hi [Name], a [preschool] spot opened for [October]. You are next on the list. Reply YES within 48 hours to claim it and we will send the paperwork.' },
    ],
    math: { avgTicket: 14500, leadsPerMonth: 25, missedShare: 0.3, closeRate: 0.4, ticketLabel: 'average annual enrollment' },
    firstThirty: [
      'Tour requests answered and scheduled around the clock, with licensing information linked.',
      'Post-tour follow-up sequence with the family\'s specific question answered.',
      'Waitlist built and kept warm with a monthly update.',
      'Enrollment packet by link with a deadline and a reminder.',
      'Review ask to current families at the end of the first month of fall.',
    ],
    mistakes: [
      'Tour requests answered by the director between classrooms, two days later.',
      'A waitlist in a spiral notebook.',
      'Tuition hidden until the tour.',
      'No reviews because nobody asked the happy families.',
    ],
    faqs: [
      { q: 'Is it appropriate to automate communication with parents?', a: 'For scheduling tours, sending packets, and reminders, yes, and parents prefer it to phone tag. Anything about a child\'s day, behavior, or needs comes from a teacher or director, never from the system. The line is drawn in the setup and in writing.' },
      { q: 'We are always full. What is the point?', a: 'Full centers still have turnover, and a warm waitlist fills an opening in days instead of weeks. Full is also when your reviews should be built, so the next room you open fills from the list, not from ads.' },
      { q: 'What about state licensing and compliance?', a: 'The system does not touch it, beyond linking your license and EEC information where parents expect to see it. Enrollment forms stay in your process; we make them easier to deliver, sign, and track.' },
    ],
  },
  {
    slug: 'marine-boat-services',
    promise: 'Quote the winterization in 60 seconds, book the spring commissioning in January, and never miss a season call.',
    season: season([
      'Storage season. Owners plan spring work; the yard that quotes now books April.',
      'Boat show month. Inquiries about repowers and electronics upgrades.',
      'Spring commissioning bookings. First-in, first-launched is the sales pitch.',
      'Launch rush begins. Phones ring unanswered in the yard; text-back earns its keep.',
      'Peak launch and commissioning. Detailing and bottom paint backlog.',
      'Season opens; service calls for things that broke on the first run.',
      'Peak season emergencies: outboards, electronics, and trailer work. Fast response wins repeat business.',
      'Steady. Charter and rental inquiries peak with the weather.',
      'Early haul-outs begin after Labor Day; winterization quotes go out.',
      'Peak haul-out and winterization. Volume decides the year.',
      'Last haul-outs; shrink-wrap and storage invoices.',
      'Quiet. Sell spring packages and ask for reviews from the season.',
    ]),
    kpis: [
      { name: 'Speed to lead', baseline: 'Hours (yard phone)', target: 'Under 60 seconds', why: 'A boat owner with a dead outboard in July calls until someone answers.' },
      { name: 'Winterization quote turnaround', baseline: 'Days', target: 'Instant range by text', why: 'Winterization is a commodity; the first credible quote wins.' },
      { name: 'Seasonal package conversion', baseline: 'Unknown', target: '50% of storage customers on a spring package', why: 'Packages sold in winter smooth the April rush.' },
      { name: 'Repeat rate year over year', baseline: '60%', target: '80%+', why: 'The reminder sequence is what makes last year\'s customer this year\'s.' },
      { name: 'Reviews per month (season)', baseline: '1 to 2', target: '10+', why: 'Boat owners talk at the dock; reviews are the dock, online.' },
    ],
    intake: [
      'What kind of boat and how long? Inboard, outboard, or sail?',
      'What do you need: service or repair, winterization and storage, commissioning, detailing, or a slip?',
      'Where is the boat now: in the water, on a trailer, or at another yard?',
      'When do you need it done by?',
      'Is the boat under warranty?',
      'Best mobile number to text the quote to?',
    ],
    scripts: [
      { name: 'Missed call, season', when: 'Within 30 seconds, May through September', text: 'Hi, it is [Marina]. We are on the docks. Reply with the boat, the problem, and where she is, and the service manager will text you a time today.' },
      { name: 'Winterization quote', when: 'Instantly from the calculator', text: 'Hi [Name], winterization and shrink-wrap for a [24-foot outboard] runs [$485 to $560] depending on engine count. Indoor storage adds [$52 per foot]. Reply YES to reserve a haul date in [October].' },
      { name: 'Spring reminder', when: 'January 15 to storage customers', text: 'Hi [Name], the [Grady] is in good hands. Book spring commissioning now and you are first in the water in April: [link]. Package price holds until [February 28].' },
    ],
    math: { avgTicket: 1250, leadsPerMonth: 55, missedShare: 0.4, closeRate: 0.5, ticketLabel: 'average service or storage ticket' },
    firstThirty: [
      'Live answering with dock-side text-back for the season.',
      'QuoteBrain for winterization, shrink-wrap, storage, and bottom paint by boat length.',
      'Spring package offer to every storage customer.',
      'Service reminders keyed to the calendar: haul-out, commissioning, mid-season check.',
      'Review ask at launch and at haul-out.',
    ],
    mistakes: [
      'One phone in the office, nobody in the office.',
      'Winterization quotes by callback in the busiest month of the year.',
      'No spring reminder, so last year\'s storage customer launches somewhere else.',
      'A website with no pricing and a photo from 2014.',
    ],
    faqs: [
      { q: 'Can a calculator really price marine work?', a: 'The commodity work, yes: winterization, shrink-wrap, storage, bottom paint, and detailing price cleanly by length and engine count. Repairs get an intake and a fast callback, not an instant number. The calculator removes the phone tag from the half of your business that does not need a diagnosis.' },
      { q: 'We are seasonal. Do we pay the monthly fee in February?', a: 'Yes, and February is when the system is selling your spring. The reminder and package sequences run in the off-season; that is the whole point of having them automated. The monthly is small next to one booked commissioning.' },
      { q: 'Do you work with marinas in Florida too?', a: 'The systems do. Fort Lauderdale, Pompano Beach, and the Palm Beach County waterfront are year-round markets where the same answering, quoting, and review engine runs; the calendar just does not have a haul-out season.' },
    ],
  },
  {
    slug: 'cannabis-regulated-retail',
    promise: 'Own search and reviews where ads are off the table, and keep every message inside the rules.',
    season: season([
      'Post-holiday lull; Dry January affects some categories. Audit compliance of all public content.',
      'Valentine and Super Bowl weekends. Compliant promotions planned with counsel.',
      'Spring traffic begins; St. Patrick weekend for adjacent categories.',
      '4/20 is the dispensary year\'s biggest week. Hours, inventory, and the profile must be perfect by the 10th.',
      'Memorial Day weekend; outdoor season starts.',
      'Summer traffic; tourist corridors on the coast gain visitors unfamiliar with your store.',
      'Fourth of July weekend; the highest week for several regulated categories.',
      'Steady summer; competitor openings in neighboring towns shift traffic.',
      'Labor Day weekend; fall loyalty pushes.',
      'Halloween; fall promotions with age-gated creative.',
      'Green Wednesday, the day before Thanksgiving, is a top-three sales day.',
      'Holiday gifting and New Year\'s Eve. Review asks to loyal customers.',
    ]),
    kpis: [
      { name: 'Google Business Profile views and direction requests', baseline: 'Untracked', target: 'Up 40% in 90 days', why: 'With paid ads largely unavailable, the profile is the storefront.' },
      { name: 'Review velocity', baseline: '5 to 10 per month', target: '40+ per month', why: 'Reviews are the ranking signal and the trust signal in one.' },
      { name: 'Owned-list growth (compliant opt-in)', baseline: 'POS-only', target: '+300 per month', why: 'A compliant text and email list is the only promotion channel you fully control.' },
      { name: 'Online order share', baseline: '20 to 30%', target: '50%+', why: 'Pre-orders cut lines, raise basket size, and capture the customer record.' },
      { name: 'Compliance incidents in public content', baseline: 'Unknown', target: 'Zero', why: 'One violation costs more than a year of marketing.' },
    ],
    intake: [
      'Are you 21 or older? (Age gate before anything else.)',
      'Are you a new customer or do you have an account with us?',
      'Pickup, delivery where permitted, or a question about products or hours?',
      'Which store location?',
      'Would you like to join our text list for drops and hours? (Compliant opt-in with full disclosure.)',
      'Best mobile number for order-ready alerts?',
    ],
    scripts: [
      { name: 'Hours and directions', when: 'Any inquiry, age-verified', text: 'Thanks for reaching [Store]. We are open until [9pm] today at [address]; parking is behind the building. Order ahead to skip the line: [link]. Reply STOP to opt out.' },
      { name: 'Order-ready alert', when: 'When a pre-order is packed', text: 'Your order is ready at [Store], [Name]. Pick up at the express counter with ID. Hold until [close]. Reply STOP to opt out.' },
      { name: 'Review ask', when: 'Two hours after pickup, opted-in customers', text: 'Thanks for visiting [Store]. If the team took care of you, a Google review helps a local, licensed shop compete: [link]. Reply STOP to opt out.' },
    ],
    math: { avgTicket: 68, leadsPerMonth: 900, missedShare: 0.2, closeRate: 0.5, ticketLabel: 'average basket (first of many)' },
    firstThirty: [
      'Compliance review of every public page, profile, and message template with your counsel.',
      'Google Business Profile rebuilt with compliant categories, photos, and hours.',
      'Age-gated intake and order-ready texting with full opt-in disclosure.',
      'Review ask tied to pickup for opted-in customers.',
      'Owned list growth: in-store QR, online checkout, and a monthly compliant send.',
    ],
    mistakes: [
      'Posting promotions that violate state advertising rules on a public profile.',
      'Renting a customer list from a platform that owns the relationship.',
      'Ignoring the Google profile because "we cannot advertise anyway."',
      'Texting without documented consent.',
    ],
    faqs: [
      { q: 'How do you keep messaging compliant?', a: 'Every template is reviewed against the state\'s advertising and marketing rules with your counsel before it goes live, every message carries opt-out language, and consent is documented at capture. We operate within the Cannabis Control Commission framework in Massachusetts and the equivalent rules for other restricted categories.' },
      { q: 'Can you run ads for us?', a: 'Mostly no, and we say so. Major ad platforms restrict regulated categories. The strategy is owned channels: search, the Google profile, reviews, a compliant list, and a fast website. That is where the Outback Arms platform grew store-reported business 300%.' },
      { q: 'Do you work with other regulated retail?', a: 'Yes: licensed firearms dealers, vape and tobacco, and alcohol where local rules allow. Each has its own compliance regime; the owned-channel approach is the same. We do not take clients operating outside their license.' },
    ],
  },
];

export const playbookFor = (slug: string) => PLAYBOOKS.find((p) => p.slug === slug);

/** Monthly revenue currently lost to slow or missed responses, from the playbook's assumptions. */
export const leakPerMonth = (m: PlaybookMath) => Math.round(m.leadsPerMonth * m.missedShare * m.closeRate * m.avgTicket);
