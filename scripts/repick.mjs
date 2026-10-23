// Replaces the photos of some keys with chosen Commons candidates.
// ["keep", "/img/file.jpg"] keeps a photo already in photos.json.
// Usage: node scripts/repick.mjs <cand/db.json> '{"key": [["candKey", index, "optional note"], ...]}'
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const f = (p) => fileURLToPath(new URL('../' + p, import.meta.url));
const db = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const picks = JSON.parse(process.argv[3]);
const photos = JSON.parse(readFileSync(f('src/data/photos.json'), 'utf8'));
const UA = { 'User-Agent': 'cheeky-at-south/1.0 (trip site)' };
for (const [key, list] of Object.entries(picks)) {
  const out = [];
  const old = Object.values(photos).flat();
  for (const [i, [ck, idx, note]] of list.entries()) {
    // ["keep", "/img/x.jpg"] keeps an existing photo
    if (ck === 'keep') { out.push(old.find((o) => o.src === idx)); continue; }
    const c = db[ck][idx];
    let buf;
    for (let t = 0; t < 4 && !buf; t++) {
      const r = await fetch(c.thumb, { headers: UA });
      if (r.ok) buf = Buffer.from(await r.arrayBuffer()); else await new Promise((r) => setTimeout(r, 6000));
    }
    if (!buf) { console.log('FAILED', key, c.title); continue; }
    const src = `/img/${key}-v2-${i + 1}.jpg`;
    const info = await sharp(buf).rotate().resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 74, mozjpeg: true }).toFile(f('public' + src));
    const thumb = src.replace('.jpg', '-sm.jpg');
    await sharp(f('public' + src)).resize({ width: 640 }).jpeg({ quality: 70, mozjpeg: true }).toFile(f('public' + thumb));
    out.push({ src, thumb, w: info.width, h: info.height, credit: c.artist || 'Wikimedia Commons', license: c.license, page: c.page, ...(note ? { note } : {}) });
    await new Promise((r) => setTimeout(r, 800));
  }
  photos[key] = out;
  console.log(key, out.length);
}
writeFileSync(f('src/data/photos.json'), JSON.stringify(photos, null, 1));
