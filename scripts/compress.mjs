// Re-encodes downloaded photos (1400px + 640px thumbs) and records real sizes in photos.json.
import sharp from 'sharp';
import { readFileSync, writeFileSync, renameSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const f = (p) => fileURLToPath(new URL('../' + p, import.meta.url));
const photos = JSON.parse(readFileSync(f('src/data/photos.json'), 'utf8'));
for (const list of Object.values(photos)) for (const p of list) {
  const src = f('public' + p.src);
  const info = await sharp(src).rotate().resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 74, mozjpeg: true }).toFile(src + '.tmp');
  renameSync(src + '.tmp', src);
  p.w = info.width; p.h = info.height;
  p.thumb = p.src.replace('.jpg', '-sm.jpg');
  await sharp(src).resize({ width: 640 }).jpeg({ quality: 70, mozjpeg: true }).toFile(f('public' + p.thumb));
}
writeFileSync(f('src/data/photos.json'), JSON.stringify(photos, null, 1));
