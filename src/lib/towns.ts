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
    neighbors: ['randolph', 'holbrook', 'abington', 'whitman', 'west-bridgewater', 'easton', 'stoughton', 'avon'],
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
    neighbors: ['holbrook', 'weymouth', 'whitman', 'brockton', 'rockland'],
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
    neighbors: ['abington', 'east-bridgewater', 'brockton', 'hanson', 'rockland'],
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
    neighbors: ['west-bridgewater', 'east-bridgewater', 'middleborough', 'halifax'],
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
    neighbors: ['whitman', 'bridgewater', 'west-bridgewater', 'hanson'],
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
    neighbors: ['randolph', 'easton', 'brockton', 'avon'],
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
    neighbors: ['bridgewater', 'plympton', 'halifax'],
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
    neighbors: ['middleborough', 'halifax', 'kingston', 'plymouth'],
  },
  {
    slug: 'plymouth',
    name: 'Plymouth',
    county: 'Plymouth',
    position: 'The biggest stage on the South Shore — waterfront, Route 3 retail, and a trade area measured in counties.',
    corridors: ['Route 3 exits / Colony Place area', 'Route 44', 'Route 3A (Court St / Main St waterfront)', 'Industrial parks off Route 3', 'The Pinehills'],
    propertyMix:
      "Plymouth runs several distinct commercial markets at once: the downtown-waterfront district where tourism traffic supports restaurant, retail, and hospitality property; the Route 3 exit retail concentrated around Colony Place; industrial-park stock off the highway for contractors and light manufacturing; and steady professional and medical demand following the town's growth. It's the largest land area in the state — which means the inventory range here, from storefront to acreage, is wider than anywhere else we work.",
    businessMix:
      "Plymouth businesses play to two audiences at once: a large year-round population and a seasonal tourist wave that rewards whoever owns the searches that visitors make — 'best seafood near Plymouth waterfront' is a revenue stream with a ranking. Away from the waterfront, the trades, medical, and service operators here compete across a huge radius, where systematic lead capture and review velocity decide who grows.",
    angle:
      "Big market, big noise. In Plymouth you don't win by being present — you win by being the answer to specific searches. That's an engineering problem, and it's our favorite kind.",
    neighbors: ['kingston', 'plympton'],
  },
  {
    slug: 'kingston',
    name: 'Kingston',
    county: 'Plymouth',
    position: 'Route 3 retail gravity, a commuter-rail anchor, and a mall district reinventing itself.',
    corridors: ['Kingston Collection / Route 3 exit area', 'Route 3A', 'Route 106', 'Route 53', 'Kingston commuter rail'],
    propertyMix:
      "Kingston's commercial identity centers on the retail district around the Kingston Collection and the Route 3 interchange — a corridor in active reinvention as big-box retail reshapes, which is exactly when well-advised buyers and tenants find value the market hasn't repriced yet. Route 3A and 106 add service retail, auto, and small plaza stock, and the commuter-rail terminus keeps daily traffic flowing through town.",
    businessMix:
      'The retail and service businesses here draw from Plymouth, Duxbury, and the whole mid-South Shore — a customer base that researches online before driving. For restaurants, fitness, medical, and home-service operators, Kingston rewards polished digital presence the way its anchor district rewards good signage: visibly and immediately.',
    angle:
      "Corridors in transition are where the deals live. Kingston's retail district is repricing in real time — we track it, and our clients hear about openings before the listing portals do.",
    neighbors: ['duxbury', 'pembroke', 'plymouth', 'plympton', 'halifax'],
  },
  {
    slug: 'halifax',
    name: 'Halifax',
    county: 'Plymouth',
    position: 'The Route 106 crossroads — small-town inventory serving a regional trade radius.',
    corridors: ['Route 106', 'Route 58', 'Route 36', 'Monponsett area'],
    propertyMix:
      "Halifax's commercial property clusters along Route 106 as it crosses town — small plazas, standalone service and auto buildings, and contractor properties with the kind of yard space the inner towns can't offer at the price. Like its neighbors on the 106 corridor, it trades quietly and infrequently: the buildings that matter change hands through relationships, usually before a sign ever goes up.",
    businessMix:
      "With a small local population, Halifax businesses live on regional reach — the trades, auto, and specialty operators here work Hanson, Bridgewater, Plympton, and beyond. That makes the marketing problem identical to the one we solve best: owning search across a multi-town radius, answering every lead instantly, and letting review velocity do the rest.",
    angle:
      'The 106 corridor is our home turf — we work it from West Bridgewater to Kingston. Halifax is its quiet middle, and quiet is where patient buyers win.',
    neighbors: ['pembroke', 'plympton', 'hanson', 'bridgewater', 'kingston'],
  },
  {
    slug: 'hanson',
    name: 'Hanson',
    county: 'Plymouth',
    position: 'A commuter-rail town of loyal customers and long-held buildings.',
    corridors: ['Route 27 (Main St)', 'Route 58', 'Route 14', 'Hanson commuter rail area'],
    propertyMix:
      "Hanson's commercial stock is modest and tightly held: small plazas and standalone buildings along Main Street and Route 58, service and contractor properties on the side roads, and the occasional mixed-use building near the rail stop. Owners here hold for decades — acquisition is a relationship game, and the buyers who win are the ones already in the conversation when a retirement or estate decision finally happens.",
    businessMix:
      "Business in Hanson is neighbor-to-neighbor: trades, auto, food service, childcare, and wellness operators whose customers pass them daily on Route 27. Loyalty is real here, but it's earned online first now — the Hanson operator with same-day response and a steady review stream quietly takes share from every competitor still running on a Facebook page.",
    angle:
      'Small-town loyalty compounds like interest — but only after the first click goes your way. We make sure it does.',
    neighbors: ['hanover', 'pembroke', 'whitman', 'halifax', 'east-bridgewater'],
  },
  {
    slug: 'rockland',
    name: 'Rockland',
    county: 'Plymouth',
    position: 'A working downtown and dense industrial stock, minutes from the money towns.',
    corridors: ['Union Street downtown', 'Route 123', 'Route 139', 'Route 228 / Hingham line', 'Route 3 access via Route 18'],
    propertyMix:
      "Rockland pairs a genuine, walkable Union Street downtown — storefronts, mixed-use, food and service — with one of the denser benches of industrial and flex property on this side of Route 3, a legacy of its shoe-manufacturing era. That combination keeps attracting operators and investors priced out of Hingham and Norwell: the same highway access and labor pool, a meaningfully lower basis.",
    businessMix:
      "The strategic fact about Rockland: its businesses sit minutes from some of the strongest household spending on the South Shore. Trades, auto, fitness, and food operators based here routinely serve Hingham, Norwell, and Hanover customers — if those customers can find them. Winning the searches across that line is worth multiples of winning the town itself.",
    angle:
      "Operate from Rockland, sell to the gold coast. The rent gap pays for the marketing that closes the distance — that's arbitrage, and we engineer it.",
    neighbors: ['holbrook', 'hanover', 'norwell', 'hingham', 'abington', 'whitman', 'hanson'],
  },
  {
    slug: 'avon',
    name: 'Avon',
    county: 'Norfolk',
    position: 'Tiny town, massive daytime economy — the industrial park does the talking.',
    corridors: ['Avon Industrial Park (Bodwell / Murphy Dr area)', 'Harrison Blvd', 'Route 24 access', 'Route 28 (Main St)'],
    propertyMix:
      "Avon is the South Shore's purest industrial play: one of the region's most concentrated industrial parks packed with distribution, manufacturing, and contractor operations, all feeding off immediate Route 24 access on Brockton's shoulder. Industrial and flex space here is chronically scarce relative to demand — when a building in the park comes available, the buyers who were already positioned win, and everyone else reads about it.",
    businessMix:
      "The daytime economy dwarfs the residential one: thousands of workers cycle through the park, supporting the food, fuel, and service businesses along Route 28. For B2B operators in the park itself — suppliers, fabricators, logistics — visibility isn't about foot traffic at all; it's about being the answer when a buyer three towns away searches for exactly what you do.",
    angle:
      "We're headquartered ten minutes away and know the park's turnover rhythms. Industrial buyers: tell us your spec before you need it — that's how Avon deals get done.",
    neighbors: ['brockton', 'stoughton', 'randolph', 'holbrook'],
  },
  {
    slug: 'randolph',
    name: 'Randolph',
    county: 'Norfolk',
    position: 'Route 24 and Route 28 in one town — a working commercial crossroads with one of the most diverse business bases on the South Shore.',
    corridors: ['Route 28 (North Main St)', 'Route 139 / Mazzeo Dr big-box and retail', 'Route 24 access', 'Pacella Park / Teed Dr industrial', 'Crawford Square'],
    propertyMix:
      "Randolph's commercial stock splits cleanly by corridor: Route 28 is the long retail-and-auto spine — storefronts, service businesses, restaurants, and repair shops on steady drive-by — while the Route 139 pocket by the Route 24 interchange holds the big-box and larger-format retail. Behind them sit light-industrial and flex pockets around Pacella Park and Teed Drive, within minutes of the highway. Pricing runs below Braintree next door for comparable frontage, which is exactly why owner-users who were priced out of Route 128 land here.",
    businessMix:
      "Randolph is one of the most diverse towns in the state, and its business base shows it: a dense layer of immigrant-owned restaurants, markets, salons, and service firms that often run on word-of-mouth and under-invest in search. That is a wide-open lane — the first operator in each category to own its Google Business Profile and answer the phone in under a minute pulls demand from Route 28 traffic that was already driving past.",
    angle:
      "Randolph rewards the basics done relentlessly. Ten minutes from our office, we can walk a Route 28 storefront and have the lead system scoped the same afternoon.",
    neighbors: ['avon', 'stoughton', 'holbrook', 'braintree'],
  },
  {
    slug: 'holbrook',
    name: 'Holbrook',
    county: 'Norfolk',
    position: "Small town on Brockton's shoulder — Route 37 through the center, and value that the bigger neighbors can't offer.",
    corridors: ['Route 37 (South Franklin St / North Franklin St)', 'Route 139 (Union St / Plymouth St)', 'Holbrook Center', 'Industrial pockets near the Route 37 rail line'],
    propertyMix:
      "Holbrook is a compact market: a center along Route 37 with small storefront and mixed-use buildings, a handful of light-industrial and contractor-yard parcels near the rail line, and residential-adjacent commercial along Route 139. Inventory is thin and turnover is slow, which cuts both ways — buyers have to be patient and positioned, and sellers who market properly to the right radius get attention a quiet listing never would.",
    businessMix:
      "Holbrook businesses serve the town and a ring of neighbors — Brockton, Abington, Randolph, Weymouth — which means the real trade area is several times the population. The trades and home-service operators based here win on response time and reviews across that whole ring, not on the local sign. A quoting engine and a follow-up system turn a one-town shop into a five-town one.",
    angle:
      "We treat Holbrook as part of our home turf — it's a few minutes from Brockton. Small-town inventory needs a bigger-market marketing effort, and that's the part we bring.",
    neighbors: ['brockton', 'avon', 'randolph', 'abington', 'rockland', 'weymouth'],
  },
  {
    slug: 'weymouth',
    name: 'Weymouth',
    county: 'Norfolk',
    position: 'One of the biggest markets on the South Shore — Route 18, Route 3A, South Shore Hospital, and a generational redevelopment at Union Point.',
    corridors: ['Route 18 (Main St) — South Weymouth', 'Route 3A (Bridge St) — North Weymouth', 'Route 53 (Washington St)', 'Columbian Square', 'Jackson Square', 'Union Point (former South Weymouth Naval Air Station)', 'Weymouth Landing'],
    propertyMix:
      "Weymouth runs several commercial markets at once. Route 18 is the workhorse — retail, auto, restaurants, and a dense medical cluster anchored by South Shore Hospital, all on heavy Route 3 commuter traffic. Route 3A carries the northern retail and service strip; Columbian Square and Jackson Square are the village-scale storefront districts; and Union Point is the long-running mixed-use redevelopment of the former naval air station, a story every South Shore investor watches. Across all of it, owner-user demand stays strong and medical and professional space moves fastest.",
    businessMix:
      "Weymouth's population and commuter flow make it a volume market: the question for a local business isn't whether demand exists, it's whether you capture your share of searches before the next operator on Route 18 does. Medical and dental practices here compete on booking convenience; trades compete on response time; restaurants on being the answer to a specific craving. All three are systems problems with measurable fixes.",
    angle:
      "Weymouth is where published pricing earns its keep — a big market with a lot of noise and a lot of agencies selling fog. We'd rather hand you numbers and a 21-day launch.",
    neighbors: ['quincy', 'abington', 'rockland', 'holbrook', 'braintree', 'hingham'],
  },
  {
    slug: 'braintree',
    name: 'Braintree',
    county: 'Norfolk',
    position: "The region's commercial hub — South Shore Plaza, the Braintree Split, and the largest office, hotel, and industrial base south of Boston.",
    corridors: ['South Shore Plaza / Granite St', 'Braintree Split (I-93 / Route 3 / Route 128)', 'Forbes Rd / Wood Rd office and hotel cluster', 'Route 37 (Washington St) and Braintree Five Corners', 'Campanelli Dr / Grossman Dr industrial', 'Quincy Ave / Pearl St'],
    propertyMix:
      "Braintree is the South Shore's commercial capital: the biggest retail concentration in the region around South Shore Plaza and Granite Street, a genuine office and hotel market along Forbes Road and Wood Road at the highway junction, and a deep industrial and flex base on Campanelli Drive and Grossman Drive. The Braintree Split puts the whole thing within minutes of Boston and Route 128, which keeps institutional capital interested and pricing at the top of the South Shore. Sub-$3M owner-user product exists — on Washington Street, Quincy Avenue, and the older industrial pockets — but it moves fast and often off-market.",
    businessMix:
      "In Braintree the competition is regional, not local: a business here is measured against everything within fifteen minutes of the Split. That raises the bar on digital presence — the restaurants, medical practices, and service operators that win are the ones that look and respond like the larger firms they're competing with. The upside is scale: capture the search, and the trade area is enormous.",
    angle:
      "We bring a Brockton operator's cost discipline to a market that's used to Boston pricing. Same institutional-grade marketing on the listing, a fraction of the overhead behind it.",
    neighbors: ['quincy', 'randolph', 'holbrook', 'weymouth'],
  },
  {
    slug: 'hingham',
    name: 'Hingham',
    county: 'Plymouth',
    position: 'The affluent coastal anchor — Derby Street, the Shipyard, Hingham Square, and a customer base that pays for quality and expects to find it online.',
    corridors: ['Derby Street Shops / Route 3 exits', 'Hingham Shipyard (Route 3A)', 'Hingham Square (Main St / South St)', 'Route 3A (Lincoln St / Summer St)', 'Route 53 (Whiting St) / Queen Anne\'s Corner', 'Route 228'],
    propertyMix:
      "Hingham's commercial property is high-value and tightly held: the open-air retail at Derby Street, the mixed-use waterfront district at the Shipyard, the historic storefronts of Hingham Square, and professional and medical office along Route 3A and Route 53. Little of it is cheap and little of it is vacant for long. Owner-users and investors here are buying location and tenant quality, and the diligence — title history, use restrictions, parking — matters more than almost anywhere on the South Shore.",
    businessMix:
      "Hingham customers research before they buy and they expect polish: a practice or service business here with a weak website or slow follow-up is leaving money to competitors who look the part. The good news is that the same quality bar rewards whoever clears it — review velocity and answer-engine visibility carry real weight with an audience that asks their phone for recommendations.",
    angle:
      "Hingham is a market where the intelligence side of our practice earns its place alongside the brokerage — know the building and the counterparty cold before you commit. We do both.",
    neighbors: ['cohasset', 'scituate', 'weymouth', 'norwell', 'rockland'],
  },
  {
    slug: 'hanover',
    name: 'Hanover',
    county: 'Plymouth',
    position: "Route 53's retail spine and the Hanover Crossing redevelopment — the South Shore's busiest commercial strip outside Braintree.",
    corridors: ['Route 53 (Washington St) retail corridor', 'Hanover Crossing (former Hanover Mall, Route 53 / Route 3)', 'Route 139 (Hanover St)', 'Route 3 access', 'Industrial pockets off Route 53 and Columbia Rd', 'Four Corners'],
    propertyMix:
      "Hanover's commercial identity is Route 53: a long, high-traffic corridor of retail, auto, restaurants, and service businesses, re-anchored by the Hanover Crossing redevelopment of the old mall site at the Route 3 interchange. Behind the strip sit contractor and light-industrial parcels that the trades fight over, and Route 139 carries a second, smaller commercial band. For owner-users, Hanover offers highway-adjacent visibility at prices well under the Route 128 markets — which is why the inventory is competitive.",
    businessMix:
      "Route 53 traffic is a gift and a trap: thousands of cars a day, and a dozen competitors in every category within two miles. The businesses that grow here convert drive-by awareness into a search-and-book habit — the auto shop whose quote engine answers at 9pm, the restaurant that owns 'near Hanover Crossing.' Awareness is free on Route 53; conversion is the system.",
    angle:
      "We know the Route 53 rhythm from Hanson and Rockland next door. Retail and auto operators on the strip: your competitor's weak website is your opening, and it's a 21-day fix.",
    neighbors: ['marshfield', 'rockland', 'hanson', 'norwell', 'pembroke'],
  },
  {
    slug: 'norwell',
    name: 'Norwell',
    county: 'Plymouth',
    position: "The quiet office market — Route 3's suburban business parks, the Route 53 corridor it shares with Hanover, and a village center that keeps its character.",
    corridors: ['Accord Park Dr / Longwater Dr / Pond St office parks (Route 3)', 'Route 53 (Washington St)', "Queen Anne's Corner (Route 53 / Route 228)", 'Assinippi (Route 53 / Route 123)', 'Norwell Center (Route 123 / Main St)'],
    propertyMix:
      "Norwell holds one of the South Shore's real suburban office clusters — the business parks off Route 3 around Accord Park Drive, Longwater Drive, and Pond Street, home to professional, medical, and corporate tenants that want highway access without Braintree rents. Along Route 53 the town shares a retail, auto, and service corridor with Hanover, concentrated at Queen Anne's Corner and Assinippi. Norwell Center stays deliberately small-scale. For buyers, the office and medical stock is the story: it's where a practice or firm can own its building at a sensible basis.",
    businessMix:
      "The professional firms and practices in Norwell's parks compete across the whole South Shore for clients who shortlist from a search — which makes answer-engine visibility and a fast, credible website the whole game. On Route 53, the retail and service operators face the same conversion contest as Hanover: traffic is given, capture is earned.",
    angle:
      "If you run a practice or professional firm and you're renting in Norwell's parks, run the lease-versus-buy math with us. Owning the suite is more reachable than most tenants assume.",
    neighbors: ['marshfield', 'scituate', 'hanover', 'hingham', 'rockland'],
  },
  {
    slug: 'pembroke',
    name: 'Pembroke',
    county: 'Plymouth',
    position: 'Route 139 at the Route 3 exit, Route 53 on the Hanover line, and a growing residential base that supports service businesses year-round.',
    corridors: ['Route 139 (Church St) / Route 3 exit — North Pembroke', 'Route 53 (Washington St) near the Hanover line', 'Route 14 (Center St) / Pembroke Center', 'Route 36', 'Route 3 access'],
    propertyMix:
      "Pembroke's commercial pockets follow its highways: the Route 139 band at the Route 3 exit carries retail, medical, and service property on commuter traffic; Route 53 near the Hanover line picks up auto and service uses from the bigger corridor next door; and Pembroke Center is the smaller village district. Contractor yards and small flex parcels are scattered along the routes and are in steady demand from the trades that serve the growing residential base. Pricing sits a notch below Hanover and Hingham, which makes owner-user ownership realistic.",
    businessMix:
      "Pembroke is a residential growth town, and that's the opportunity: new households, every one of them searching for a dentist, an electrician, a landscaper, a restaurant. The operators who become the default answer early keep those customers for years. That's a lead-capture and review-velocity problem — the kind we install.",
    angle:
      "We serve Pembroke from Hanson and Halifax next door. Trades and practices here: the household growth is already happening; the question is whether the searches land on you.",
    neighbors: ['hanover', 'hanson', 'halifax', 'kingston', 'marshfield', 'duxbury'],
  },
  {
    slug: 'quincy',
    name: 'Quincy',
    county: 'Norfolk',
    position: "The South Shore's city — a rebuilt downtown, Marina Bay, Red Line access, and the deepest, most diverse commercial market south of Boston.",
    corridors: ['Quincy Center (Hancock St) redevelopment', 'Marina Bay', 'Route 3A (Southern Artery / Quincy Shore Dr)', 'Wollaston (Beale St / Newport Ave)', 'North Quincy (Hancock St)', 'Crown Colony office park (Route 3 / Burgin Pkwy)', 'I-93 / Route 3 access'],
    propertyMix:
      "Quincy is a different scale from the rest of the South Shore: a city of roughly 100,000 with a downtown that has been rebuilt block by block around Quincy Center station, a waterfront office-and-dining district at Marina Bay, suburban office at Crown Colony by the highway, and dense neighborhood commercial strips through Wollaston and North Quincy. Four Red Line stations and the I-93 / Route 3 junction keep institutional money attentive and pricing at the top of the region. Sub-$3M owner-user product exists in the neighborhood strips and the older industrial pockets along the Southern Artery — it moves fast and is often spoken for before it lists.",
    businessMix:
      "Quincy's business base is as diverse as its population — one of the largest Asian-American communities in Massachusetts runs a dense layer of restaurants, markets, and services alongside the professional and medical firms downtown and the neighborhood trades. Competition here is city-grade: a business is measured against everything a Red Line ride away. The operators that win own their searches, answer in seconds, and look as credible online as the firms with ten times their headcount.",
    angle:
      "We bring published pricing and an operator's cost discipline to a market used to Boston rates. A Quincy storefront or practice gets the same institutional-grade build — at a Brockton firm's overhead.",
    neighbors: ['braintree', 'weymouth'],
  },
  {
    slug: 'marshfield',
    name: 'Marshfield',
    county: 'Plymouth',
    position: 'Route 139 from the highway to the beach — a year-round service economy with a summer coast stacked on top.',
    corridors: ['Route 139 (Plain St / Ocean St) — Route 3 exit to the coast', 'Route 3A', 'Marshfield Center', 'Brant Rock / Ocean Bluff / Green Harbor (seasonal coast)', 'Marshfield Fairgrounds area', 'Route 3 access'],
    propertyMix:
      "Marshfield's commercial property runs along Route 139 from the Route 3 interchange toward the ocean — plazas, standalone service and medical buildings, auto, and restaurants on commuter traffic — with a second band on Route 3A and the small-scale storefronts of Marshfield Center. The coast adds a seasonal layer at Brant Rock and Green Harbor: restaurants, marine services, and rentals whose economics run on three months. Owner-users find realistic entry points on 139 and 3A, and the town's steady residential growth keeps service and medical demand firm year-round.",
    businessMix:
      "Marshfield operators serve two economies: a growing year-round population of households that need the dentist, the electrician, the landscaper, and a summer wave that rewards whoever owns 'near Brant Rock' when the visitors search. Marine and coastal businesses live on the seasonal calendar — storage, winterization, the spring rush — and every one of those is a quote-and-book moment that phone tag loses.",
    angle:
      "Marshfield is where our marine-services playbook and our year-round lead systems meet. Coastal operators: price the season online before it starts, and the summer books itself.",
    neighbors: ['pembroke', 'hanover', 'norwell', 'duxbury', 'scituate'],
  },
  {
    slug: 'duxbury',
    name: 'Duxbury',
    county: 'Plymouth',
    position: 'Affluent, coastal, and deliberately small-scale — Snug Harbor, Hall’s Corner, and a customer base that pays for quality and checks the reviews first.',
    corridors: ['Route 3A (Tremont St)', 'Hall’s Corner (Route 3A / Depot St)', 'Snug Harbor (Washington St waterfront)', 'Route 53 on the Kingston line', 'Route 14 / Route 3 exit', 'Duxbury Beach (seasonal)'],
    propertyMix:
      "Duxbury keeps its commercial footprint intentionally light: the village cluster at Hall's Corner, the waterfront at Snug Harbor, a few professional and medical buildings along Route 3A, and service property toward Route 53 on the Kingston line. Inventory is scarce and tightly held, so transactions are relationship-driven and often off-market. For a practice or a quality service business, owning a Duxbury location is as much about the address as the square footage — and the diligence on use, parking, and historic constraints is where deals are made or lost.",
    businessMix:
      "Duxbury customers research before they buy and expect polish: a weak website or a slow reply reads as a signal here. The upside is a high-value, loyal clientele for the operators who clear the bar — the landscaper, the contractor, the practice that looks and responds like the quality it delivers. Marine services around Snug Harbor and the beach run on the same seasonal quote-and-book calendar as the rest of the coast.",
    angle:
      "Small inventory, high standards. In Duxbury the brokerage and the diligence travel together — know the building cold, then present like the market expects.",
    neighbors: ['kingston', 'pembroke', 'marshfield'],
  },
  {
    slug: 'scituate',
    name: 'Scituate',
    county: 'Plymouth',
    position: 'A working harbor, a commuter-rail terminus, and Route 3A — the coastal town where marine, seasonal, and year-round businesses share the same storefronts.',
    corridors: ['Scituate Harbor (Front St)', 'Route 3A (Chief Justice Cushing Hwy)', 'North Scituate (Gannett Rd)', 'Greenbush (commuter rail terminus)', 'Humarock (seasonal)', 'Route 123'],
    propertyMix:
      "Scituate's commercial life centers on the Harbor — Front Street's restaurants, shops, and marine services on a genuine working waterfront — with a second commercial band along Route 3A and the village node at North Scituate. The Greenbush rail terminus anchors commuter demand at the south end. Inventory is modest and the harbor property in particular rarely trades; when it does, it draws buyers from well beyond the town. Service and medical property on 3A is the realistic entry for owner-users.",
    businessMix:
      "Scituate operators run on a blended calendar: a loyal year-round base plus a summer coast at Humarock and the Harbor. Marine businesses — repair, storage, charters, detailing — live on the seasonal rush and lose it to phone tag; restaurants and shops on Front Street win or lose on being the answer to a visitor's search. The year-round trades compete across the whole coast, where response time and reviews decide.",
    angle:
      "Scituate is the heart of our marine-services practice on the coast. Harbor and 3A operators: the season is predictable — put the quoting and booking online before it arrives.",
    neighbors: ['norwell', 'cohasset', 'marshfield', 'hingham'],
  },
  {
    slug: 'cohasset',
    name: 'Cohasset',
    county: 'Norfolk',
    position: 'Small, affluent, and coastal — a village center, a harbor, and the Route 3A strip it shares with Hingham and Scituate.',
    corridors: ['Cohasset Village (South Main St)', 'Route 3A (Chief Justice Cushing Hwy)', 'Cohasset Harbor', 'Route 228 toward Hingham'],
    propertyMix:
      "Cohasset's commercial property is a short list: the village storefronts on South Main Street, the harbor's marine and dining uses, and the Route 3A corridor it shares with Hingham and Scituate, where the service, medical, and retail plazas sit. Almost nothing here is vacant for long and little of it is cheap. Buyers are purchasing an address and a clientele; the work is in finding the building before it's public and getting the diligence right on a tightly regulated, historic town.",
    businessMix:
      "A high-value, high-expectation customer base that asks its phone for recommendations and trusts the reviews it finds. For the practices, contractors, and marine operators serving Cohasset, polish and response time are the whole pitch — and answer-engine visibility matters more here than almost anywhere, because that's how this clientele shortlists.",
    angle:
      "Cohasset rewards the operators who look like the quality they deliver. We make sure the search finds you first, and the diligence on the building holds up.",
    neighbors: ['hingham', 'scituate'],
  },
];

export const getTown = (slug: string) => TOWNS.find((t) => t.slug === slug);
