// Budget maths, shared by the page (first render) and the calculator script.
import { trip, budget, nights, rental } from '../data/trip.mjs';

export const defaultState = (km) => ({
  km: Math.round(km),
  car: 'own',
  carTotal: 0,
  fuel: 'petrol',
  price: budget.fuel.pricePetrol,
  consumption: budget.fuel.consumption,
  tier: 'normal',
  nights: Object.fromEntries(Object.entries(nights).map(([k, n]) => [k, (n.options.find((o) => o.pick) || n.options[0]).id])),
  quads: budget.quad.quads,
  hours: budget.quad.hours,
  quadPrice: budget.quad.pricePerQuadHour,
});

export function compute(s) {
  const crew = trip.crew;
  const liters = (s.km * (1 + budget.fuel.bufferPct / 100) * s.consumption) / 100;
  const fuel = liters * s.price;
  const hotels = Object.entries(s.nights).reduce((sum, [k, id]) => sum + nights[k].options.find((o) => o.id === id).pp * crew, 0);
  const tier = budget.tiers[s.tier];
  const food = budget.meals.reduce((a, m) => a + m.pp, 0) * crew * tier;
  const quad = s.quads * s.hours * s.quadPrice;
  const entries = budget.activities.reduce((a, m) => a + m.pp, 0) * crew;
  const car = s.car === 'own' ? 0 : s.carTotal;
  const carName = s.car === 'own' ? '' : rental.cars.find((c) => c.id === s.car)?.name;
  const cats = [
    { key: 'hotels', label: 'Hotels (3 nights, half board)', value: hotels },
    { key: 'food', label: 'Lunches, snacks & treats', value: food },
    { key: 'fuel', label: `Fuel (${Math.round(liters)} L)`, value: fuel },
    { key: 'quad', label: `Quad (${s.quads} × ${s.hours} h)`, value: quad },
    { key: 'entries', label: 'Entries & tips', value: entries },
    { key: 'car', label: carName ? `Car rental (${carName}, ${rental.days} days)` : 'Car rental (own car)', value: car },
    { key: 'tolls', label: 'A1 tolls', value: budget.tolls },
  ];
  const total = cats.reduce((a, c) => a + c.value, 0);
  return { cats, total, perPerson: total / crew, liters };
}

export const tnd = (v) => `${Math.round(v).toLocaleString('en-US')} TND`;
