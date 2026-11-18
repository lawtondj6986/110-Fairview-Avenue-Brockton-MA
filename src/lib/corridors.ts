/**
 * Corridor guides — one page per named route on the maps. The geometry (which
 * places a route threads through) lives in town-geo.ts and drives the map; this
 * file adds the reading: what the corridor is, who does business on it, and
 * what a buyer or owner should know. A corridor page can only name places that
 * already have pages, because the towns list is shared with the map.
 */
import { CORRIDORS, BROWARD_CORRIDORS, PALM_BEACH_CORRIDORS, type Corridor } from './town-geo';
import type { Market } from './sheets';

export interface CorridorGuide {
  slug: string;
  market: Market;
  /** Must match Corridor.route in town-geo.ts exactly. */
  route: string;
  /** The display name on the page, e.g. "Route 28" or "I-95 and US-1 through Broward". */
  name: string;
  tagline: string;
  read: string[];
  businesses: string[];
  /** The advisor's note for someone buying, leasing, or building a business on this corridor. */
  note: string;
}

export const CORRIDOR_GUIDES: CorridorGuide[] = [
  // ---------------------------------------------------------------- South Shore, MA
  {
    slug: 'route-3',
    market: 'MA',
    route: 'Route 3',
    name: 'Route 3, the Pilgrims Highway',
    tagline: 'The commuter spine of the South Shore, and the exits where its retail and office markets were built.',
    read: [
      'Route 3 is how the South Shore gets to Boston and back, and every interchange from the Braintree split to Plymouth has grown a market around it. Braintree and Weymouth carry the regional retail and the older office stock; Hingham and Norwell hold the professional and medical campuses off the Derby Street and Route 53 exits; Hanover and Pembroke are plaza retail and trades; Kingston and Plymouth are the destination retail and the fastest-growing residential base on the highway.',
      'Commercial property here prices on the exit, not the town. A flex building two minutes from an on-ramp trades at a premium over the same building six minutes away, and the tenants who pay it are the ones whose crews and customers drive the highway daily: medical, trades, logistics, and the service businesses that follow new rooftops south.',
    ],
    businesses: ['medical and dental groups on the Hingham and Norwell exits', 'regional and destination retail at Braintree, Hanover, Kingston, and Plymouth', 'trades and home-service companies serving the whole corridor from one yard', 'professional offices in the Route 3 and Route 53 parks', 'auto dealers and service along the frontage roads', 'logistics and distribution with highway access'],
    note: 'Buy for the on-ramp. Ask the traffic question before the building question, and expect competition for anything with a yard inside five minutes of an exit between Weymouth and Pembroke.',
  },
  {
    slug: 'route-3a',
    market: 'MA',
    route: 'Route 3A',
    name: 'Route 3A, the coast road',
    tagline: 'Village centers, harbors, and the marine economy from Quincy to Plymouth.',
    read: [
      'Route 3A is the South Shore the postcards show: Quincy\'s Southern Artery giving way to Weymouth\'s Bridge Street, then Hingham Harbor, Cohasset village, Scituate Harbor and North Scituate, Marshfield\'s Ocean Street, Duxbury, Kingston, and the Plymouth waterfront. The commercial stock is older, smaller, and mixed-use: storefronts with apartments above, marinas and boatyards, restaurants that live on summer and hold on through February.',
      'The business economy here is seasonal and local at the same time. Marine services, restaurants, salons, and home services compete on reputation inside towns where everyone knows everyone, which makes reviews and response time worth more per customer than anywhere else on the South Shore.',
    ],
    businesses: ['marine services, boatyards, and dockage', 'restaurants, cafes, and seasonal hospitality', 'village retail and galleries', 'home services for an older coastal housing stock', 'salons, wellness, and personal care', 'small professional offices in village centers'],
    note: 'Coastal mixed-use buildings trade quietly and rarely. Flood zones, septic, and parking decide more deals here than price per foot. Marine businesses should look at the marine services playbook before the building.',
  },
  {
    slug: 'route-24',
    market: 'MA',
    route: 'Route 24',
    name: 'Route 24, the industrial expressway',
    tagline: 'Where the South Shore\'s flex, logistics, and contractor economy lives: Randolph to Bridgewater, Raynham, and Taunton.',
    read: [
      'Route 24 is the working corridor. The Avon industrial park, Brockton\'s Westgate and Route 123 exits, the West Bridgewater interchange with Route 106, and the Bridgewater parks off Route 104 hold most of the clear-span, loading-dock, and yard product on this side of the South Shore. It is the inventory every growing contractor, distributor, and fabricator within twenty minutes wants, and it almost never reaches a listing portal.',
      'Businesses on this corridor are high-ticket operators running on spreadsheets and voicemail: paving, roofing, HVAC, electrical, fleet services, and the distributors that supply them. The first one in each trade to answer in sixty seconds and quote the same day takes a disproportionate share of a very large pie.',
    ],
    businesses: ['contractors with yards and fleets', 'distribution, logistics, and light manufacturing', 'fleet, truck, and heavy-equipment services', 'building-supply and trade wholesalers', 'regional retail at the Westgate exits', 'medical and professional offices on the Brockton and Randolph exits'],
    note: 'Flex with a yard near a Route 24 exit is the most contested product we hunt. Tell us before you scroll listings; it moves owner to owner, and the first call usually wins.',
  },
  {
    slug: 'route-28',
    market: 'MA',
    route: 'Route 28',
    name: 'Route 28, the Main Street spine',
    tagline: 'Blue Hill Avenue to Cranberry Highway: the freestanding-retail and auto corridor from Milton through Randolph, Avon, Brockton, and West Bridgewater to Middleborough and Wareham.',
    read: [
      'Route 28 is Main Street for five towns in a row. It runs as North Main Street through Randolph and Avon, becomes Brockton\'s Main Street through Montello, downtown, and Campello, crosses Route 106 in West Bridgewater, and continues south toward Middleborough. The buildings are freestanding retail pads, auto dealers and repair shops, restaurants, and converted houses holding professional offices, with downtown Brockton\'s mixed-use blocks in the middle.',
      'This is drive-by commerce. Visibility, signage, and a curb cut do real work, and the businesses that pair that frontage with a site that converts and a phone that gets answered own their category for miles in either direction.',
    ],
    businesses: ['auto sales, repair, body, and tire shops', 'restaurants, quick service, and bakeries', 'freestanding and strip retail', 'salons, barbers, and personal care', 'medical, dental, and professional offices in converted houses', 'downtown Brockton mixed-use: storefronts with apartments above'],
    note: 'Frontage on Route 28 with parking and a curb cut rarely lasts. Automotive buildings along it carry environmental history; a Phase I is read before the offer, not after.',
  },
  {
    slug: 'route-18',
    market: 'MA',
    route: 'Route 18',
    name: 'Route 18, Bedford Street',
    tagline: 'The drive-by trades-and-services corridor from South Weymouth through Abington and Whitman to Bridgewater.',
    read: [
      'Route 18 is Bedford Street for most of its length, and it is the South Shore\'s most practical commercial corridor: strip retail and service buildings, contractor shops, dental and medical practices in converted houses, and the plazas near each town center. South Weymouth and the Union Point redevelopment anchor the north; Abington and Whitman are dense small-business towns in the middle; East Bridgewater and Bridgewater\'s Campus Plaza close it out at the university.',
      'Businesses here serve both residents and the commuter flow toward Route 3, and few of them have systematic lead capture or review programs. The digital bar is low and the upside is fast: the first plumber, dentist, or landscaper on this road to take response time seriously tends to take the town.',
    ],
    businesses: ['plumbers, electricians, HVAC, and landscapers', 'dental and small medical practices', 'strip retail and convenience', 'restaurants and pizza', 'fitness studios and youth programs', 'auto repair and tires'],
    note: 'Well-located Route 18 frontage in Abington and Whitman almost never reaches the portals. Owner-users should set the budget and financing first, then let us work the road owner by owner.',
  },
  {
    slug: 'route-139',
    market: 'MA',
    route: 'Route 139',
    name: 'Route 139, east to west across the South Shore',
    tagline: 'From Stoughton through Holbrook, Abington, Rockland, and Hanover to Marshfield: the cross-county arterial.',
    read: [
      'Route 139 is the road that ties the inland South Shore to the coast. It passes Stoughton\'s industrial and retail stretch, Holbrook\'s center, Abington and Rockland\'s small-business districts, the Hanover retail cluster where it meets Route 53 and Route 3, Pembroke\'s plazas, and Marshfield\'s Plain Street before it reaches the ocean. It is the daily route for crews, deliveries, and families moving between the towns.',
      'Because it connects so many centers, a business on Route 139 serves several towns at once. The territory question matters here more than most: under Market Lock, one business per category per town, a Rockland operator and an Abington operator in the same trade can both hold their ground on the same road.',
    ],
    businesses: ['trades and home services covering several towns from one shop', 'plazas and convenience retail at the town centers', 'restaurants and quick service', 'fitness, childcare, and youth programs', 'medical and veterinary practices', 'auto services'],
    note: 'A business here should decide which two or three towns it wants to own and lock them before the competitor on the next block does. The board shows what is open town by town.',
  },
  {
    slug: 'route-106',
    market: 'MA',
    route: 'Route 106',
    name: 'Route 106, the crossroads corridor',
    tagline: 'Mansfield and Easton to Kingston through West Bridgewater, East Bridgewater, Halifax, and Plympton: the trades road.',
    read: [
      'Route 106 is an east-west road through working towns. It leaves Easton\'s industrial pockets, crosses Route 24 and Route 28 in West Bridgewater (the crossroads the trades know), runs through East Bridgewater\'s center, and continues through Halifax and Plympton to Kingston and Route 3A. The commercial stock is contractor yards, small industrial, farm-and-feed, auto, and the plazas at each center.',
      'This is where the South Shore\'s contractors keep their equipment and their offices. The customer base is spread across a dozen towns, the work is high-ticket, and almost none of it is marketed with anything more than a truck sign. A real quoting and follow-up system is a competitive weapon on this road.',
    ],
    businesses: ['contractors, excavators, and landscape companies with yards', 'small industrial and fabrication', 'agricultural, equine, and feed suppliers', 'auto and truck repair', 'convenience retail at the centers', 'veterinary and large-animal practices'],
    note: 'The West Bridgewater crossroads is the single most useful address on the South Shore for a contractor who works everywhere. Yard product there is hunted, not found.',
  },

  {
    slug: 'route-138',
    market: 'MA',
    route: 'Route 138',
    name: 'Route 138, Blue Hill Avenue to Broadway',
    tagline: 'Milton to Taunton through Canton, Stoughton, Easton, and Raynham: the old turnpike that still carries the trade.',
    read: [
      'Route 138 is the inland spine west of Brockton. It leaves Boston as Blue Hill Avenue through Milton, becomes Washington Street and Turnpike Street through Canton and Stoughton, crosses Easton as Washington Street past the Five Corners area, and runs south as Broadway through Raynham into downtown Taunton. Along the way it threads Cobbs Corner, Stoughton center, Easton\'s industrial pockets, and the auto and retail strips of Raynham and Taunton.',
      'It is a working road with affluent ends. Milton and Canton households buy premium services at the north; Raynham and Taunton carry the auto dealers, trades, and regional retail at the south; Stoughton and Easton in the middle have both. A business on 138 serves two or three towns without trying, which makes the territory question the first one to answer.',
    ],
    businesses: ['auto sales, repair, and body shops along Broadway', 'medical, dental, and professional practices in Milton, Canton, and Easton', 'contractors and industrial services in Stoughton, Easton, and Raynham', 'restaurants and quick service at the centers', 'premium home services at the northern end', 'fitness, childcare, and youth programs'],
    note: 'Decide which towns on 138 you want to own before a competitor on the next block does. Under Market Lock the road is six territories, and the northern three price at a premium for good reason.',
  },
  {
    slug: 'route-44',
    market: 'MA',
    route: 'Route 44',
    name: 'Route 44, the cross-county highway',
    tagline: 'Taunton to Plymouth through Raynham, Middleborough, and Carver: the regional retail road and the way to the Cape bridges.',
    read: [
      'Route 44 crosses the bottom of the South Shore east to west: downtown Taunton, the big-box and plaza retail of Raynham, the Route 24 and Route 495 interchanges, Middleborough\'s rotary and commercial strip, the cranberry country of Carver, and Plymouth\'s Colony Place and the Route 3 interchange. For a large part of Plymouth and Bristol counties, this is the shopping trip and the commute.',
      'The corridor is built for the car: freestanding pads, plazas, auto dealers, and highway-adjacent flex. A business here competes with every plaza on the road, and the one that is found first and answers first takes the car already in the parking lot. For owner-users, flex near the Route 24 and Route 495 ramps is the prize.',
    ],
    businesses: ['regional and big-box retail at Raynham and Plymouth', 'auto sales, service, and tires', 'restaurants, quick service, and hotels', 'flex, distribution, and fleet services near the interchanges', 'agricultural and equipment businesses in Carver and Middleborough', 'medical and dental practices at the town ends'],
    note: 'Frontage on Route 44 with a left-turn lane is worth more than the building on it. Buy for the turn, and check the signage rules before you fall for the facade.',
  },
  {
    slug: 'route-140',
    market: 'MA',
    route: 'Route 140',
    name: 'Route 140, Mansfield to Lakeville',
    tagline: 'The industrial-park road: Cabot Business Park, Norton, Taunton\'s Myles Standish, and the Route 495 belt.',
    read: [
      'Route 140 runs from Mansfield south through Norton into Taunton and on to Lakeville, and it strings together the deepest industrial inventory in southeastern Massachusetts: Mansfield\'s parks along Route 495, Norton\'s flex and yards, the Myles Standish Industrial Park in Taunton, and the Route 140 and Route 495 interchange corridor toward Lakeville and New Bedford. It is also the plaza road for Mansfield and Taunton\'s retail.',
      'Buyers on this corridor are companies that need square footage and highway access: distribution, manufacturing, food production, fleet. The product moves through brokers and owners who know each other, and the best buildings are spoken for before a sign goes up. Businesses that serve the parks win by being findable by a facilities manager\'s search and answering like a professional.',
    ],
    businesses: ['distribution, logistics, and light manufacturing in the parks', 'fleet, truck, and equipment services', 'B2B vendors: IT, facilities, staffing, and supplies', 'restaurants and lunch trade serving the parks', 'retail plazas at Mansfield and Taunton', 'contractors with yards in Norton'],
    note: 'If your business needs 10,000 to 50,000 feet near three interstates, start on Route 140. We hunt the parks owner by owner, and the clock matters: this product does not wait for a listing.',
  },
  {
    slug: 'route-128-i-93',
    market: 'MA',
    route: 'I-93 / 128',
    name: 'Route 128 and I-93, the belt',
    tagline: 'Dedham, Canton, Milton, and Randolph: the metro ring road and the corporate, medical, and regional-retail addresses on it.',
    read: [
      'The southern arc of Route 128 and I-93 is where the South Shore meets the Boston metro: Dedham\'s Route 1 retail and the Dedham Corporate Center, Canton\'s corporate campuses and industrial parks at the I-93 and I-95 junction, Milton\'s affluent squares, and Randolph\'s plazas and parks where Route 24 begins. Everything on the belt prices on access to the whole region.',
      'The customers are corporate by day and affluent by night. B2B service companies sell to the campuses; medical, dental, financial, and premium home services sell to households that research everything and expect an answer in a minute. Competition is dense and capable; being the recommended answer, not just a listed option, is the whole game.',
    ],
    businesses: ['corporate office vendors and B2B services', 'medical, dental, and specialty practices', 'regional retail, restaurants, and hotels on Route 1', 'law, finance, and professional services', 'premium home services for Milton and Canton', 'flex and industrial near the junctions'],
    note: 'On the belt the buyers are sophisticated and so are the sellers. Bring the underwriting before the tour, and expect to compete with investors for anything with a dock inside a mile of the ramps.',
  },
  {
    slug: 'route-228',
    market: 'MA',
    route: 'Route 228',
    name: 'Route 228, Hull to Rockland',
    tagline: 'From Nantasket Beach through Hingham and Norwell to Rockland: the road that ties the peninsula to the Route 3 towns.',
    read: [
      'Route 228 starts at the water in Hull, runs the length of the peninsula past Nantasket Beach, crosses into Hingham as Hull Street and Main Street through the historic center and the Derby Street area, continues through Norwell\'s Queen Anne\'s Corner retail node at Route 53, and ends in Rockland. It is the way a Hull resident reaches a dentist, a hardware store, and the highway.',
      'The corridor runs from a seasonal beach economy to some of the most affluent neighborhoods on the South Shore to a practical trades town, which means a business on it can choose its customer. Hull rewards the operator who answers in winter; Hingham and Norwell reward polish and proof; Rockland rewards speed and price.',
    ],
    businesses: ['restaurants, hospitality, and seasonal retail in Hull', 'medical, dental, and professional practices in Hingham', 'premium home services and landscape for the estates', 'retail and services at Queen Anne\'s Corner', 'marine services on the Hull and Hingham waterfronts', 'trades and auto in Rockland'],
    note: 'A Hull business should think of Route 228 as its supply line and Hingham as its second market. One phone that gets answered serves both.',
  },

  // ---------------------------------------------------------------- Broward County, FL
  {
    slug: 'i-95-us-1-broward',
    market: 'FL',
    route: 'I-95 / US-1',
    name: 'I-95 and US-1 through Broward',
    tagline: 'The coastal spine from Deerfield Beach to Hallandale Beach: Broward\'s densest daytime population.',
    read: [
      'Federal Highway and the interstate beside it carry Broward\'s oldest and busiest commercial strip: Deerfield and Pompano\'s service and marine trades, Oakland Park and Wilton Manors\' independent retail, downtown Fort Lauderdale\'s professional core, Dania Beach\'s design district, Hollywood\'s downtown and beach, and Hallandale\'s dense residential towers. Everything a resident needs is on this road, which means every category on it is crowded.',
      'Crowded corridors reward speed and proof. The business that answers in seconds, shows recent reviews, and is the one Google and the assistants name takes the call; the one with the bigger sign waits for the next one.',
    ],
    businesses: ['law, finance, and professional services in the Fort Lauderdale core', 'medical, dental, and aesthetic practices', 'restaurants and hospitality from Pompano to Hollywood', 'marine services and yacht trades', 'home services for the coastal condo and single-family base', 'auto sales and repair along Federal Highway'],
    note: 'Pick the city you want to own first. One business per category per city under Market Lock; a corridor this long is several territories, not one.',
  },
  {
    slug: 'a1a',
    market: 'FL',
    route: 'A1A',
    name: 'A1A, the beach road',
    tagline: 'Deerfield Beach to Hallandale Beach along the ocean: hospitality, marine, and the premium home-services market.',
    read: [
      'A1A is the ocean side of Broward: beach hotels and condos, the Lighthouse Point and Pompano marinas, Fort Lauderdale beach and the Las Olas approach, Hollywood\'s Broadwalk, and the towers of Hallandale. Businesses here serve visitors in season and a high-value resident base all year, and the resident side is where the repeat revenue is.',
      'Premium customers choose on polish and response. A home-service, marine, or wellness business that looks and answers like the premium service it is wins A1A clients who pay more and refer more.',
    ],
    businesses: ['hospitality, dining, and private clubs', 'marine services, dockage, and yacht management', 'premium home services and estate maintenance', 'wellness, aesthetic, and concierge medical', 'real estate and property management', 'water sports and rentals'],
    note: 'A1A businesses are judged on their first sixty seconds. The system here is built for response, reviews, and the kind of proof that convinces a condo board.',
  },
  {
    slug: 'sawgrass-expressway',
    market: 'FL',
    route: 'Sawgrass Expwy',
    name: 'The Sawgrass Expressway',
    tagline: 'Deerfield Beach around to Weston through Coconut Creek, Coral Springs, Tamarac, and Sunrise: the family suburbs.',
    read: [
      'The Sawgrass arcs around western Broward and strings together its planned family suburbs: Coconut Creek, Coral Springs, Tamarac, Sunrise, and Weston, with Parkland just beyond. These are HOA neighborhoods, A-rated schools, and the medical, childcare, tutoring, and home-service businesses that a large single-family base needs every year.',
      'Western Broward households search first and call three. The practice or company that answers first and shows a profile full of recent reviews gets the appointment; this corridor rewards the fundamentals done relentlessly.',
    ],
    businesses: ['pediatric, dental, and family medical practices', 'childcare, tutoring, and youth sports', 'home services for a large single-family and HOA base', 'fitness studios and wellness', 'restaurants and quick service at the plazas', 'veterinary and pet services'],
    note: 'Family categories lock fast here because the demand is steady and the owners are organized. Check the board for your city before a competitor does.',
  },
  {
    slug: 'university-drive',
    market: 'FL',
    route: 'University Dr',
    name: 'University Drive',
    tagline: 'Parkland to Miramar, north to south through the middle of Broward: the retail-and-services artery.',
    read: [
      'University Drive runs the length of the county through Coral Springs, Tamarac, Lauderhill, Plantation, Davie, Cooper City, Pembroke Pines, and Miramar. It is plaza after plaza: grocery anchors, medical offices, restaurants, salons, fitness, and the services of a dense suburban population, with the Nova Southeastern cluster in Davie and the Pembroke Pines retail core along the way.',
      'Plaza businesses compete with the plaza across the street. The difference is rarely price; it is who gets found, who answers, and who has the reviews when the customer is sitting in the parking lot deciding.',
    ],
    businesses: ['medical, dental, and urgent care', 'restaurants, cafes, and quick service', 'salons, spas, and personal care', 'fitness and martial arts studios', 'tutoring, music, and youth programs', 'auto services and tires'],
    note: 'On University Drive, the Google Business Profile is the storefront. The system starts there, then the site, then the response.',
  },
  {
    slug: 'us-441',
    market: 'FL',
    route: 'US-441 / SR-7',
    name: 'US-441 and State Road 7',
    tagline: 'Coconut Creek to Miramar through Margate, North Lauderdale, Lauderdale Lakes, Plantation, Davie, and Hollywood: the working corridor.',
    read: [
      'State Road 7 is Broward\'s working road: auto sales and repair, building supply, contractors, light industrial, warehouse retail, and the restaurants and services of the dense neighborhoods on either side. It is less polished than University Drive and busier per mile, and the businesses on it are the kind that run on volume and reputation.',
      'A trade or auto business on 441 wins by being the one that picks up. Missed calls here are jobs handed to the shop next door; a sixty-second response and a same-day quote are the whole competitive advantage.',
    ],
    businesses: ['auto sales, repair, body, and tire shops', 'contractors and building trades', 'light industrial, warehouse, and distribution', 'restaurants and quick service', 'home services for the older housing stock', 'medical and dental practices'],
    note: 'Trades and auto lock first on 441. The categories are open in most cities today; they will not be for long.',
  },
  {
    slug: 'i-595',
    market: 'FL',
    route: 'I-595 / SR-84',
    name: 'I-595 and State Road 84',
    tagline: 'Fort Lauderdale to Weston through Plantation, Davie, and Sunrise: the office, logistics, and airport corridor.',
    read: [
      'I-595 connects the airport and port to the western suburbs, and State Road 84 beside it carries the industrial and logistics base that serves both. Plantation\'s office parks, Davie\'s distribution and equestrian mix, Sunrise\'s corporate campuses, and Weston\'s professional offices sit along it.',
      'Businesses here sell to other businesses as often as to households: IT and office services, logistics, fleet, and the professional firms in the parks. Structured data, a complete profile, and fast response matter because the buyer is a procurement decision, not an impulse.',
    ],
    businesses: ['logistics, distribution, and fleet services', 'corporate office vendors and IT services', 'professional and financial firms in the parks', 'medical practices near the hospital clusters', 'restaurants and lunch trade', 'equestrian and agricultural services in Davie'],
    note: 'B2B service businesses on this corridor benefit most from answer-engine optimization: the assistant a facilities manager asks should name you.',
  },
  {
    slug: 'i-75',
    market: 'FL',
    route: 'I-75',
    name: 'I-75 through southwest Broward',
    tagline: 'Weston, Pembroke Pines, and Miramar: the newest, largest suburban base in the county.',
    read: [
      'The I-75 corridor is southwest Broward\'s growth engine: Weston\'s planned community and medical cluster, Pembroke Pines\' enormous residential and retail base, and Miramar\'s mix of corporate campuses and new neighborhoods. The households are young, numerous, and busy, and they buy services the way they buy everything else, on the phone, fast, by reviews.',
      'Volume markets reward systems. A pediatric practice, a home-service company, or a tutoring center that captures every lead and asks for every review compounds here faster than in any older part of the county.',
    ],
    businesses: ['pediatric, family, and specialty medical', 'home services for new single-family neighborhoods', 'childcare, tutoring, and youth sports', 'restaurants and quick service', 'fitness and wellness', 'corporate office vendors in Miramar'],
    note: 'Three large cities, twelve categories each. The first operator in a family category to lock Pembroke Pines holds the biggest residential base in Broward.',
  },
  {
    slug: 'oakland-park-boulevard',
    market: 'FL',
    route: 'Oakland Park Blvd',
    name: 'Oakland Park Boulevard',
    tagline: 'Sunrise to the beach through Lauderhill, Lauderdale Lakes, Oakland Park, Wilton Manors, and Fort Lauderdale.',
    read: [
      'Oakland Park Boulevard crosses central Broward east to west: Sunrise\'s retail core near the arena and Sawgrass Mills, Lauderhill and Lauderdale Lakes\' dense neighborhoods, Oakland Park\'s culinary district and small-industrial pockets, Wilton Manors\' independent retail, and Fort Lauderdale\'s approach to the beach. It is one of the busiest surface roads in the county and a neighborhood road for most of its length.',
      'Neighborhood businesses here win on local reputation and response. Reviews are the referral; the shop with 300 of them and a phone that gets answered beats the one with 30, every week.',
    ],
    businesses: ['restaurants, bakeries, and cafes', 'salons, barbers, and personal care', 'auto repair and services', 'home services for a mixed housing stock', 'medical, dental, and pharmacies', 'small retail and specialty shops'],
    note: 'Review velocity is market share on Oakland Park Boulevard. The Proof Engine is the first thing we switch on.',
  },

  // ---------------------------------------------------------------- Palm Beach County, FL
  {
    slug: 'i-95-us-1-palm-beach',
    market: 'PB',
    route: 'I-95 / US-1',
    name: 'I-95 and US-1 through Palm Beach County',
    tagline: 'Boca Raton to Jupiter along the coast: the county\'s professional, medical, and downtown corridor.',
    read: [
      'The interstate and Federal Highway carry Palm Beach County\'s coastal cities in a line: Boca Raton\'s Glades Road office corridor and Mizner Park, Delray\'s Atlantic Avenue, Boynton\'s marina and downtown, Lake Worth Beach\'s independent downtown, West Palm\'s Clematis Street and the fastest-growing office market in the country, Palm Beach Gardens\' PGA Boulevard, and Jupiter\'s inlet. It is where the professional, medical, and hospitality economies of the county live.',
      'Expectations are highest here. Customers choose on polish and response, and a business that answers in seconds, shows specific proof, and is the one the assistant names owns a category worth more per client than almost anywhere in Florida.',
    ],
    businesses: ['wealth management, law, and professional services', 'medical, dental, and aesthetic practices', 'hospitality, dining, and private clubs', 'luxury home services and estate maintenance', 'corporate office vendors and IT services', 'marine and yacht services at the inlets'],
    note: 'Boca Raton is the flagship of the Palm Beach practice and the first territory we expect to lock on this corridor. Professional and medical categories go first.',
  },
  {
    slug: 'floridas-turnpike',
    market: 'PB',
    route: "Florida's Turnpike",
    name: "Florida's Turnpike through Palm Beach County",
    tagline: 'The inland spine from west Boca to Jupiter, with Wellington\'s equestrian country off the Southern Boulevard exit.',
    read: [
      'The Turnpike runs the county\'s inland side: west Boca\'s suburban base, west Delray and Boynton\'s large HOA communities, the Wellington and Royal Palm exits, West Palm\'s western neighborhoods, and north to Palm Beach Gardens and Jupiter. These are the households west of I-95 that make everyday service decisions by the thousand.',
      'Inland Palm Beach is practical: trades, family practices, auto, and the home services of large single-family communities. The business that answers first and has recent reviews beats the one with the bigger sign.',
    ],
    businesses: ['home services for large HOA and single-family communities', 'pediatric, dental, and family practices', 'auto repair and services', 'equine, veterinary, and agricultural services near Wellington', 'restaurants and quick service at the exits', 'fitness and youth programs'],
    note: 'West of I-95 the categories are mostly open and the demand is steady. A trades or family-practice business can lock its city here for the price of one good month.',
  },
  {
    slug: 'southern-boulevard',
    market: 'PB',
    route: 'Southern Blvd (SR-80)',
    name: 'Southern Boulevard, State Road 80',
    tagline: 'West Palm Beach to Wellington: the road to the equestrian preserve.',
    read: [
      'Southern Boulevard runs from the Palm Beach bridges through West Palm Beach, past the airport and the Turnpike, into Wellington and the equestrian preserve beyond. It is the service road for the winter season: barns, trailers, veterinary care, feed, fencing, and the households that follow the horses in from November to April.',
      'Seasonal demand with high ticket sizes rewards the business that is ready in October: a complete profile, a fast phone, and the proof that it has done this work before.',
    ],
    businesses: ['equine, veterinary, and farrier services', 'barn, fencing, and large-lot landscape contractors', 'trailer, truck, and equipment services', 'premium home services in Wellington', 'restaurants and hospitality for the season', 'medical and family practices'],
    note: 'Wellington\'s equestrian niche is a category most competitors never notice. A service business that speaks its language and answers on a Saturday owns it.',
  },
  {
    slug: 'military-trail',
    market: 'PB',
    route: 'Military Trail',
    name: 'Military Trail',
    tagline: 'Boca Raton to Palm Beach Gardens, parallel to I-95: the plaza and medical artery.',
    read: [
      'Military Trail runs the county north to south a mile or two inland from the interstate, through Boca, Delray, Boynton, Lake Worth Beach, West Palm Beach, and Palm Beach Gardens. It is plazas, medical office buildings, auto dealers, and the services of the neighborhoods on both sides, with the hospital clusters of Boca and Palm Beach Gardens anchoring the ends.',
      'Plaza and medical businesses on Military Trail compete with the next light. Being found, answering first, and having the reviews when the patient or customer is deciding is the whole game.',
    ],
    businesses: ['medical, orthopedic, and specialty practices', 'dental and aesthetic practices', 'restaurants, cafes, and quick service', 'auto sales and services', 'fitness and wellness', 'salons and personal care'],
    note: 'Medical categories on Military Trail are the most valuable per client in the Palm Beach practice. Lock the city before the practice down the road does.',
  },
  {
    slug: 'sr-7-441-palm-beach',
    market: 'PB',
    route: 'SR-7 (441)',
    name: 'State Road 7 through south Palm Beach County',
    tagline: 'West Boca to Wellington along 441: the western suburbs\' main street.',
    read: [
      'State Road 7 is the western edge of the developed county, running from west Boca Raton north past the Delray and Boynton suburbs to Wellington. The communities along it are large, gated, and growing, and the plazas serve them with grocery anchors, medical, restaurants, and the home services every HOA household needs.',
      'Suburban households here search first and expect an answer now. A business with a complete profile, fast response, and recent reviews converts the search; the one without them pays for ads to make up the difference.',
    ],
    businesses: ['home services for gated and HOA communities', 'pediatric, dental, and family practices', 'restaurants and quick service at the plazas', 'fitness, tutoring, and youth programs', 'veterinary and pet services', 'auto services'],
    note: 'Home-service categories in west Boca and Wellington lock fast because the owners here are organized and the demand never stops. The board shows what is open.',
  },
];

const corridorLists: Record<Market, Corridor[]> = { MA: CORRIDORS, FL: BROWARD_CORRIDORS, PB: PALM_BEACH_CORRIDORS };

/** The geometry record from town-geo for a guide (places in order along the route). */
export const corridorGeometry = (g: CorridorGuide): Corridor | undefined => corridorLists[g.market].find((c) => c.route === g.route);

export const getCorridorGuide = (slug: string) => CORRIDOR_GUIDES.find((g) => g.slug === slug);

/** Guides that pass through a place, in any market. */
export const corridorsThrough = (market: Market, placeSlug: string): CorridorGuide[] =>
  CORRIDOR_GUIDES.filter((g) => g.market === market && (corridorGeometry(g)?.towns || []).includes(placeSlug));
