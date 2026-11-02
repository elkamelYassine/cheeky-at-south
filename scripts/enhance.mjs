// Rebuilds every photo the site uses from the best source available, with a light enhancement.
//   node scripts/enhance.mjs            (masters are cached in .cache/photos, so re-runs are offline)
// For each photo in src/data/photos.json:
//   - Wikimedia Commons: fetches a 2400 px rendition of the original file.
//   - Booking listings: fetches `orig` (the largest size the listing serves).
// Outputs, next to the old files:  name.jpg (2000 px, lightbox), name-sm.jpg (640 px, map and fallback),
//   name-640.webp, name-1200.webp, name-2000.webp (srcset for the cards and the hero).
// Enhancement: auto-orient, resize with lanczos, gentle unsharp mask, +6 % saturation. Nothing that changes the scene.
import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const f = (p) => fileURLToPath(new URL('../' + p, import.meta.url));
const UA = { 'User-Agent': 'cheeky-at-south/1.0 (personal trip site)' };
const photos = JSON.parse(readFileSync(f('src/data/photos.json'), 'utf8'));
const cache = f('.cache/photos/');
mkdirSync(cache, { recursive: true });
export const WIDTHS = [640, 1200, 2000];

async function source(p) {
  if (p.orig) return p.orig;
  const title = decodeURIComponent(p.page.split('/wiki/')[1]);
  const api = `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&iiurlwidth=2400&format=json&titles=${encodeURIComponent(title)}`;
  for (let i = 0; i < 6; i++) {
    const t = await (await fetch(api, { headers: UA })).text();
    if (t.startsWith('{')) {
      const ii = Object.values(JSON.parse(t).query.pages)[0].imageinfo[0];
      return (ii.thumburl || ii.url).split('?')[0];
    }
    await new Promise((ok) => setTimeout(ok, 5000 * (i + 1))); // rate limited: wait and retry
  }
  throw new Error('Commons API kept refusing: ' + title);
}

async function master(p) {
  const file = cache + p.src.split('/').pop().replace('.jpg', '.master');
  if (existsSync(file)) return file;
  const url = await source(p);
  for (let i = 0; i < 8; i++) {
    const r = await fetch(url, { headers: UA });
    if (r.ok) { writeFileSync(file, Buffer.from(await r.arrayBuffer())); await new Promise((ok) => setTimeout(ok, 3000)); return file; }
    await new Promise((ok) => setTimeout(ok, 15000 * (i + 1))); // 429: Wikimedia throttles bursts
  }
  throw new Error('download failed ' + url);
}

// box = { width } or { width, height } (fit inside)
const enhance = (img, w, h) =>
  img.clone().resize({ width: w, height: h, fit: 'inside', withoutEnlargement: true, kernel: 'lanczos3' })
    .modulate({ saturation: 1.06 })
    .sharpen({ sigma: w <= 640 ? 0.5 : 0.7, m1: 0.6, m2: 2 });

let n = 0;
for (const [key, list] of Object.entries(photos)) {
  for (const p of list) {
    const m = await master(p);
    const img = sharp(m).rotate().toColourspace('srgb');
    const base = 'public' + p.src.replace(/\.jpg$/, '');
    const big = await enhance(img, 2000, 2000).jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(f(base + '.jpg.tmp'));
    writeFileSync(f(base + '.jpg'), readFileSync(f(base + '.jpg.tmp'))); unlinkSync(f(base + '.jpg.tmp'));
    await enhance(img, 640).jpeg({ quality: 78, mozjpeg: true }).toFile(f(base + '-sm.jpg'));
    // webp widths: the standard steps below the photo's own width, then the photo at full size
    const widths = [...WIDTHS.filter((w) => w < big.width), big.width];
    for (const w of widths) {
      await enhance(img, w).webp({ quality: w <= 640 ? 76 : 80, effort: 5 }).toFile(f(`${base}-${w}.webp`));
    }
    p.w = big.width; p.h = big.height;
    p.thumb = p.src.replace('.jpg', '-sm.jpg');
    p.webp = widths;
    n++;
    console.log(key, big.width + 'x' + big.height, widths.join('/'));
  }
}
writeFileSync(f('src/data/photos.json'), JSON.stringify(photos, null, 1));
console.log(n, 'photos');
