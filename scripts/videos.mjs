// Fetches title/author of every YouTube video used in trip.mjs (via oEmbed) -> src/data/videos.json
import { writeFileSync } from 'node:fs';
import { stops } from '../src/data/trip.mjs';
const ids = [...new Set(Object.values(stops).flatMap((s) => s.videos || []))];
const out = {};
for (const id of ids) {
  const r = await fetch(`https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${id}`);
  if (!r.ok) { console.log('NOT EMBEDDABLE', id, r.status); continue; }
  const j = await r.json();
  out[id] = { title: j.title, author: j.author_name };
}
writeFileSync(new URL('../src/data/videos.json', import.meta.url), JSON.stringify(out, null, 1));
console.log(Object.keys(out).length, 'videos');
