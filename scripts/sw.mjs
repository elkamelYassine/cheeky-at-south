// After `astro build`: writes dist/sw.js with the list of files to save for offline use.
// Precached: the page, the built scripts and styles, icons, manifest, and the small photo versions
// the page shows (-sm.jpg, and the 640 px webp when present). Full-size photos are cached when opened.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const files = walk(dist).map((f) => '/' + relative(dist, f).replace(/\\/g, '/'));

const keep = (u) =>
  u === '/index.html' || u.startsWith('/_astro/') || /^\/(favicon|icon-|apple-touch-icon|manifest)/.test(u) ||
  /-sm\.jpg$/.test(u) || /-640\.webp$/.test(u);
const list = ['/', ...files.filter(keep).filter((u) => u !== '/index.html')].sort();

const hash = createHash('sha1');
for (const u of list) if (u !== '/') hash.update(u + statSync(join(dist, u)).size);
const tpl = readFileSync(fileURLToPath(new URL('./sw-template.js', import.meta.url)), 'utf8');
hash.update(readFileSync(join(dist, 'index.html')));
hash.update(tpl);
const version = hash.digest('hex').slice(0, 10);

writeFileSync(join(dist, 'sw.js'), tpl.replaceAll('__VERSION__', version).replaceAll('__PRECACHE__', () => JSON.stringify(list)));
const kb = Math.round(list.filter((u) => u !== '/').reduce((a, u) => a + statSync(join(dist, u)).size, 0) / 1024);
console.log(`sw.js: ${list.length} files precached (${kb} KB), version ${version}`);
