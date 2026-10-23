// Computes real road routes between the trip stops with the public OSRM server.
// Usage: npm run routes  -> writes src/data/routes.json
import { writeFileSync } from 'node:fs';
import { stops, days, viaPoints } from '../src/data/trip.mjs';

const extra = {
  // suggested swap on day 3: Tozeur -> Nefta -> Mos Espa -> Tozeur
  'd3-swap': ['tozeur-hotel', 'nefta', 'mos-espa', 'tozeur-hotel'],
};
const plans = Object.fromEntries(days.map((d) => [d.id, d.stops.map(([id]) => id)]));
Object.assign(plans, extra);

const out = {};
for (const [key, ids] of Object.entries(plans)) {
  // insert via points between stops; remember which OSRM legs belong to which stop-to-stop leg
  const pts = [];
  const owner = [];
  ids.forEach((id, i) => {
    if (i > 0) for (const [lat, lon] of viaPoints[ids[i - 1] + '>' + id] || []) { pts.push([lon, lat]); owner.push(i - 1); }
    pts.push([stops[id].lon, stops[id].lat]);
    if (i < ids.length - 1) owner.push(i);
  });
  const coords = pts.map((c) => c.join(',')).join(';');
  const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson&steps=false`;
  const j = await (await fetch(url, { headers: { 'User-Agent': 'cheeky-at-south/1.0' } })).json();
  if (j.code !== 'Ok') throw new Error(key + ' ' + j.code);
  const r = j.routes[0];
  let last = null;
  const line = [];
  for (const [x, y] of r.geometry.coordinates) {
    const p = [+y.toFixed(5), +x.toFixed(5)];
    if (last && Math.abs(p[0] - last[0]) + Math.abs(p[1] - last[1]) < 0.0004) continue;
    line.push(p); last = p;
  }
  out[key] = {
    km: +(r.distance / 1000).toFixed(1),
    min: Math.round(r.duration / 60),
    legs: ids.slice(1).map((to, i) => {
      const parts = r.legs.filter((_, k) => owner[k] === i);
      const km = parts.reduce((a, l) => a + l.distance, 0) / 1000;
      const min = parts.reduce((a, l) => a + l.duration, 0) / 60;
      return { from: ids[i], to, km: +km.toFixed(1), min: Math.round(min) };
    }),
    line,
  };
  console.log(key, out[key].km, 'km', out[key].min, 'min');
  for (const l of out[key].legs) console.log('   ', l.from, '->', l.to, l.km, 'km', l.min, 'min');
  await new Promise((r) => setTimeout(r, 1200));
}
writeFileSync(new URL('../src/data/routes.json', import.meta.url), JSON.stringify(out));
