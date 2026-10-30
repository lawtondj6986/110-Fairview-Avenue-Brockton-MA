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
  if (!todo.length) return { made: 0 };
  const { default: sharp } = await import('sharp');
  for (const w of todo) {
    await sharp(SRC).resize({ width: w }).webp({ quality: 78 }).toFile(rel(`public/images/daniel-lawton-${w}.webp`));
  }
  return { made: todo.length };
}
