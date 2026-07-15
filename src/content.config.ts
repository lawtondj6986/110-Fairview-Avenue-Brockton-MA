import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Case studies — one markdown file per client win.
 * Copy src/content/case-studies/_TEMPLATE.md.txt to get started.
 */
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    client: z.string(), // anonymized or named with permission
    vertical: z.enum(['trades', 'retail', 'medical', 'real-estate', 'professional-services', 'other']),
    location: z.string(),
    package: z.string(), // e.g. "Launch + Operate"
    summary: z.string(), // one-liner shown on cards
    stats: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .min(1)
      .max(4),
    testimonial: z.object({ quote: z.string(), name: z.string(), title: z.string() }).optional(),
    illustrative: z.boolean().default(false), // true = sample data, renders a disclosure note
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

/**
 * Property listings — one markdown file per listing.
 * Copy src/content/listings/_TEMPLATE.md.txt to get started.
 */
const listings = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/listings' }),
  schema: z.object({
    title: z.string(),
    address: z.string(),
    town: z.string(),
    state: z.string().default('MA'),
    price: z.string(), // display string, e.g. "$1,250,000" or "$18/SF NNN"
    dealType: z.enum(['sale', 'lease']),
    propertyType: z.enum(['retail', 'industrial', 'office', 'mixed-use', 'land', 'automotive', 'medical']),
    sqft: z.string().optional(),
    lotSize: z.string().optional(),
    status: z.enum(['available', 'under-agreement', 'sold', 'leased']).default('available'),
    highlights: z.array(z.string()).max(6).default([]),
    image: z.string().default('/images/listing-placeholder.svg'),
    sample: z.boolean().default(false), // true = demo listing, renders a disclosure note
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

/**
 * Insights — market notes, AI tactics, quarterly reports.
 */
const insights = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['market-notes', 'ai-for-business', 'reports']),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { 'case-studies': caseStudies, listings, insights };
