/**
 * Responsive variants of the founder portrait. The source is an 800×1524
 * JPEG (~177 KB) that appears on most pages, often at 80–320px wide. This
 * emits WebP at 320, 640, and 960 wide next to it so <img srcset> can serve
 * a 12 KB file to an avatar and the full image only where it is large.
 * Runs at config load; skips when outputs are newer than the source.
 */
import { statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const rel = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));
const SRC = rel('public/images/daniel-lawton.jpg');
const WIDTHS = [320, 640, 960];

export async function generateImages() {
  if (!existsSync(SRC)) return { made: 0 };
  const srcTime = statSync(SRC).mtimeMs;
  const todo = WIDTHS.filter((w) => {
    const out = rel(`public/images/daniel-lawton-${w}.webp`);
    return !existsSync(out) || statSync(out).mtimeMs < srcTime;
  });
  const icons = await generateIcons();
  if (!todo.length) return { made: icons };
  const { default: sharp } = await import('sharp');
  for (const w of todo) {
    await sharp(SRC).resize({ width: w }).webp({ quality: 78 }).toFile(rel(`public/images/daniel-lawton-${w}.webp`));
  }
  return { made: todo.length + icons };
}

/** App icons for the web manifest, cut from the logo mark: plain 192/512 and a maskable 512 with safe padding. */
async function generateIcons() {
  const LOGO = rel('public/images/ics-logo-mark.jpg');
  if (!existsSync(LOGO)) return 0;
  const { mkdirSync } = await import('node:fs');
  mkdirSync(rel('public/icons'), { recursive: true });
  const logoTime = statSync(LOGO).mtimeMs;
  const jobs = [
    ['public/icons/icon-192.png', 192, false],
    ['public/icons/icon-512.png', 512, false],
    ['public/icons/icon-maskable-512.png', 512, true],
  ].filter(([out]) => !existsSync(rel(out)) || statSync(rel(out)).mtimeMs < logoTime);
  if (!jobs.length) return 0;
  const { default: sharp } = await import('sharp');
  for (const [out, size, maskable] of jobs) {
    if (maskable) {
      const inner = Math.round(size * 0.6);
      const logo = await sharp(LOGO).resize(inner, inner, { fit: 'cover' }).png().toBuffer();
      await sharp({ create: { width: size, height: size, channels: 4, background: '#06132a' } })
        .composite([{ input: logo, left: Math.round((size - inner) / 2), top: Math.round((size - inner) / 2) }])
        .png({ compressionLevel: 9, palette: true, quality: 90 })
        .toFile(rel(out));
    } else {
      await sharp(LOGO).resize(size, size, { fit: 'cover' }).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(rel(out));
    }
  }
  return jobs.length;
}
