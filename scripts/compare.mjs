// Compares OSRM leg times (routes.json) with the Valhalla public server for every leg.
import { stops, days } from '../src/data/trip.mjs';
import { readFileSync } from 'node:fs';
const osrm = JSON.parse(readFileSync(new URL('../src/data/routes.json', import.meta.url)));
for (const d of days) {
  const ids = d.stops.map(([id]) => id);
  const body = { locations: ids.map((id) => ({ lat: stops[id].lat, lon: stops[id].lon, type: 'break' })), costing: 'auto', units: 'kilometers' };
  const r = await fetch('https://valhalla1.openstreetmap.de/route', { method: 'POST', headers: { 'Content-Type': 'application/json', 'User-Agent': 'cheeky-at-south/1.0' }, body: JSON.stringify(body) });
  const j = await r.json();
  if (!j.trip) { console.log(d.id, JSON.stringify(j).slice(0, 200)); continue; }
  console.log(`${d.id}  valhalla ${j.trip.summary.length.toFixed(0)} km ${Math.round(j.trip.summary.time / 60)} min | osrm ${osrm[d.id].km} km ${osrm[d.id].min} min`);
  j.trip.legs.forEach((l, i) => {
    const o = osrm[d.id].legs[i];
    console.log(`   ${o.from.padEnd(18)} -> ${o.to.padEnd(18)} V ${l.summary.length.toFixed(1).padStart(6)} km ${String(Math.round(l.summary.time / 60)).padStart(4)} min | O ${String(o.km).padStart(6)} km ${String(o.min).padStart(4)} min  (${(l.summary.length / (l.summary.time / 3600)).toFixed(0)} vs ${(o.km / (o.min / 60) || 0).toFixed(0)} km/h)`);
  });
  await new Promise((r) => setTimeout(r, 1500));
}
