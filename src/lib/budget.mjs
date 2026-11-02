// Budget maths, shared by the page (first render) and the calculator script.
import { trip, budget, nights, rental } from '../data/trip.mjs';

export const defaultCar = rental.cars.find((c) => c.pick);
const carTotal = (c) => (c.pick ? c.offers[0].total : Math.round(Math.min(...c.offers.map((o) => o.total))));
export { carTotal };
export const defaultState = (km) => ({
  km: Math.round(km),
  car: defaultCar ? defaultCar.id : 'own',
  carTotal: defaultCar ? carTotal(defaultCar) : 0,
  fuel: defaultCar ? defaultCar.fuel : 'petrol',
  price: defaultCar?.fuel === 'diesel' ? budget.fuel.priceDiesel : budget.fuel.pricePetrol,
  consumption: defaultCar ? defaultCar.consumption : budget.fuel.consumption,
  tier: 'normal',
  quads: budget.quad.quads,
  hours: budget.quad.hours,
  quadPrice: budget.quad.pricePerQuadHour,
});

export function compute(s) {
  const crew = trip.crew;
  const liters = (s.km * (1 + budget.fuel.bufferPct / 100) * s.consumption) / 100;
  const fuel = liters * s.price;
  // booked stays: totals for the four of you
  const stay = (n) => (n.options.find((o) => o.pick) || n.options[0]).total;
  const road = Object.values(nights).filter((n) => !n.after);
  const hotels = road.reduce((sum, n) => sum + stay(n), 0);
  const after = Object.values(nights).filter((n) => n.after).reduce((sum, n) => sum + stay(n), 0);
  const tier = budget.tiers[s.tier];
  const food = budget.meals.reduce((a, m) => a + m.pp, 0) * crew * tier;
  const quad = s.quads * s.hours * s.quadPrice;
  const entries = budget.activities.reduce((a, m) => a + m.pp, 0) * crew;
  const car = s.car === 'own' ? 0 : s.carTotal;
  const carName = s.car === 'own' ? '' : rental.cars.find((c) => c.id === s.car)?.name;
  const cats = [
    { key: 'hotels', label: `Stays on the road (${road.length} nights, booked)`, value: hotels },
    { key: 'villa', label: 'Beach villa, Hammam Sousse (3 nights, booked)', value: after },
    { key: 'food', label: 'Lunches, dinners & snacks', value: food },
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
