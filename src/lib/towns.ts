/**
 * Town data for the South Shore service-area pages.
 * Each town gets genuinely unique copy (propertyMix / businessMix / angle) —
 * these pages win because they read like they were written by someone who
 * works these corridors, not generated. Add a town = add an entry.
 */
export interface Town {
  slug: string;
  name: string;
  county: string;
  position: string; // one-line identity used in hero
  corridors: string[]; // named routes / commercial districts
  propertyMix: string; // CRE market paragraph — unique per town
  businessMix: string; // business/AI paragraph — unique per town
  angle: string; // ICS operator take — unique per town
  neighbors: string[]; // slugs for internal linking
}

export const TOWNS: Town[] = [
  {
    slug: 'brockton',
    name: 'Brockton',
    county: 'Plymouth',
    position: 'The commercial center of the region — and where ICS is headquartered.',
    corridors: ['Route 24', 'Route 28 (Main St corridor)', 'Route 27 / Westgate area', 'Route 123', 'Downtown / Montello / Campello'],
    propertyMix:
      "Brockton carries the deepest commercial inventory on this side of the South Shore: downtown mixed-use blocks, freestanding retail along the Route 28 spine, auto-related and light-industrial buildings threaded through Montello and Campello, and owner-user trades buildings on nearly every secondary street. Sub-$3M product turns over constantly here — and much of it changes hands before it's ever marketed properly, because national firms don't work these blocks.",
    businessMix:
      'The business base is exactly the profile that gets ignored by big agencies: contractors, auto shops, restaurants, salons, medical and professional offices serving a city of roughly 100,000. Most run on word-of-mouth with a website that hasn\'t changed since the last ownership transition — which means the first operator in any trade to take digital seriously here takes a disproportionate share.',
    angle:
      "This is our home market. We know which corridors flood in March, which blocks the city is investing in, and who's quietly looking to sell. That doesn't come from a database.",
    neighbors: ['abington', 'whitman', 'west-bridgewater', 'easton', 'stoughton'],
  },
  {
    slug: 'abington',
    name: 'Abington',
    county: 'Plymouth',
    position: 'A dense small-business town on the Route 18 and 123 corridors.',
    corridors: ['Route 18 (Bedford St)', 'Route 123', 'Route 139', 'North Abington center'],
    propertyMix:
      'Abington\'s commercial stock runs small and practical: strip retail and service buildings along Bedford Street, converted houses holding professional offices near the centers, and scattered contractor yards and flex space off the main roads. Inventory is tight — well-located Route 18 frontage rarely lasts, and owner-users who wait for listings to hit the portals mostly see what everyone else passed on.',
    businessMix:
      'The town supports a strong trades-and-services economy — plumbers, electricians, landscapers, small medical and dental practices — serving both local residents and the commuter flow toward the Route 3 corridor. Few of these businesses have systematic lead capture or review programs, so the digital bar to clear here is low and the upside is fast.',
    angle:
      'Abington is a drive-by market: Route 18 visibility does real work. Pair the right frontage with a site that actually converts and you own the town in your trade.',
    neighbors: ['whitman', 'brockton'],
  },
  {
    slug: 'whitman',
    name: 'Whitman',
    county: 'Plymouth',
    position: 'A compact downtown market where local reputation decides who wins.',
    corridors: ['Route 18', 'Route 27', 'Whitman center / South Ave'],
    propertyMix:
      'Whitman\'s commercial core is its walkable downtown — small mixed-use buildings with storefronts below and apartments above — plus service and auto-related properties strung along Routes 18 and 27. Buildings here are held for decades and trade quietly; the best acquisitions come from knowing owners before they decide to sell, not from watching listing feeds.',
    businessMix:
      'Business here is deeply local: family restaurants, barbershops and salons, trades operators, and small professional offices whose customers live within ten minutes. That makes Google reviews and local search the whole ballgame — the Whitman business with 150 reviews and same-day response simply beats the one with 12 reviews, every week.',
    angle:
      'In a town this size, review velocity is market share. Automate the asks, answer every lead in a minute, and you become the default answer in your category.',
    neighbors: ['abington', 'east-bridgewater', 'brockton'],
  },
  {
    slug: 'bridgewater',
    name: 'Bridgewater',
    county: 'Plymouth',
    position: 'A university town with serious industrial and flex inventory off Route 24.',
    corridors: ['Route 18 / Campus Plaza area', 'Route 24', 'Route 104', 'Route 106', 'Elm Street industrial area'],
    propertyMix:
      'Bridgewater mixes three distinct markets: student-driven retail and food service around the university and Campus Plaza, a genuine industrial and flex base in the parks off Elm Street and the Route 24 interchange, and village-center professional space. The flex product is the prize — clear-span buildings with yards move fast because every growing contractor within twenty minutes wants one.',
    businessMix:
      'Between the university population and the commuter base, Bridgewater businesses see more search volume than most towns their size — and the industrial-park tenants (contractors, fabricators, distributors) are classic high-ticket operators running on spreadsheets and voicemail. Both profiles convert quickly once real lead systems are installed.',
    angle:
      'If you\'re a trade business hunting for a building with a yard near Route 24, tell us before you scroll listings — that inventory moves through relationships, and we hunt off-market.',
    neighbors: ['west-bridgewater', 'east-bridgewater', 'middleborough'],
  },
  {
    slug: 'west-bridgewater',
    name: 'West Bridgewater',
    county: 'Plymouth',
    position: 'The crossroads market — Routes 24, 28 and 106 meet here, and the trades know it.',
    corridors: ['Route 28', 'Route 106', 'Route 24 interchange', 'Manley Street industrial corridor'],
    propertyMix:
      'For its size, West Bridgewater punches far above its weight commercially: the Manley Street corridor and the land around the Route 24 interchange hold a dense run of industrial, contractor, and distribution properties, while Route 28 carries retail and service frontage. This is one of the most requested submarkets we see for owner-user trades buildings — highway access in three directions does that.',
    businessMix:
      'The town\'s business mix skews commercial-industrial: equipment dealers, building suppliers, contractors, and the service businesses that feed off that daytime traffic. These are exactly the operators whose quoting and follow-up processes leak the most revenue — and who see the fastest payback from automation.',
    angle:
      'We\'ve worked this corridor as operators, not just brokers. When a Manley Street property whispers, we hear it early.',
    neighbors: ['brockton', 'bridgewater', 'east-bridgewater', 'easton'],
  },
  {
    slug: 'east-bridgewater',
    name: 'East Bridgewater',
    county: 'Plymouth',
    position: 'A steady small-business town along Routes 18 and 106.',
    corridors: ['Route 18 (Bedford St)', 'Route 106', 'East Bridgewater center'],
    propertyMix:
      'East Bridgewater\'s commercial property runs along Route 18 and clusters near the town center: small retail plazas, standalone service buildings, and a scattering of light-industrial and contractor properties on the side roads. It\'s a hold-forever town — owners are patient, deals are relationship-driven, and pricing rewards buyers who arrive prepared with financing framed.',
    businessMix:
      'The business community is small-business to the core: trades, childcare, food service, fitness, and professional offices serving families across the tri-town area. Almost none of them have structured follow-up on leads or reviews, which means modest, well-built systems produce outsized local dominance here.',
    angle:
      'Quiet markets reward patient buyers and loud digital presence. We help with both sides of that equation.',
    neighbors: ['whitman', 'bridgewater', 'west-bridgewater'],
  },
  {
    slug: 'stoughton',
    name: 'Stoughton',
    county: 'Norfolk',
    position: 'A regional retail magnet on the Route 138/139 corridors.',
    corridors: ['Route 138', 'Route 139', 'Route 27', 'Route 24 access', 'Stoughton center'],
    propertyMix:
      'Stoughton\'s Route 138 corridor is one of the strongest retail draws south of Boston, anchored by destination stores that pull shoppers from a wide radius — and that gravity supports a deep bench of surrounding retail, restaurant, and service properties. Off the corridor, the town holds solid flex and light-industrial stock with quick Route 24 access. Sellers here consistently leave money on the table with weak marketing packages relative to what this traffic justifies.',
    businessMix:
      'High traffic means high competition: Stoughton businesses fight for attention against regional chains in a way smaller towns don\'t. The local operators who win pair the corridor\'s drive-by volume with digital systems that capture and convert — because here, an unanswered lead doesn\'t wait, it just drives to the next option on the strip.',
    angle:
      'On a corridor with this much traffic, marketing isn\'t decoration — it\'s the multiple on your building\'s value when you sell. We price listings like that matters, because it does.',
    neighbors: ['easton', 'brockton'],
  },
  {
    slug: 'easton',
    name: 'Easton',
    county: 'Bristol',
    position: 'A polished suburban market from Five Corners to North Easton village.',
    corridors: ['Route 138', 'Route 106', 'Route 123', 'Five Corners', 'North Easton village'],
    propertyMix:
      'Easton\'s commercial map runs from the Five Corners retail cluster through Route 138\'s plazas to the historic stone-and-brick character of North Easton village. Property here trades at a premium relative to neighboring towns — buyers are paying for demographics and curb appeal — which makes disciplined underwriting and honest broker guidance on value the difference between a good buy and an expensive lesson.',
    businessMix:
      'The business mix skews professional and consumer-service: medical, dental, wellness, boutique fitness and food, plus the college community around Stonehill. These are high-ticket-relationship businesses where a polished digital presence isn\'t optional — Easton customers research before they call, and they judge the website like they judge the waiting room.',
    angle:
      'Easton clients expect polish. Your building, your brand, and your booking flow should all pass the same inspection — we build all three to that standard.',
    neighbors: ['stoughton', 'brockton', 'west-bridgewater'],
  },
  {
    slug: 'middleborough',
    name: 'Middleborough',
    county: 'Plymouth',
    position: 'The I-495 gateway — distribution, trades, and a genuine downtown.',
    corridors: ['I-495 interchanges', 'Route 44', 'Route 28', 'Route 18', 'Route 105', 'Middleborough center'],
    propertyMix:
      'Middleborough offers what the inner South Shore can\'t: land, larger industrial footprints, and I-495/Route 44 highway access that makes it a natural home for distribution, contracting, and equipment-heavy operations. The historic downtown adds a second market of mixed-use and storefront property. For owner-users priced out of the Route 24 belt, this is where the math starts working again.',
    businessMix:
      'The trade area is big and spread out, which makes digital reach matter more here than anywhere else we serve — your service radius is measured in towns, not neighborhoods. Contractors and agricultural-adjacent businesses (this is cranberry country) with real booking and quoting systems can profitably serve a 30-minute circle that word-of-mouth alone will never cover.',
    angle:
      'When clients outgrow their yard in Brockton or Bridgewater, Middleborough is usually the answer we underwrite first. Land plus highway access is the growth formula.',
    neighbors: ['bridgewater', 'plympton'],
  },
  {
    slug: 'plympton',
    name: 'Plympton',
    county: 'Plymouth',
    position: 'Small town, serious logistics — Route 106 with major distribution next door.',
    corridors: ['Route 106', 'Route 58', 'Winnetuxet corridor'],
    propertyMix:
      'Plympton is the quietest market we cover, and that\'s its advantage: rural-zoned land, contractor yards, and the occasional flex or agricultural-commercial property, minutes from the major distribution activity on the Route 106 corridor. Buyers wanting acreage for equipment, storage, or a build-to-suit at sane pricing should have Plympton on their list before the rest of the market finds it.',
    businessMix:
      'With a small local population, every Plympton business lives on regional reach: trades and specialty operators here serve Plymouth, Kingston, Middleborough and beyond. That makes search visibility across the whole radius — not just the town line — the entire marketing problem, and it\'s a very solvable one.',
    angle:
      'Nobody is fighting over Plympton yet. For a trades operator who needs a yard and works a 25-mile radius, that\'s precisely the point.',
    neighbors: ['middleborough'],
  },
];

export const getTown = (slug: string) => TOWNS.find((t) => t.slug === slug);
