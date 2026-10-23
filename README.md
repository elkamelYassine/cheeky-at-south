# Cheeky at South

Static Astro site for the south of Tunisia road trip (Sat 7 – Tue 10 Nov 2026, 4 people, 1 car).

```
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/ (host anywhere: Netlify, GitHub Pages, Vercel…)
```

## Editing the trip

Everything lives in `src/data/trip.mjs`:

- `stops`: text, Arabic name, coordinates, photos key, YouTube ids, tips, contacts.
- `days`: start time, and for each stop `[id, minutes spent there]`. Arrival times are computed from
  real drive times (`src/data/routes.json`) × 1.1, rounded to 5 min (`src/lib/schedule.mjs`).
- `nights`: hotel options, per-person half-board estimates, phone numbers with their source.
- `budget`: fuel price, consumption, meals, quad, tolls.

After changing a stop's coordinates or the order of stops, refresh the roads:

```
npm run routes    # queries the public OSRM server, rewrites src/data/routes.json
npm run videos    # if you added YouTube ids: fetches their titles
```

Photos come from Wikimedia Commons (credits in the page footer). `scripts/photos.mjs` and
`scripts/compress.mjs` were used to download and resize them.
