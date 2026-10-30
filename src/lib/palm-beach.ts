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
    neighbors: ['boynton-beach', 'west-palm-beach', 'wellington'],
  },
  {
    slug: 'west-palm-beach',
    name: 'West Palm Beach',
    position: 'the county seat and the business, legal, and cultural center of Palm Beach County',
    corridors: ['Clematis Street and the downtown core', 'Okeechobee Boulevard', 'Palm Beach Lakes Boulevard', 'Dixie Highway and Northwood', 'Southern Boulevard', 'the Flagler Drive waterfront'],
    businessMix: ['law, finance, and professional services', 'hospitality and dining', 'medical practices and outpatient centers', 'corporate office vendors', 'home services for historic neighborhoods', 'real estate and property services'],
    angle: 'West Palm is the county’s professional address and one of the fastest-growing office markets in the country. Professionals buy from professionals: a clean site, a complete profile, fast response, and structured data that answer engines can cite will beat the glossy brochure most firms here are paying for. Professional and medical services are the deepest categories.',
    neighbors: ['lake-worth-beach', 'palm-beach-gardens', 'wellington'],
  },
  {
    slug: 'palm-beach-gardens',
    name: 'Palm Beach Gardens',
    position: 'the planned northern city of golf communities, medical campuses, and the PGA Boulevard corridor',
    corridors: ['PGA Boulevard', 'Northlake Boulevard', 'Military Trail', 'the Gardens Mall and Downtown Palm Beach Gardens area', 'Alternate A1A', 'Donald Ross Road'],
    businessMix: ['medical, orthopedic, and specialty practices', 'golf, club, and premium home services', 'professional offices', 'fitness and wellness', 'restaurants and lunch trade', 'landscape and pool companies'],
    angle: 'Palm Beach Gardens households expect a polished, immediate experience and pay for it. The system that wins here looks and responds like the premium service it is: instant, specific, reviewed. Price sensitivity is low; tolerance for a slow callback is lower. Medical and premium home services lead.',
    neighbors: ['west-palm-beach', 'jupiter'],
  },
  {
    slug: 'jupiter',
    name: 'Jupiter',
    position: 'the northern coastal town around the inlet and lighthouse, with a deep marine economy and the Abacoa district',
    corridors: ['Indiantown Road', 'US-1 and the Jupiter Inlet', 'Alternate A1A and the Harbourside area', 'Abacoa and Donald Ross Road', 'Military Trail', 'the Riverwalk'],
    businessMix: ['marine services, dockage, and boat maintenance', 'home services and outdoor living', 'medical and wellness practices', 'restaurants at the inlet and Harbourside', 'fitness and youth sports', 'professional services'],
    angle: 'Jupiter is a boating town first: the inlet, the marinas, and the households that own what floats in them. A marine or premium home-service business can hold the town with a handful of referrals and a flawless response. The marine services playbook written for the South Shore transfers here almost unchanged.',
    neighbors: ['palm-beach-gardens'],
  },
  {
    slug: 'wellington',
    name: 'Wellington',
    position: 'the western equestrian village of large lots, show grounds, and family neighborhoods',
    corridors: ['Forest Hill Boulevard', 'State Road 7 (441)', 'the Wellington Green area', 'Pierson Road and the equestrian preserve', 'Southern Boulevard (SR-80)', 'Lake Worth Road'],
    businessMix: ['equine, veterinary, and agricultural services', 'large-lot landscape and barn contractors', 'pediatric and family practices', 'tutoring and youth programs', 'premium home services', 'restaurants and quick service'],
    angle: 'Wellington’s equestrian season creates demand no other Palm Beach city has: barns, fencing, trailers, veterinary care, and the households that follow the horses in for the winter. A service business that speaks Wellington’s language on its page and answers on a Saturday morning owns a niche most competitors never notice.',
    neighbors: ['west-palm-beach', 'lake-worth-beach', 'boynton-beach'],
  },
];

export const getPalmBeachCity = (slug: string) => PALM_BEACH_CITIES.find((c) => c.slug === slug);
