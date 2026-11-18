/**
 * Palm Beach County, FL — the second South Florida market, anchored by Boca
 * Raton. Same shape as Broward so the board, the map, the city pages, and the
 * proposal builder work unchanged.
 *
 * Scope reminder: in Florida ICS delivers AI revenue systems, retail platforms,
 * and custom builds. Real estate brokerage is Massachusetts-licensed; a Florida
 * property transaction is handled alongside a licensed Florida broker.
 */
import type { BrowardCity } from './broward';

export type PalmBeachCity = BrowardCity;

export const PALM_BEACH_CITIES: PalmBeachCity[] = [
  {
    slug: 'boca-raton',
    name: 'Boca Raton',
    position: 'the corporate, medical, and affluent anchor of south Palm Beach County, from Mizner Park to the Glades Road office corridor',
    corridors: ['Glades Road and the I-95 office corridor', 'Federal Highway (US-1) and Mizner Park', 'Yamato Road and the Congress Avenue office parks', 'Palmetto Park Road', 'Military Trail', 'the Boca Raton Innovation Campus and FAU area'],
    businessMix: ['wealth management, law, and professional services', 'medical, dental, and aesthetic practices', 'luxury home services and estate maintenance', 'hospitality, dining, and private clubs', 'corporate office vendors and IT services', 'marine and yacht services'],
    angle: 'Boca Raton is where Palm Beach County begins and where the expectations are highest: an affluent residential base, a dense daytime population on the Glades and Yamato office corridors, and a university and innovation campus feeding both. Customers here choose on polish and response. A business that answers in seconds, shows specific proof, and is the one the assistant names owns a category worth more per client than almost anywhere in Florida. Boca is the flagship of the Palm Beach practice and the first territory ICS expects to lock here.',
    neighbors: ['delray-beach', 'boynton-beach'],
  },
  {
    slug: 'delray-beach',
    name: 'Delray Beach',
    position: 'the downtown-and-beach city built around Atlantic Avenue',
    corridors: ['Atlantic Avenue and the downtown core', 'Federal Highway (US-1)', 'Linton Boulevard', 'Congress Avenue', 'Military Trail', 'A1A and the beach'],
    businessMix: ['restaurants, bars, and hospitality', 'galleries, boutiques, and specialty retail', 'medical and wellness practices', 'home services for a mixed housing stock', 'salons and personal care', 'professional services'],
    angle: 'Delray runs on Atlantic Avenue: one of the most visited downtown strips in South Florida, with a resident base in the neighborhoods behind it that needs the same dentists, plumbers, and salons every year. The system here serves the resident side and lets the Avenue traffic find you by name. Hospitality and wellness are the deepest categories.',
    neighbors: ['boca-raton', 'boynton-beach'],
  },
  {
    slug: 'boynton-beach',
    name: 'Boynton Beach',
    position: 'the central-south city with a working inlet, a redeveloping downtown, and a large suburban base west of I-95',
    corridors: ['Boynton Beach Boulevard', 'Congress Avenue and the mall district', 'Federal Highway (US-1) and the downtown marina', 'Gateway Boulevard', 'Military Trail', 'the Boynton Inlet'],
    businessMix: ['home services for a large single-family and HOA base', 'marine services around the inlet', 'auto repair and services', 'medical and dental practices', 'restaurants and quick service', 'fitness and youth programs'],
    angle: 'Boynton is practical Palm Beach: thousands of households west of I-95 making everyday service decisions, a marine economy at the inlet, and a downtown finding its feet. The business that answers first and has recent reviews wins over the one with the bigger sign. Trades, marine, and family practices are the deepest demand.',
    neighbors: ['delray-beach', 'lake-worth-beach', 'wellington'],
  },
  {
    slug: 'lake-worth-beach',
    name: 'Lake Worth Beach',
    position: 'the small, artsy coastal city with a walkable downtown and a strong independent-business culture',
    corridors: ['Lake Avenue and Lucerne Avenue downtown', 'Dixie Highway', 'Lake Worth Road', 'Federal Highway (US-1)', 'A1A and the beach and casino building'],
    businessMix: ['independent restaurants and cafes', 'artisans, galleries, and small retail', 'home services for an older housing stock', 'auto repair', 'salons and personal care', 'small professional offices'],
    angle: 'Lake Worth Beach is independent by temperament, and most of its best businesses barely exist online. The gap between a thriving storefront on Lake Avenue and its web presence is the opportunity: a complete profile, steady reviews, and instant response put a Lake Worth business in front of customers already searching for exactly what it sells.',
    neighbors: ['boynton-beach', 'west-palm-beach', 'wellington', 'greenacres', 'palm-springs'],
  },
  {
    slug: 'west-palm-beach',
    name: 'West Palm Beach',
    position: 'the county seat and the business, legal, and cultural center of Palm Beach County',
    corridors: ['Clematis Street and the downtown core', 'Okeechobee Boulevard', 'Palm Beach Lakes Boulevard', 'Dixie Highway and Northwood', 'Southern Boulevard', 'the Flagler Drive waterfront'],
    businessMix: ['law, finance, and professional services', 'hospitality and dining', 'medical practices and outpatient centers', 'corporate office vendors', 'home services for historic neighborhoods', 'real estate and property services'],
    angle: 'West Palm is the county’s professional address and one of the fastest-growing office markets in the country. Professionals buy from professionals: a clean site, a complete profile, fast response, and structured data that answer engines can cite will beat the glossy brochure most firms here are paying for. Professional and medical services are the deepest categories.',
    neighbors: ['lake-worth-beach', 'palm-beach-gardens', 'wellington', 'riviera-beach', 'royal-palm-beach', 'palm-springs'],
  },
  {
    slug: 'palm-beach-gardens',
    name: 'Palm Beach Gardens',
    position: 'the planned northern city of golf communities, medical campuses, and the PGA Boulevard corridor',
    corridors: ['PGA Boulevard', 'Northlake Boulevard', 'Military Trail', 'the Gardens Mall and Downtown Palm Beach Gardens area', 'Alternate A1A', 'Donald Ross Road'],
    businessMix: ['medical, orthopedic, and specialty practices', 'golf, club, and premium home services', 'professional offices', 'fitness and wellness', 'restaurants and lunch trade', 'landscape and pool companies'],
    angle: 'Palm Beach Gardens households expect a polished, immediate experience and pay for it. The system that wins here looks and responds like the premium service it is: instant, specific, reviewed. Price sensitivity is low; tolerance for a slow callback is lower. Medical and premium home services lead.',
    neighbors: ['west-palm-beach', 'jupiter', 'riviera-beach', 'lake-park', 'north-palm-beach', 'juno-beach'],
  },
  {
    slug: 'jupiter',
    name: 'Jupiter',
    position: 'the northern coastal town around the inlet and lighthouse, with a deep marine economy and the Abacoa district',
    corridors: ['Indiantown Road', 'US-1 and the Jupiter Inlet', 'Alternate A1A and the Harbourside area', 'Abacoa and Donald Ross Road', 'Military Trail', 'the Riverwalk'],
    businessMix: ['marine services, dockage, and boat maintenance', 'home services and outdoor living', 'medical and wellness practices', 'restaurants at the inlet and Harbourside', 'fitness and youth sports', 'professional services'],
    angle: 'Jupiter is a boating town first: the inlet, the marinas, and the households that own what floats in them. A marine or premium home-service business can hold the town with a handful of referrals and a flawless response. The marine services playbook written for the South Shore transfers here almost unchanged.',
    neighbors: ['palm-beach-gardens', 'juno-beach', 'tequesta'],
  },
  {
    slug: 'wellington',
    name: 'Wellington',
    position: 'the western equestrian village of large lots, show grounds, and family neighborhoods',
    corridors: ['Forest Hill Boulevard', 'State Road 7 (441)', 'the Wellington Green area', 'Pierson Road and the equestrian preserve', 'Southern Boulevard (SR-80)', 'Lake Worth Road'],
    businessMix: ['equine, veterinary, and agricultural services', 'large-lot landscape and barn contractors', 'pediatric and family practices', 'tutoring and youth programs', 'premium home services', 'restaurants and quick service'],
    angle: 'Wellington’s equestrian season creates demand no other Palm Beach city has: barns, fencing, trailers, veterinary care, and the households that follow the horses in for the winter. A service business that speaks Wellington’s language on its page and answers on a Saturday morning owns a niche most competitors never notice.',
    neighbors: ['west-palm-beach', 'lake-worth-beach', 'boynton-beach', 'royal-palm-beach', 'greenacres'],
  },
  {
    slug: 'riviera-beach',
    name: 'Riviera Beach',
    position: 'the working waterfront north of West Palm: the Port of Palm Beach, the marine industry on the inlet, and Singer Island across the bridge',
    corridors: ['Broadway (US-1) and the Port of Palm Beach', 'Blue Heron Boulevard to Singer Island', 'the Riviera Beach Marina District', 'Congress Avenue and the industrial parks', 'I-95 at Blue Heron', 'Australian Avenue'],
    businessMix: ['marine services, yacht refit, and dockage', 'port logistics, warehousing, and fleet', 'contractors and building trades', 'restaurants and hospitality on Singer Island', 'auto and truck repair', 'medical and family practices'],
    angle: 'Riviera Beach is where the county actually works: the port, the yacht yards, the industrial parks along Congress, and a redeveloping marina district, with resort hospitality a bridge away on Singer Island. Marine and trades businesses here are known by reputation and reached by a phone that rings in a shop; the first in each category to answer in seconds and show recent reviews takes a share that has never been contested online.',
    neighbors: ['west-palm-beach', 'palm-beach-gardens', 'lake-park'],
  },
  {
    slug: 'lake-park',
    name: 'Lake Park',
    position: 'the small town between Riviera Beach and North Palm Beach, with a historic downtown on Park Avenue and marine and industrial uses along the Intracoastal',
    corridors: ['Park Avenue and the historic downtown', 'Northlake Boulevard', 'US-1 (Federal Highway)', 'the Lake Park Harbor Marina', 'Congress Avenue', '10th Street and the industrial pockets'],
    businessMix: ['marine services and boat storage', 'light industrial, fabrication, and contractors', 'restaurants and small retail on Park Avenue', 'auto repair and detailing', 'home services for an older housing stock', 'professional offices'],
    angle: 'Lake Park is a square mile of real businesses: a downtown finding its feet, a marina, and industrial blocks that house the trades and marine shops serving the whole north county. Rents are lower than the Gardens next door and the customers are the same. A business here that looks and answers like its Palm Beach Gardens competitors wins their customers at a Lake Park address.',
    neighbors: ['riviera-beach', 'north-palm-beach', 'palm-beach-gardens'],
  },
  {
    slug: 'north-palm-beach',
    name: 'North Palm Beach',
    position: 'the waterfront village on the Intracoastal and Lake Worth Lagoon, with US-1 commerce, a country club, and boating households',
    corridors: ['US-1 (Federal Highway)', 'Northlake Boulevard', 'Prosperity Farms Road', 'the Intracoastal and the North Palm Beach Marina', 'Lighthouse Drive and the village center', 'Alternate A1A'],
    businessMix: ['marine services, dockage, and yacht brokerage', 'premium home services and landscape', 'medical, dental, and wellness practices', 'restaurants and waterfront dining', 'financial and professional services', 'fitness and golf-related businesses'],
    angle: 'North Palm Beach is a boating village with a country club at its center and US-1 commerce along its edge: affluent, established households who choose vendors on polish and referrals. Marine and premium home-service businesses hold the village with a handful of relationships and a flawless response; the review profile is the referral.',
    neighbors: ['lake-park', 'palm-beach-gardens', 'juno-beach'],
  },
  {
    slug: 'juno-beach',
    name: 'Juno Beach',
    position: 'the small oceanfront town between Palm Beach Gardens and Jupiter, with a US-1 commercial spine, the pier, and corporate headquarters on the corridor',
    corridors: ['US-1 (Federal Highway)', 'Donald Ross Road', 'A1A (Ocean Drive) and the Juno Beach Pier', 'Universe Boulevard and the corporate campuses', 'Alternate A1A toward Jupiter'],
    businessMix: ['corporate office vendors and professional services', 'medical and wellness practices', 'restaurants and oceanfront dining', 'premium home services for condo and single-family owners', 'real estate and property management', 'fitness and wellness studios'],
    angle: 'Juno Beach is small, oceanfront, and corporate at the same time: a daytime population on the headquarters campuses along US-1 and a resident base that expects Jupiter and Gardens-level service. A business here serves both with one system: structured data and a complete profile for the procurement search, speed and proof for the households.',
    neighbors: ['north-palm-beach', 'jupiter', 'palm-beach-gardens'],
  },
  {
    slug: 'tequesta',
    name: 'Tequesta',
    position: 'the village at the top of the county on the Loxahatchee River and the Jupiter Inlet, boating, golf, and a US-1 and Tequesta Drive commercial center',
    corridors: ['US-1 (Federal Highway)', 'Tequesta Drive and Village Boulevard', 'Country Club Drive', 'the Loxahatchee River and the Jupiter Inlet', 'Alternate A1A', 'County Line Road'],
    businessMix: ['marine services, dockage, and boat maintenance', 'premium home services and landscape', 'medical, dental, and wellness practices', 'restaurants and waterfront dining', 'golf, club, and fitness businesses', 'professional and financial services'],
    angle: 'Tequesta is the quiet end of the county: a river, an inlet, golf, and households that have been here for decades and buy from people they know. The marine services playbook written for the South Shore transfers here almost unchanged, and a premium home-service business that answers on a Saturday owns the village for years.',
    neighbors: ['jupiter'],
  },
  {
    slug: 'royal-palm-beach',
    name: 'Royal Palm Beach',
    position: 'the family village west of West Palm on Southern Boulevard and Okeechobee Boulevard, large neighborhoods, big plazas, and a growing medical presence',
    corridors: ['Southern Boulevard (SR-80)', 'Okeechobee Boulevard', 'Royal Palm Beach Boulevard', 'State Road 7 (441)', 'Crestwood Boulevard', 'the Village Commons and the plazas'],
    businessMix: ['home services for a large single-family and HOA base', 'pediatric, dental, and family medical practices', 'childcare, tutoring, and youth sports', 'restaurants and quick service at the plazas', 'auto services and tires', 'fitness and wellness'],
    angle: 'Royal Palm Beach is thousands of households making everyday service decisions, with plazas on every major corner and competitors who still run on voicemail. Family categories lock fast here because the demand never stops; the business that answers first and shows recent reviews becomes the neighborhood default.',
    neighbors: ['wellington', 'west-palm-beach', 'greenacres'],
  },
  {
    slug: 'greenacres',
    name: 'Greenacres',
    position: 'the dense, diverse city between Lake Worth Beach and Wellington, built around Lake Worth Road, Jog Road, and Forest Hill Boulevard',
    corridors: ['Lake Worth Road', 'Jog Road', 'Forest Hill Boulevard', 'Military Trail', 'Haverhill Road', 'the Lake Worth Road plazas'],
    businessMix: ['restaurants, bakeries, and quick service', 'medical, dental, and urgent care', 'home services for a dense housing stock', 'auto repair and tires', 'salons, barbers, and personal care', 'childcare and family services'],
    angle: 'Greenacres is a plaza city with a dense, working, multilingual customer base and a lot of small businesses that have never been online properly. The gap between a busy storefront on Lake Worth Road and its web presence is the opportunity: a complete profile, steady reviews, and instant response put a Greenacres business in front of customers already searching for exactly what it sells.',
    neighbors: ['lake-worth-beach', 'royal-palm-beach', 'wellington', 'palm-springs'],
  },
  {
    slug: 'palm-springs',
    name: 'Palm Springs',
    position: 'the small village west of Lake Worth Beach along Congress Avenue and 10th Avenue North, modest neighborhoods and busy commercial roads',
    corridors: ['Congress Avenue', '10th Avenue North', 'Lake Worth Road', 'Forest Hill Boulevard', 'Military Trail', 'Kirk Road'],
    businessMix: ['auto repair, body shops, and tires', 'restaurants and quick service', 'medical, dental, and pharmacies', 'home services for an older housing stock', 'salons and personal care', 'small retail and convenience'],
    angle: 'Palm Springs is busy roads and modest neighborhoods: Congress Avenue and 10th Avenue North carry the auto shops, restaurants, and practices that serve a central-county population most national brands overlook. Trades and auto lock first here; the categories are open today and the demand is already on the road.',
    neighbors: ['lake-worth-beach', 'greenacres', 'west-palm-beach'],
  },
];

export const getPalmBeachCity = (slug: string) => PALM_BEACH_CITIES.find((c) => c.slug === slug);
