// Turns Google Maps leg times (OSRM for tiny town legs) + planned stays into a clock for every stop.
import { stops, days, googleLegs } from '../data/trip.mjs';
import routes from '../data/routes.json' with { type: 'json' };

const toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
export const fmt = (min) => `${String(Math.floor(min / 60) % 24).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
// round to the nearest 5 minutes, never below 5 for a real leg
export const driveMin = (min) => (min < 2 ? 0 : Math.max(5, Math.round(min / 5) * 5));
// the Google figure for a leg when we have it, else OSRM
export const legOf = (l) => {
  const g = googleLegs[`${l.from}>${l.to}`];
  return g ? { km: g[1], raw: g[0], src: 'Google Maps' } : { km: l.km, raw: l.min, src: 'OSRM' };
};
export const dur = (min) => (min < 60 ? `${min} min` : `${Math.floor(min / 60)} h${min % 60 ? ' ' + String(min % 60).padStart(2, '0') : ''}`);

export function schedule(day) {
  const route = routes[day.id];
  let t = toMin(day.start);
  const sunset = toMin(day.sunset);
  const items = day.stops.map(([id, stay], i) => {
    const leg = i > 0 ? legOf(route.legs[i - 1]) : null;
    const drive = leg ? driveMin(leg.raw) : 0;
    t += drive;
    const arrive = t;
    t += stay;
    return { id, stop: stops[id], stay, arrive: fmt(arrive), leave: fmt(t), arriveMin: arrive, leg: leg && { km: leg.km, min: drive, raw: leg.raw, src: leg.src }, afterSunset: arrive > sunset };
  });
  const driving = items.reduce((s, x) => s + (x.leg?.min ?? 0), 0);
  const km = items.reduce((a, x) => a + (x.leg?.km ?? 0), 0);
  return { items, km, driving, end: items.at(-1).arrive, line: route.line };
}

export const allSchedules = () => days.map((d) => ({ day: d, ...schedule(d) }));
