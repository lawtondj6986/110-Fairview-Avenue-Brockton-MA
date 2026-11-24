import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const links = z.array(z.object({ label: z.string(), url: z.string().url() })).default([]);

/** Plain-language definitions of terms used on the site. */
const glossary = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glossary' }),
  schema: z.object({
    term: z.string(),
    short: z.string().max(240),
    category: z.enum([
      'Law and compliance',
      'Campus safety',
      'Fundraising and development',
      'University governance',
      'Genetics and biomedical research',
      'Research ethics',
      'Records and sourcing',
      'Legal procedure',
    ]),
    aliases: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    links,
  }),
});

/** Explainers on statutes and regulations that set the boundaries of the record. */
const law = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/law' }),
  schema: z.object({
    title: z.string(),
    citation: z.string(),
    short: z.string().max(280),
    jurisdiction: z.enum(['Federal', 'Massachusetts', 'Other']),
    enforcedBy: z.string(),
    links,
  }),
});

/** Practical guides: evaluating an institution, reading documents, research methods, templates. */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(280),
    audience: z.enum(['Prospective students', 'Students', 'Alumni', 'Researchers', 'Everyone']),
    series: z.enum(['Course', 'Primers', 'Evaluating an institution', 'Reading documents', 'Research methods', 'Worked examples', 'Templates']),
    order: z.number().default(50),
  }),
});

export const collections = { glossary, law, guides };
