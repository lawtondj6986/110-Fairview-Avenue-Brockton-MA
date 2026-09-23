/**
 * Build-time OG card generator.
 * Runs from astro.config.mjs before every build/dev: renders a branded
 * 1200x630 PNG per page into public/og/ and writes src/generated/
 * og-manifest.json mapping pathname -> image path. Base.astro reads the
 * manifest and falls back to the default card for unmapped pages.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const rel = (p) => path.join(root, p);

function el(type, style, children) {
  return { type, props: { style, children } };
}
function text(t, style) {
  return { type: 'div', props: { style, children: t } };
}

function frontmatterTitle(file) {
  const src = readFileSync(file, 'utf8');
  const m = src.match(/^title:\s*['"](.+?)['"]\s*$/m);
  return m ? m[1] : null;
}

function collectPages() {
  const pages = [
    ['/', 'home', 'CRE ADVISORY + AI SYSTEMS · SOUTH SHORE MA', "Your broker shouldn't hand you the keys and disappear."],
    ['/commercial-real-estate/', 'commercial-real-estate', 'COMMERCIAL REAL ESTATE ADVISORY', 'The deals national firms ignore. The process they’d charge millions for.'],
    ['/ai-services/', 'ai-services', 'AI REVENUE SYSTEMS', "We don't sell websites. We install revenue systems."],
    ['/quotebrain/', 'quotebrain', 'QUOTEBRAIN™ 2.0 · LIVE', 'Measure your lot by satellite. Priced in 60 seconds.'],
    ['/ai-readiness/', 'ai-readiness', 'FREE ASSESSMENT · 2 MINUTES', 'Find out exactly where your business leaks revenue.'],
    ['/building-worth/', 'building-worth', 'FREE BROKER OPINION OF VALUE', "What's your building actually worth?"],
    ['/pricing/', 'pricing', 'PUBLISHED PRICING', "Pricing that isn't a secret."],
    ['/guarantees/', 'guarantees', 'IN WRITING · WITH CONSEQUENCES', 'Four promises. 21 days. 60 seconds. 90 days. 100% yours.'],
    ['/scoreboard/', 'scoreboard', 'UPDATED MONTHLY', 'Agencies show portfolios. We show a scoreboard.'],
    ['/south-shore/', 'south-shore', 'SERVICE AREA · TEN TOWNS, IN PERSON', "We don't cover the South Shore. We work it."],
    ['/about/', 'about', 'ABOUT ICS · BROCKTON MA', "Two careers' worth of skills. One advisor at your table."],
    ['/contact/', 'contact', 'CONTACT · (508) 942-8259', 'One call. A straight answer. A concrete next step.'],
    ['/workshops/', 'workshops', 'FREE CHAMBER WORKSHOPS', 'AI for Main Street — free, practical, no hype.'],
    ['/insights/', 'insights', 'MARKET NOTES + AI TACTICS', 'The South Shore market, decoded. AI, demystified.'],
    ['/case-studies/', 'case-studies', 'MEASURED RESULTS', 'Judge us on numbers.'],
    ['/listings/', 'listings', 'COMMERCIAL LISTINGS · SOUTH SHORE MA', 'Commercial property, marketed properly.'],
  ];

  // Towns from the data file (regex keeps this in sync without a TS runtime)
  const townsSrc = readFileSync(rel('src/lib/towns.ts'), 'utf8');
  for (const m of townsSrc.matchAll(/slug: '([^']+)',\s*\n\s*name: '([^']+)'/g)) {
    pages.push([`/south-shore/${m[1]}/`, `south-shore-${m[1]}`, 'COMMERCIAL REAL ESTATE + AI SYSTEMS', `${m[2]}, Massachusetts.`]);
  }

  const content = [
    ['src/content/case-studies', 'case-studies', 'CASE STUDY · SOUTH SHORE MA'],
    ['src/content/insights', 'insights', 'ICS INSIGHTS'],
    ['src/content/listings', 'listings', 'COMMERCIAL LISTING · SOUTH SHORE MA'],
  ];
  for (const [dir, base, eyebrow] of content) {
    for (const f of readdirSync(rel(dir)).filter((f) => f.endsWith('.md') && !f.startsWith('_'))) {
      const slug = f.replace(/\.md$/, '');
      const title = frontmatterTitle(rel(`${dir}/${f}`));
      if (title) pages.push([`/${base}/${slug}/`, `${base}-${slug}`, eyebrow, title]);
    }
  }
  return pages;
}

export async function generateOg() {
  const manifestPath = rel('src/generated/og-manifest.json');
  mkdirSync(rel('src/generated'), { recursive: true });
  mkdirSync(rel('public/og'), { recursive: true });

  try {
    const { default: satori } = await import('satori');
    const { Resvg } = await import('@resvg/resvg-js');

    const font400 = readFileSync(rel('node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-400-normal.woff'));
    const font700 = readFileSync(rel('node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff'));
    const logo = `data:image/jpeg;base64,${readFileSync(rel('public/images/ics-logo-mark.jpg')).toString('base64')}`;

    const pages = collectPages();
    const manifest = {};

    for (const [route, slug, eyebrow, title] of pages) {
      const fontSize = title.length > 70 ? 48 : title.length > 45 ? 56 : 68;
      const tree = el(
        'div',
        {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: 'linear-gradient(135deg, #0b1f3a 0%, #06132a 100%)',
          fontFamily: 'Space Grotesk',
          position: 'relative',
        },
        [
          el('div', {
            position: 'absolute',
            top: '-200px',
            right: '-160px',
            width: '560px',
            height: '560px',
            borderRadius: '9999px',
            background: 'radial-gradient(circle, rgba(20,184,166,0.28) 0%, rgba(20,184,166,0) 70%)',
            display: 'flex',
          }),
          text(eyebrow, { color: '#2dd4bf', fontSize: '26px', fontWeight: 700, letterSpacing: '6px', display: 'flex' }),
          el('div', { display: 'flex', flexDirection: 'column', gap: '28px' }, [
            text(title, { color: '#f8fafc', fontSize: `${fontSize}px`, fontWeight: 700, lineHeight: 1.08, maxWidth: '1020px', display: 'flex' }),
            el('div', { width: '170px', height: '10px', background: '#14b8a6', borderRadius: '5px', display: 'flex' }, []),
          ]),
          el('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, [
            el('div', { display: 'flex', alignItems: 'center', gap: '20px' }, [
              { type: 'img', props: { src: logo, width: 68, height: 68, style: { borderRadius: '14px' } } },
              el('div', { display: 'flex', flexDirection: 'column' }, [
                text('icsgroup.ai', { color: '#f8fafc', fontSize: '30px', fontWeight: 700, display: 'flex' }),
                text('Innovative Commercial Strategies · Brockton, MA', { color: 'rgba(219,228,240,0.6)', fontSize: '20px', display: 'flex' }),
              ]),
            ]),
            text('BUILT BY AN OPERATOR', { color: '#c9a227', fontSize: '20px', fontWeight: 700, letterSpacing: '4px', display: 'flex' }),
          ]),
        ]
      );

      const svg = await satori(tree, {
        width: 1200,
        height: 630,
        fonts: [
          { name: 'Space Grotesk', data: font400, weight: 400, style: 'normal' },
          { name: 'Space Grotesk', data: font700, weight: 700, style: 'normal' },
        ],
      });
      const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
      writeFileSync(rel(`public/og/${slug}.png`), png);
      manifest[route] = `/og/${slug}.png`;
    }

    writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
    console.log(`[og] generated ${pages.length} social cards`);
  } catch (err) {
    console.warn('[og] generation failed, using default card:', err?.message || err);
    try {
      readFileSync(manifestPath);
    } catch {
      writeFileSync(manifestPath, '{}');
    }
  }
}
