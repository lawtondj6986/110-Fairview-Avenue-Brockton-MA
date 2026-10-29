/**
 * Broward County, FL — the municipalities the seasonal South Florida practice
 * serves, with a market profile for each. Drives the Broward Territory Board
 * (Market Lock exclusivity is one business per category, per city) and the
 * per-city practice pages at /broward/[city]/.
 *
 * Scope reminder: in Florida ICS delivers AI revenue systems, retail platforms,
 * and custom builds. Real estate brokerage is Massachusetts-licensed; a Florida
 * property transaction is handled alongside a licensed Florida broker.
 */
export interface Place {
  slug: string;
  name: string;
}

export interface BrowardCity extends Place {
  /** Where it sits in the county, for the first sentence. */
  position: string;
  /** The commercial corridors and districts a local would name. */
  corridors: string[];
  /** The kinds of local businesses that dominate the city's demand. */
  businessMix: string[];
  /** The one-paragraph read on what an AI revenue system does here. */
  angle: string;
  neighbors: string[];
}

export const BROWARD_CITIES: BrowardCity[] = [
  {
    slug: 'fort-lauderdale',
    name: 'Fort Lauderdale',
    position: 'the county seat and the center of Broward’s business, marine, and visitor economy',
    corridors: ['Las Olas Boulevard', 'Federal Highway (US-1)', 'Sunrise Boulevard', 'Broward Boulevard', 'SE 17th Street and the marine district', 'Flagler Village'],
    businessMix: ['marine services and yacht trades', 'restaurants and hospitality', 'law, accounting, and professional offices', 'medical and aesthetic practices', 'real estate and property services', 'contractors serving the coastal housing stock'],
    angle: 'Fort Lauderdale is the most competitive local-search market in the county: every category has dozens of businesses bidding for the same corridors. The advantage goes to the business that answers first and shows proof. Market Lock here is one business per category for the whole city, and it is the territory ICS expects to lock first.',
    neighbors: ['wilton-manors', 'oakland-park', 'dania-beach', 'plantation', 'lauderdale-lakes'],
  },
  {
    slug: 'hollywood',
    name: 'Hollywood',
    position: 'the south county’s beach-and-downtown city between Fort Lauderdale and the Miami-Dade line',
    corridors: ['Hollywood Boulevard and Downtown', 'Young Circle', 'Federal Highway (US-1)', 'the Broadwalk and beach', 'Sheridan Street', 'State Road 7 (441)'],
    businessMix: ['restaurants, bars, and hospitality', 'medical and dental practices', 'salons and personal care', 'home services for the older housing stock', 'auto repair along 441', 'small retail downtown'],
    angle: 'Hollywood has a real downtown and a real beach, which means two distinct customer flows: residents in the neighborhoods and visitors on the Broadwalk. A system here is tuned to the resident side, where repeat business lives, with the review engine doing the work that tourist foot traffic cannot.',
    neighbors: ['dania-beach', 'hallandale-beach', 'pembroke-pines', 'miramar'],
  },
  {
    slug: 'pembroke-pines',
    name: 'Pembroke Pines',
    position: 'the large suburban city in the southwest, built around Pines Boulevard and the family market',
    corridors: ['Pines Boulevard', 'University Drive', 'Flamingo Road', 'Sheridan Street', 'the Pembroke Lakes area', 'I-75 interchanges'],
    businessMix: ['pediatric, dental, and family medical practices', 'childcare and tutoring', 'fitness and youth sports', 'home services for a large single-family base', 'auto services', 'restaurants on Pines Boulevard'],
    angle: 'Pembroke Pines is a family suburb at scale: tens of thousands of households making the same decisions about dentists, daycares, pool service, and HVAC. Demand is steady and the winner is whoever a parent finds first at 9 p.m. Speed to lead and a complete Google profile matter more here than almost anywhere in the county.',
    neighbors: ['miramar', 'hollywood', 'davie', 'cooper-city', 'weston'],
  },
  {
    slug: 'miramar',
    name: 'Miramar',
    position: 'the fast-growing southwest city straddling residential neighborhoods and a major corporate park',
    corridors: ['Miramar Parkway', 'Red Road (SW 57th Avenue)', 'Flamingo Road', 'the Miramar Park of Commerce', 'University Drive', 'I-75'],
    businessMix: ['logistics, distribution, and light industrial', 'corporate offices and their service vendors', 'medical practices', 'home services', 'restaurants and quick service', 'auto and fleet services'],
    angle: 'Miramar is two markets: a residential city and one of South Florida’s largest business parks. A trades or fleet-service business can sell to both from one location, and an AI system that routes commercial inquiries differently from residential ones is the difference between a lead and a booked account.',
    neighbors: ['pembroke-pines', 'hollywood', 'hallandale-beach'],
  },
  {
    slug: 'coral-springs',
    name: 'Coral Springs',
    position: 'the planned northwest city known for its schools, parks, and dense family neighborhoods',
    corridors: ['University Drive', 'Sample Road', 'Wiles Road', 'Atlantic Boulevard', 'Coral Ridge Drive', 'the Downtown Coral Springs district'],
    businessMix: ['pediatric and family medicine', 'orthodontists and dentists', 'tutoring, music, and youth programs', 'fitness studios', 'home services', 'veterinary practices'],
    angle: 'Coral Springs is where Broward families choose providers for the long term: the pediatrician, the orthodontist, the pool company. Lifetime value is high and switching is rare, so the system that wins the first contact wins years of revenue. Reviews and recall automation carry unusual weight here.',
    neighbors: ['parkland', 'coconut-creek', 'margate', 'tamarac'],
  },
  {
    slug: 'pompano-beach',
    name: 'Pompano Beach',
    position: 'the north-central coastal city with a redeveloping downtown, a working marine district, and deep industrial pockets',
    corridors: ['Atlantic Boulevard', 'Federal Highway (US-1)', 'Dixie Highway', 'Powerline Road industrial corridor', 'the Pompano Beach fishing village and pier district', 'I-95 and the Copans Road area'],
    businessMix: ['marine and boat services', 'contractors and building trades', 'light industrial and distribution', 'restaurants near the pier', 'auto repair and body shops', 'medical practices'],
    angle: 'Pompano is a working city with a growing coastal district, which makes it the Broward market most like the South Shore: trades, marine, industrial, and a downtown finding its footing. ICS’s playbook for contractors and marine services transfers here nearly unchanged, and the territory is wide open.',
    neighbors: ['deerfield-beach', 'lighthouse-point', 'oakland-park', 'coconut-creek', 'margate'],
  },
  {
    slug: 'davie',
    name: 'Davie',
    position: 'the large central town with a western, equestrian character and a major education and medical cluster',
    corridors: ['Davie Road and Downtown Davie', 'University Drive', 'Griffin Road', 'State Road 84 and I-595', 'the Nova Southeastern University area', 'Orange Drive'],
    businessMix: ['equine and agricultural services', 'veterinary practices', 'medical and allied health near the university cluster', 'contractors and landscape companies', 'restaurants on Davie Road', 'auto and truck services'],
    angle: 'Davie’s acreage lots and equestrian zoning create demand no other Broward city has: fencing, barns, large-lot landscaping, trailer and truck service, and veterinary care. A service business that speaks Davie’s language on its town page and answers on Saturday morning owns a niche most competitors never notice.',
    neighbors: ['plantation', 'cooper-city', 'pembroke-pines', 'weston', 'sunrise'],
  },
  {
    slug: 'plantation',
    name: 'Plantation',
    position: 'the central city of corporate campuses, professional offices, and established neighborhoods',
    corridors: ['University Drive', 'Broward Boulevard', 'Pine Island Road', 'the Plantation Midtown district', 'Peters Road', 'Sunrise Boulevard'],
    businessMix: ['professional services: law, accounting, insurance', 'medical specialists and outpatient centers', 'corporate office vendors', 'restaurants and lunch trade', 'home services', 'fitness and wellness'],
    angle: 'Plantation is Broward’s professional-services address, and professionals buy from professionals. A clean site, a complete profile, fast response, and structured data that answer engines can cite will outperform the glossy agency brochure that most Plantation firms are paying for. Market Lock here is about owning a category in front of a high-income daytime population.',
    neighbors: ['sunrise', 'davie', 'fort-lauderdale', 'lauderhill'],
  },
  {
    slug: 'sunrise',
    name: 'Sunrise',
    position: 'the west-central city anchored by Sawgrass Mills and the arena district',
    corridors: ['Sunrise Boulevard', 'the Sawgrass Mills and arena area', 'University Drive', 'Oakland Park Boulevard', 'Pine Island Road', 'the Sawgrass Expressway'],
    businessMix: ['retail and restaurants near Sawgrass', 'hospitality and event services', 'medical practices', 'home services for a dense condo and townhouse base', 'auto services', 'logistics near the Sawgrass Corporate Park'],
    angle: 'Sunrise has one of the region’s largest retail gravity wells and a dense residential base around it. For a local service business the opportunity is the residents, not the mall: thousands of condo and townhouse households whose HOA-driven needs, from AC to plumbing to painting, repeat on a schedule. Recall automation is the quiet winner here.',
    neighbors: ['plantation', 'tamarac', 'lauderhill', 'weston', 'davie'],
  },
  {
    slug: 'deerfield-beach',
    name: 'Deerfield Beach',
    position: 'the northeast corner city at the Palm Beach County line with a beach, a pier, and a large industrial and distribution base',
    corridors: ['Hillsboro Boulevard', 'Federal Highway (US-1)', 'Powerline Road and the industrial parks', 'Military Trail', 'the pier and beach district', 'I-95 and the Sawgrass terminus'],
    businessMix: ['distribution and light industrial', 'contractors and building trades', 'marine services', 'restaurants at the beach', 'medical practices', 'auto and fleet services'],
    angle: 'Deerfield is a logistics and trades city with a beach attached, and its businesses serve two counties from one address. A system here is built to capture Palm Beach County inquiries as readily as Broward ones and to route them correctly. Industrial-adjacent trades, from HVAC to fleet repair, are the deepest demand.',
    neighbors: ['pompano-beach', 'lighthouse-point', 'coconut-creek'],
  },
  {
    slug: 'weston',
    name: 'Weston',
    position: 'the master-planned far-west city with high household incomes and strict community standards',
    corridors: ['Weston Road', 'Bonaventure Boulevard', 'Royal Palm Boulevard', 'the Weston Town Center', 'Indian Trace', 'I-75 and the Everglades edge'],
    businessMix: ['concierge and specialist medical practices', 'orthodontists and pediatric dentists', 'high-end home services', 'tutoring and enrichment', 'fitness and wellness', 'landscape and pool companies'],
    angle: 'Weston households expect a polished, immediate experience and will pay for it. The system that wins here looks and responds like the premium service it is: instant, specific, reviewed. Price sensitivity is low; tolerance for a slow callback is lower. Weston is a quality-of-execution market.',
    neighbors: ['davie', 'sunrise', 'pembroke-pines', 'cooper-city'],
  },
  {
    slug: 'tamarac',
    name: 'Tamarac',
    position: 'the west-central city with a large retiree population and established residential communities',
    corridors: ['Commercial Boulevard', 'University Drive', 'McNab Road', 'Pine Island Road', 'Nob Hill Road', 'the Sawgrass Expressway'],
    businessMix: ['medical, cardiology, and home health', 'pharmacies and medical supply', 'home services for aging housing stock', 'restaurants and lunch trade', 'auto services', 'insurance and financial advisors'],
    angle: 'Tamarac’s demographics favor trust and clarity over flash: medical practices, home health, and home services for owners who want a straight answer and a phone that is picked up. The AI chat agent and missed-call text-back are built to be plain-spoken here, and the review engine speaks for the business when a referral does not.',
    neighbors: ['coral-springs', 'sunrise', 'lauderhill', 'north-lauderdale', 'margate'],
  },
  {
    slug: 'lauderhill',
    name: 'Lauderhill',
    position: 'the central-west city with a strong Caribbean business community and dense neighborhoods',
    corridors: ['State Road 7 (441)', 'Oakland Park Boulevard', 'University Drive', 'Sunrise Boulevard', 'Inverrary Boulevard', 'the Lauderhill Mall area'],
    businessMix: ['restaurants and Caribbean food', 'barbershops, salons, and personal care', 'auto repair and tire shops', 'medical and dental practices', 'small retail and groceries', 'home services'],
    angle: 'Lauderhill’s business base is entrepreneurial and relationship-driven, and most of it is under-represented online. The gap between a thriving storefront and its web presence is the opportunity: a complete profile, steady reviews, and instant response put a Lauderhill business in front of customers who were searching and finding someone else.',
    neighbors: ['lauderdale-lakes', 'tamarac', 'sunrise', 'plantation', 'north-lauderdale'],
  },
  {
    slug: 'coconut-creek',
    name: 'Coconut Creek',
    position: 'the north-central city of planned communities, a casino district, and the MainStreet redevelopment area',
    corridors: ['Lyons Road', 'Sample Road', 'Hillsboro Boulevard', 'Wiles Road', 'the Promenade and MainStreet district', 'the Seminole Casino area'],
    businessMix: ['medical and dental practices', 'fitness and wellness', 'home services for HOA communities', 'restaurants at the Promenade', 'veterinary practices', 'childcare and tutoring'],
    angle: 'Coconut Creek is HOA country: planned communities where households share the same vendors and the same review threads. One well-reviewed business can become the default for an entire community, and the Proof Engine is built for exactly that compounding. Family medical and dental are the deepest categories.',
    neighbors: ['margate', 'coral-springs', 'pompano-beach', 'deerfield-beach'],
  },
  {
    slug: 'margate',
    name: 'Margate',
    position: 'the compact north-central city of established neighborhoods and busy commercial boulevards',
    corridors: ['State Road 7 (441)', 'Atlantic Boulevard', 'Coconut Creek Parkway', 'Rock Island Road', 'Royal Palm Boulevard', 'Margate Boulevard'],
    businessMix: ['auto repair and body shops along 441', 'home services', 'medical and dental practices', 'restaurants and quick service', 'salons and personal care', 'small retail'],
    angle: 'Margate is a practical, high-traffic city where auto, home services, and everyday retail compete on the big boulevards. The business that answers the phone and has recent reviews beats the one with the bigger sign. A JobSite plus Lead Engine here is a straightforward, measurable win.',
    neighbors: ['coconut-creek', 'coral-springs', 'north-lauderdale', 'tamarac', 'pompano-beach'],
  },
  {
    slug: 'oakland-park',
    name: 'Oakland Park',
    position: 'the central city just north of Fort Lauderdale with a redeveloping downtown and a deep base of trades and industrial businesses',
    corridors: ['Oakland Park Boulevard', 'Dixie Highway and the Downtown Culinary Arts District', 'Federal Highway (US-1)', 'Andrews Avenue', 'Powerline Road', 'Prospect Road industrial area'],
    businessMix: ['contractors and building trades', 'auto repair and specialty shops', 'light industrial and fabrication', 'restaurants and breweries downtown', 'design and home-improvement showrooms', 'medical practices'],
    angle: 'Oakland Park is where Broward’s contractors, fabricators, and specialty shops actually operate, often serving all of Fort Lauderdale from here. It is the Broward equivalent of a South Shore industrial corridor, and ICS’s trades playbook, from instant quoting to missed-call text-back, is built for it.',
    neighbors: ['fort-lauderdale', 'wilton-manors', 'pompano-beach', 'lauderdale-lakes', 'north-lauderdale'],
  },
  {
    slug: 'dania-beach',
    name: 'Dania Beach',
    position: 'the small coastal city beside the airport and port with a marine, antiques, and visitor economy',
    corridors: ['Federal Highway (US-1) and the antiques district', 'Dania Beach Boulevard', 'Griffin Road', 'the Dania Pointe area', 'Stirling Road', 'the marina and pier district'],
    businessMix: ['marine services and boat dealers', 'antiques and specialty retail', 'restaurants and hospitality', 'airport-area logistics and services', 'auto services', 'home services'],
    angle: 'Dania Beach punches above its size with a marine economy, a destination retail district, and the airport next door. Businesses here draw from the whole county, so visibility beyond the city line matters, and a system that captures a Fort Lauderdale yacht owner’s inquiry at 7 a.m. is worth more than any local billboard.',
    neighbors: ['hollywood', 'fort-lauderdale', 'cooper-city'],
  },
  {
    slug: 'hallandale-beach',
    name: 'Hallandale Beach',
    position: 'the southernmost coastal city on the Miami-Dade line with dense high-rise living and a racetrack-and-casino anchor',
    corridors: ['Hallandale Beach Boulevard', 'Federal Highway (US-1)', 'A1A and the beachfront towers', 'Dixie Highway', 'the Gulfstream Park district', 'Pembroke Road'],
    businessMix: ['condo and high-rise services', 'medical and aesthetic practices', 'restaurants and hospitality', 'luxury home services', 'auto and valet services', 'professional services for an international clientele'],
    angle: 'Hallandale Beach is vertical: thousands of condo households whose needs run through building managers and association boards as often as through individual owners. A business that can win a building wins a hundred customers, and the system is built to capture both the resident inquiry and the manager’s.',
    neighbors: ['hollywood', 'miramar'],
  },
  {
    slug: 'cooper-city',
    name: 'Cooper City',
    position: 'the small southwestern family city with top-rated schools and quiet residential streets',
    corridors: ['Stirling Road', 'Sheridan Street', 'Pine Island Road', 'Flamingo Road', 'Griffin Road', 'the Cooper City town center area'],
    businessMix: ['pediatric and family practices', 'orthodontists and dentists', 'youth sports and tutoring', 'home services and pool companies', 'veterinary practices', 'small restaurants'],
    angle: 'Cooper City is a referral town: families know each other and ask each other. The online version of that is a review profile with specifics and a response that arrives in seconds. A single well-run family practice or home-service business can hold the whole category here for years.',
    neighbors: ['davie', 'pembroke-pines', 'weston', 'dania-beach'],
  },
  {
    slug: 'parkland',
    name: 'Parkland',
    position: 'the far-northwest city of large lots, gated communities, and the county’s highest household incomes',
    corridors: ['University Drive', 'Holmberg Road', 'Hillsboro Boulevard', 'Loxahatchee Road', 'the Parkland town center', 'Riverside Drive'],
    businessMix: ['premium home services and estate maintenance', 'concierge medical and pediatric practices', 'equine and large-lot landscape services', 'tutoring and enrichment', 'high-end fitness and wellness', 'pool and outdoor living contractors'],
    angle: 'Parkland is low volume and very high value. The households here hire for years and refer within gates. The system that wins is immaculate: instant response, a site that looks like the premium service it represents, and proof from neighbors. One locked category in Parkland can be a business’s most profitable territory.',
    neighbors: ['coral-springs', 'coconut-creek'],
  },
  {
    slug: 'north-lauderdale',
    name: 'North Lauderdale',
    position: 'the compact central city of dense neighborhoods and working families between 441 and the Turnpike',
    corridors: ['State Road 7 (441)', 'McNab Road', 'Rock Island Road', 'Kimberly Boulevard', 'Southgate Boulevard', 'the Turnpike'],
    businessMix: ['auto repair and tire shops', 'home services', 'restaurants and quick service', 'childcare', 'medical and dental practices', 'small retail'],
    angle: 'North Lauderdale’s businesses serve a dense, practical customer base that searches on a phone and calls the first result that answers. There is very little polished competition online, which makes a complete profile, steady reviews, and instant response an outsized advantage at a modest cost.',
    neighbors: ['tamarac', 'margate', 'lauderhill', 'lauderdale-lakes', 'oakland-park'],
  },
  {
    slug: 'lauderdale-lakes',
    name: 'Lauderdale Lakes',
    position: 'the small central city with a strong Caribbean-American community and busy commercial frontage on 441 and Oakland Park Boulevard',
    corridors: ['State Road 7 (441)', 'Oakland Park Boulevard', 'NW 31st Avenue', 'the Lauderdale Lakes city center', 'NW 44th Street'],
    businessMix: ['restaurants and Caribbean groceries', 'barbershops and salons', 'auto repair', 'medical and dental practices', 'tax and insurance offices', 'home services'],
    angle: 'Lauderdale Lakes is full of businesses that thrive on word of mouth and barely exist online. The first barbershop, restaurant, or auto shop in each category to show up completely, respond instantly, and collect reviews will capture customers who are already searching for exactly what it sells.',
    neighbors: ['lauderhill', 'oakland-park', 'north-lauderdale', 'fort-lauderdale'],
  },
  {
    slug: 'wilton-manors',
    name: 'Wilton Manors',
    position: 'the small, walkable island city north of downtown Fort Lauderdale with a famous dining and nightlife strip',
    corridors: ['Wilton Drive', 'NE 26th Street', 'Dixie Highway', 'Andrews Avenue', 'Five Points'],
    businessMix: ['restaurants, bars, and cafes', 'salons, barbers, and personal care', 'fitness and wellness studios', 'medical and aesthetic practices', 'boutiques and specialty retail', 'home services for a dense single-family core'],
    angle: 'Wilton Manors is dense, loyal, and walkable: a business on Wilton Drive can become a neighborhood institution. The marketing job is less about being found and more about being chosen and remembered, which puts the review engine and the recall system ahead of paid media. Hospitality and personal care are the deepest categories.',
    neighbors: ['fort-lauderdale', 'oakland-park'],
  },
  {
    slug: 'lighthouse-point',
    name: 'Lighthouse Point',
    position: 'the small, affluent waterfront city of canals and boat docks north of Pompano Beach',
    corridors: ['Federal Highway (US-1)', 'NE 24th Street', 'Sample Road', 'the Lighthouse Point Marina and yacht basin area', 'Lighthouse Drive'],
    businessMix: ['marine services, dockage, and boat maintenance', 'premium home services', 'medical and aesthetic practices', 'restaurants at the marina', 'landscape and pool companies', 'professional services'],
    angle: 'Lighthouse Point is small, wealthy, and on the water, which means a marine or premium home-service business can hold the entire city with a handful of referrals and a flawless response. Volume is low; the value of each relationship is high. It is a territory to lock with a premium service, not a volume play.',
    neighbors: ['pompano-beach', 'deerfield-beach'],
  },
];

export const getBrowardCity = (slug: string) => BROWARD_CITIES.find((c) => c.slug === slug);
