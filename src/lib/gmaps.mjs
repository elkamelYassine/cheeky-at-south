// Google Maps directions links for one day: start, every stop, the day's end, by car.
// Uses the documented Maps URL (https://developers.google.com/maps/documentation/urls/get-started#directions-action),
// which takes at most 9 waypoints, so 11 points per link with origin and destination.
//   - via points from trip.mjs are kept, so Google follows the same road as the site
//   - activities (the quad) are left out: you do not drive there yourselves
//   - points within 300 m of the next one are merged (hotel check-in, then the night there)
//   - a day with more points is split into parts; each part starts where the previous one ends
import { stops, viaPoints } from '../data/trip.mjs';

const MAX_POINTS = 11;
const near = (a, b) => Math.hypot((a.lat - b.lat) * 111, (a.lon - b.lon) * 111 * Math.cos((a.lat * Math.PI) / 180)) < 0.3;

export function dayPoints(day) {
  const ids = day.stops.map(([id]) => id);
  const pts = [];
  ids.forEach((id, i) => {
    if (i > 0) for (const [lat, lon] of viaPoints[`${ids[i - 1]}>${id}`] || []) pts.push({ lat, lon, kind: 'via' });
    const s = stops[id];
    if (s.kind === 'activity') return;
    pts.push({ id, lat: s.lat, lon: s.lon, kind: s.kind, name: s.name });
  });
  return pts.filter((p, i) => !(i < pts.length - 1 && near(p, pts[i + 1])));
}

const shortName = (p) => p.name.replace(/^Check[- ]in,? /i, '').split(/[:,(]/)[0].trim();

const url = (pts) => {
  const ll = (p) => `${p.lat},${p.lon}`;
  const q = new URLSearchParams({ api: '1', origin: ll(pts[0]), destination: ll(pts.at(-1)), travelmode: 'driving' });
  const way = pts.slice(1, -1).map(ll).join('|');
  return `https://www.google.com/maps/dir/?${q}${way ? '&waypoints=' + encodeURIComponent(way) : ''}`;
};

// [{ url, from, to, count }] — one entry, or several equal parts when the day has more than 11 points
export function dayLinks(day) {
  const pts = dayPoints(day);
  const parts = Math.ceil((pts.length - 1) / (MAX_POINTS - 1));
  const out = [];
  let start = 0;
  for (let k = 1; k <= parts; k++) {
    let end = k === parts ? pts.length - 1 : Math.round(((pts.length - 1) * k) / parts);
    while (end > start + 1 && pts[end].kind === 'via') end--; // split on a real stop, not a road point
    const seg = pts.slice(start, end + 1);
    out.push({ url: url(seg), from: shortName(seg[0]), to: shortName(seg.at(-1)), count: seg.filter((p) => p.kind !== 'via').length });
    start = end;
  }
  return out;
}
