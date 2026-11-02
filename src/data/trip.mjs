// Single source of truth for the trip. Used by the site and by scripts/route.mjs.
// Times are computed from real OSRM drive times (src/data/routes.json) + the `stay` of each stop.

export const trip = {
  name: 'Cheeky at South',
  dates: 'Sat 7 – Tue 10 November 2026',
  crew: 4,
  // Leg times come from Google Maps (googleLegs below), rounded to 5 min. Legs Google has no
  // figure for (a few hundred metres in town) use OSRM.
};

// kind: start | stop | meal | night | drive | activity
// approx: true when the pin is placed by hand (no exact address published)
export const stops = {
  sousse: {
    name: 'Sousse', ar: 'سوسة', lat: 35.8288, lon: 10.6405, kind: 'start',
    photos: 'sousse',
    summary: 'Start and finish. Full tank, A1 motorway south.',
    body: 'Meet at 07:15, load the car, leave at 07:30 as planned. Take the A1 motorway south towards Sfax and Gabès.',
    tips: ['Fill the tank in Sousse the evening before.', 'Coins for the A1 tolls (about 8 TND to Gabès, estimate).'],
  },
  agareb: {
    name: 'Agareb rest stop', ar: 'عقارب', lat: 34.7493, lon: 10.603, kind: 'stop',
    photos: 'agareb',
    summary: 'First coffee break on the A1, south of Sfax.',
    body: 'The kiosk on the A1 next to Agareb. Coffee, toilets, stretch. Your draft had 10:15 here, but Google Maps puts it 1 h 30 from Sousse, so you will be there around 09:00.',
    tips: ['Top up fuel here or in Gabès. The next big station is in Ghomrassen.'],
  },
  'chenini-gabes': {
    name: 'Chenini oasis & Mahfel', ar: 'شنني قابس', lat: 33.8705, lon: 10.0577, kind: 'stop',
    photos: 'chenini-gabes', videos: ['bfeyJjo_GZA'],
    summary: 'The seaside oasis of Gabès: palms over fruit trees over vegetables.',
    body: 'Gabès is one of the very few oases in the world that touches the sea. In Chenini the farming is stacked in three layers: date palms on top, pomegranates and bananas below, vegetables on the ground. Walk along the wadi to the old Roman dam and the small waterfall, then sit at Mahfel for a drink in the shade.',
    tips: ['Ask for legmi (fresh palm sap) if anyone is selling it.', 'Mahfel is the spot from your draft: confirm the exact address with whoever recommended it.'],
  },
  jara: {
    name: 'Jara: Great Mosque & souk', ar: 'جارة قابس', lat: 33.8885, lon: 10.0958, kind: 'stop',
    photos: 'jara', videos: ['9Cu6tbrZt2A'],
    summary: 'Old Gabès. Henna souk, spices, dried fish, and the Great Mosque of Jara.',
    body: 'Jara is the historic heart of Gabès. The souk is famous for its henna (Gabès henna is sold all over Tunisia), spices and ouzef, the small dried fish of the south. The Great Mosque sits on Avenue Habib Bourguiba, right next to the souk.',
    tips: ['Buy henna and spices here, prices drop fast once you leave the tourist trail.', 'Park on Avenue Habib Bourguiba and walk.'],
  },
  'matmata-new': {
    name: 'Nouvelle Matmata', ar: 'مطماطة الجديدة', lat: 33.6689, lon: 10.0144, kind: 'drive',
    photos: 'matmata-road',
    summary: 'The new town on the plain. Drive through, the road starts to climb after it.',
    body: 'Built in the 1960s to rehouse families from the old pit houses. Nothing to stop for, but the road from here up to old Matmata climbs into the Dahar hills and the landscape changes fast.',
  },
  matmata: {
    name: 'Old Matmata', ar: 'مطماطة', lat: 33.5457, lon: 9.9671, kind: 'stop',
    photos: 'matmata', videos: ['4Hq1BiXiE1g'],
    summary: 'Troglodyte pit houses and the moon-like "Star Wars" landscape.',
    body: 'Berber homes dug straight down into the soft ground, with rooms opening onto a round courtyard. Seen from above, the village looks like a field of craters, which is exactly why it ended up in Star Wars. Several families let visitors into their home for a small tip.',
    tips: ['Leave a 5–10 TND tip if a family shows you their house.'],
  },
  'sidi-driss': {
    name: 'Hotel Sidi Driss: lunch', ar: 'نزل سيدي إدريس', lat: 33.5427, lon: 9.9673, kind: 'meal',
    photos: 'sidi-driss', videos: ['LBOsNQKm42w'],
    summary: 'Lunch inside Luke Skywalker\'s home. Ask for Massoud.',
    body: 'The Lars homestead interiors of Star Wars (1977) were filmed in this troglodyte hotel, and some of the set is still painted on the walls. Have lunch here. Call Massoud the day before so the meal for four is ready when you arrive.',
    contacts: [
      { label: 'Massoud', note: 'your contact (number from your friends)' },
      { label: 'Hotel Sidi Driss', phone: '+216 75 240 005', source: 'Sygic travel guide listing' },
      { label: 'Backup: Hotel Les Berbères (Matmata)', phone: '+216 75 240 024', source: 'Sygic travel guide listing' },
    ],
  },
  toujane: {
    name: 'Toujane', ar: 'توجان', lat: 33.4658, lon: 10.1311, kind: 'stop',
    photos: 'toujane', videos: ['40t4FJ-PuL0'],
    summary: 'Berber village split across two hills of the Dahar. Best viewpoint of the day.',
    body: 'The road from Matmata to Toujane is the "landscape road" from your draft: switchbacks, olive terraces and stone villages that blend into the rock. Stop at the top of the pass above the village for the view, then drive down through it.',
    tips: ['Roadside stalls sell rugs and local honey.'],
  },
  'dkhilet-toujane': {
    name: 'Dkhilet Toujane', ar: 'دخيلة توجان', lat: 33.4352, lon: 10.2026, kind: 'drive',
    photos: null,
    summary: 'Small village at the foot of the hills. Drive through towards Ksar Hallouf.',
    body: 'The road leaves the mountains here and turns south along the edge of the Dahar towards Ksar Hallouf and Beni Khedache.',
  },
  'ksar-hallouf': {
    name: 'Ksar Hallouf', ar: 'قصر الحلوف', lat: 33.2912, lon: 10.1573, kind: 'stop',
    photos: 'ksar-hallouf', videos: ['PR72D8x7m7s'],
    summary: 'Hilltop granary with a huge view. You get here in the late golden hour.',
    body: 'A fortified granary (ksar) on a rocky spur: rows of vaulted ghorfas where the families of the valley stored grain and oil. You arrive late afternoon, when the light turns gold over the plain. You drive past it again on day 2. Climb to the top terrace for the photo of the day.',
  },
  'beni-khedache': {
    name: 'Beni Khedache', ar: 'بني خداش', lat: 33.2514, lon: 10.2001, kind: 'drive',
    photos: 'beni-khedache',
    summary: 'Mountain town with old ksar ruins. Quick pass, sunset is close.',
    body: 'The main town of the Dahar plateau. You can see the remains of its ksar from the road. Keep moving: the last 25 km to Ksar Hadada are best done before dark.',
  },
  'ksar-hadada': {
    name: 'Ksar Hadada', ar: 'قصر حدادة', lat: 33.1004, lon: 10.3119, kind: 'stop',
    photos: 'ksar-hadada', videos: ['ENfS9LK-Gyg'],
    summary: 'Sunset stop in the Star Wars slave quarters of Mos Espa.',
    body: 'Part of this ksar was turned into a guesthouse, and its courtyards were used as the slave quarters of Mos Espa in Star Wars Episode I. You arrive just before sunset: walk the courtyards and the granaries while there is light, then drive the last half hour to Tataouine.',
  },
  'tataouine-night': {
    name: 'Tataouine: Airbnb (Braiek)', ar: 'تطاوين', lat: 32.9457, lon: 10.4678, kind: 'night', approx: true,
    photos: 'stay-tataouine',
    summary: 'Night 1. Booked: an Airbnb in Tataouine, hosted by Braiek.',
    body: 'Dinner in town (the Airbnb has no meals booked). Send Braiek your arrival time on Airbnb during the day. Tomorrow Chenini is only about 20 km away.',
  },
  ghomrassen: {
    name: 'Ghomrassen: fuel & ftayer', ar: 'غمراسن', lat: 33.0599, lon: 10.339, kind: 'stop',
    photos: 'ghomrassen',
    summary: 'Fill the tank before the desert, and eat the ftayer Ghomrassen is famous for.',
    body: 'Ghomrassen is the town that sends ftayer makers (fried doughnut sellers) to the whole country, so a ftayer break here is mandatory. It is also the last proper town before 265 km of desert road to Douz: fill the tank to the top.',
    tips: ['Full tank here. Google Maps shows a small fuel station at Ksar Ghilane, but do not count on it.'],
  },
  guermessa: {
    name: 'Guermessa', ar: 'قرماسة', lat: 32.9847, lon: 10.2636, kind: 'stop',
    photos: 'guermessa',
    summary: 'Abandoned Berber village on a ridge, with its ksar on the crest.',
    body: 'The old village is built along the crest of a mountain ridge, with the new village below it. Park in the new village and look up: the ruined houses follow the line of the rock like a wall.',
  },
  'chenini-tataouine': {
    name: 'Chenini (Tataouine)', ar: 'شنني تطاوين', lat: 32.9118, lon: 10.2626, kind: 'stop',
    photos: 'chenini-tataouine', videos: ['_TpjJ9u8jIM', 'BSvetfUs6eU'],
    summary: 'Troglodyte village carved into the ridge, ksar on top, white mosque in the middle.',
    body: 'The best-known Berber village of the south. Houses are dug into the cliff in layers, a white mosque stands out halfway up, and the ksar sits on the summit. Walk up to the top and ask about the Mosque of the Seven Sleepers in the valley.',
    tips: ['Wear proper shoes, the path to the ksar is rocky.', 'A local guide at the entrance costs about 10–20 TND (estimate).'],
  },
  'ksar-ghilane': {
    name: 'Ksar Ghilane', ar: 'قصر غيلان', lat: 32.977, lon: 9.6452, kind: 'meal',
    photos: 'ksar-ghilane', videos: ['xFXXh15frQ4', 'B7rIJO1v_Q4'],
    summary: 'Oasis at the edge of the Grand Erg Oriental. Lunch, hot spring, first real dunes.',
    body: 'The last oasis before the great dune sea. Have lunch in one of the camps, swim in the warm spring under the palms, and walk into the dunes. The "palace in the Sahara" from your draft is most likely the Roman fort of Tisavar, about 2–3 km into the dunes. It is reached by camel or quad, not by car.',
    tips: ['No ATM: bring cash. Google Maps shows a small fuel station at the entrance, but fill up in Ghomrassen anyway.', 'Bring swimsuits for the spring.', 'Camel or quad to Tisavar: negotiate on site, about 1 h return.'],
  },
  douz: {
    name: 'Douz', ar: 'دوز', lat: 33.4571, lon: 9.025, kind: 'drive',
    photos: 'douz', videos: ['Fhwpr6QqMb4'],
    summary: 'The "gateway to the Sahara". Town centre on the way to the hotels.',
    body: 'Douz is the capital of the Tunisian Sahara and hosts the International Festival of the Sahara in late December. The hotels sit on the edge of the dunes, a few minutes south of the centre.',
  },
  'douz-hotel': {
    name: 'Check in, Hotel Sahara Douz', ar: 'نزل الصحراء دوز', lat: 33.4352, lon: 9.0201, kind: 'stop',
    photos: 'stay-sahara',
    summary: 'Drop the bags at Hotel Sahara Douz, in the tourist zone by the dunes. The quad is waiting.',
    body: 'Ten minutes to check in and change. Check-in opens at 14:00. Show the Tunisiebooking voucher (in Marouane\'s name) and pay the rest, 484 TND. Jamel picks you up at the hotel for the quad.',
  },
  'douz-dune': {
    name: 'Quad at sunset', ar: 'كثبان دوز', lat: 33.439, lon: 9.006, kind: 'activity', approx: true,
    photos: 'quad', videos: ['Cy7rZWVngVU'],
    summary: 'Quad into the dunes with Jamel, as in your draft. Sunset is at 17:26.',
    body: 'With the real drive times you reach Douz around 16:20, so the quad fits before dark. Ride out into the dunes, stop on a crest for the sunset at 17:26, and come back at dusk. Call Jamel the day before and fix 16:40 at the hotel.',
    contacts: [
      { label: 'Jamel (quad manager)', note: 'from your draft' },
      { label: 'Jmed (quad)', phone: '+216 96 345 597', source: 'your draft' },
    ],
    tips: ['Bring a jacket and a scarf for the face: it gets cold fast after sunset in November.'],
  },
  'douz-night': {
    name: 'Hotel Sahara Douz', ar: 'نزل الصحراء دوز', lat: 33.4352, lon: 9.0201, kind: 'night',
    photos: 'stay-sahara',
    summary: 'Night 2. Booked: 1 double and 2 single rooms, breakfast included.',
    body: 'Breakfast only: dinner is not included, so ask at reception whether the hotel restaurant can serve you, or eat in Douz. Easy start tomorrow: breakfast at 08:00, checkout before 12:00.',
  },
  chott: {
    name: 'Chott el Jerid (Maleha stop)', ar: 'شط الجريد', lat: 33.79, lon: 8.43, kind: 'stop', approx: true,
    photos: 'chott', videos: ['UPHy6Chvb3c', 'mOdL-vX4h54'],
    summary: 'A road straight across the largest salt flat of the Sahara.',
    body: 'For about 60 km the road runs on a causeway over a white salt crust that stretches to the horizon. Halfway across there are stalls selling salt crystals and desert roses, and the water in the ditches turns pink or red from algae. Look for mirages on the horizon.',
    tips: ['Do not drive onto the crust: it can be soft under the surface.'],
  },
  tozeriana: {
    name: 'Tozeriana: lunch', ar: 'توزر', lat: 33.921, lon: 8.1203, kind: 'meal',
    photos: 'food',
    summary: 'Lunch on the Nefta road, as in your draft.',
    body: 'Tozeriana is a restaurant-café on Avenue Farhat Hached (the Nefta road). Ask for local dishes of the Jerid region.',
  },
  'tozeur-hotel': {
    name: 'Check in, Marabout Guest House', ar: 'توزر', lat: 33.9185, lon: 8.1229, kind: 'stop',
    photos: 'stay-marabout',
    summary: 'Drop the bags at the Airbnb, a few minutes from lunch.',
    body: 'Booked: the whole Marabout Guest House for the four of you, hosted by Hedi. Check-in is from 14:00, so call Hedi from lunch to say you are on your way.',
    contacts: [{ label: 'Hedi (host)', phone: '+216 96 999 477', source: 'Airbnb booking' }],
  },
  'tozeur-medina': {
    name: 'Ouled el Hadef & souk', ar: 'أولاد الهادف', lat: 33.9185, lon: 8.133, kind: 'stop', approx: true,
    photos: 'tozeur', videos: ['f9gWv3DR0A8', 'szqqxlYnsJE'],
    summary: 'The brick medina of Tozeur. Geometric patterns on every wall.',
    body: 'The old quarter of Ouled el Hadef is built entirely in sun-dried yellow brick laid in geometric patterns. Get lost in the alleys, then walk to the souk for dates. November is the Deglet Nour harvest, so the dates are as fresh as they get.',
    tips: ['Buy dates by the branch (régime) straight from the palm grove.'],
  },
  paradis: {
    name: 'Paradise garden & Sahara zoo', ar: 'جنة توزر', lat: 33.9085, lon: 8.14, kind: 'stop', approx: true,
    photos: 'tozeur-zoo',
    summary: 'Garden in the palm grove with a small zoo of desert animals.',
    body: 'Fruit trees and flowers in the palm grove, plus a small zoo with fennecs, hyenas and camels, including the one famous for drinking Coke straight from the bottle.',
  },
  chakwak: {
    name: 'Chak Wak park', ar: 'شاك واك', lat: 33.9111, lon: 8.1465, kind: 'stop',
    photos: 'chakwak',
    summary: 'Life-size dinosaurs and a walk through the history of civilisations.',
    body: 'An open-air park with life-size dinosaurs, then scenes from the history of humanity and the great religions, including a model of the Great Mosque of Kairouan. Cheesy and fun with four guys.',
  },
  belvedere: {
    name: 'Belvédère rocks: sunset', ar: 'البلفدير', lat: 33.9088, lon: 8.1107, kind: 'stop',
    photos: 'belvedere',
    summary: 'Climb the rocks for sunset over the palm grove and the chott.',
    body: 'A rocky outcrop at the edge of town with steps carved to the top. The view covers the whole palm grove and the salt flat behind it. Sunset is at 17:28. It is next to the memorial of the poet Abou el Kacem Chebbi, who was born in Tozeur.',
  },
  'mos-espa': {
    name: 'Mos Espa & Ong Jmel', ar: 'عنق الجمل', lat: 33.9943, lon: 7.8428, kind: 'activity', offRoute: true,
    photos: 'mos-espa', videos: ['PMZIEn-U_jQ', 'xISvvgAmNCI'],
    summary: 'Afternoon option: the full Mos Espa film set and the Camel Neck rock at sunset.',
    body: 'The Star Wars Episode I set of Mos Espa is still standing in the dunes north-west of Nefta, next to Ong Jmel ("camel\'s neck"), a rock shaped like a camel. Swap the zoo, Chak Wak and Belvédère for it: leave Tozeur at 14:30, 25 min to the Nefta Corbeille, 20 min more to Mos Espa, and stay at Ong Jmel for sunset at 17:28. Back in Tozeur in 40 min.',
    detour: '80 km loop from Tozeur, about 1 h 25 of driving',
    tips: ['The last kilometres are a sandy track: fine in dry weather with care, or hire a 4x4 with driver in Tozeur.'],
  },
  nefta: {
    name: 'Nefta Corbeille', ar: 'سلة نفطة', lat: 33.878, lon: 7.8745, kind: 'stop', offRoute: true,
    photos: 'nefta',
    summary: 'A palm-filled crater in the middle of Nefta. On the way to Mos Espa.',
    body: 'A deep, round depression full of palms, with the white domes of Nefta, the Sufi capital of the Jerid, around its rim. Fifteen minutes is enough.',
    detour: 'On the Mos Espa loop',
  },
  chebika: {
    name: 'Chebika', ar: 'الشبيكة', lat: 34.3231, lon: 7.941, kind: 'stop',
    photos: 'chebika', videos: ['9vkjK6TBBCY'],
    summary: 'Mountain oasis with a spring, a waterfall and a short canyon walk.',
    body: 'The old village was abandoned after the 1969 floods and its ruins sit above the oasis. A 30-minute loop takes you down to the spring and the small waterfall, then through a narrow canyon and back up with views over the chott.',
  },
  tamerza: {
    name: 'Tamerza: Grande Cascade', ar: 'تمغزة', lat: 34.3864, lon: 7.9335, kind: 'stop',
    photos: 'tamerza', videos: ['r0RCY_v8xVo'],
    summary: 'The largest mountain oasis, its waterfall and the ghost village.',
    body: 'Walk down to the Grande Cascade, then look across the wadi at the old village, also emptied by the 1969 floods. Its mud-brick houses and mosque still stand on the opposite bank.',
  },
  mides: {
    name: 'Midès canyon', ar: 'ميداس', lat: 34.4065, lon: 7.9205, kind: 'stop',
    photos: 'mides', videos: ['MXX3eQHb6a8'],
    summary: 'A deep gorge on the Algerian border, with a ghost village on its edge.',
    body: 'Layered cliffs drop straight into the wadi. The abandoned village of Midès sits right on the edge. Scenes of The English Patient were filmed here. Follow the path along the rim, but do not go near the border side.',
  },
  redeyef: {
    name: 'Redeyef', ar: 'الرديف', lat: 34.3843, lon: 8.1539, kind: 'drive',
    photos: 'phosphate',
    summary: 'Phosphate mining town. Drive through.',
    body: 'The road now crosses the Gafsa mining basin, the heart of Tunisia\'s phosphate industry, with mines and grey slag heaps around the towns.',
  },
  moulares: {
    name: 'Moularès (Om Laarayes)', ar: 'أم العرائس', lat: 34.4857, lon: 8.2734, kind: 'drive',
    photos: 'moulares',
    summary: 'Second mining town. Drive through towards Gafsa.',
    body: 'Fuel station on the main road (RR201) if needed.',
  },
  gafsa: {
    name: 'Gafsa: lunch & Roman pools', ar: 'قفصة', lat: 34.4224, lon: 8.7844, kind: 'meal',
    photos: 'gafsa', videos: ['jyh-lLMDb84'],
    summary: 'Lunch at Bistro 76, then the Roman pools in the centre.',
    body: 'Lunch at Bistro 76, from your draft. Afterwards, walk to the Roman pools (piscines romaines) in the centre, two stone basins fed by a spring since antiquity, next to the kasbah.',
    contacts: [{ label: 'Café Resto 76 (probably Bistro 76)', phone: '+216 28 639 726', source: 'Trip.com listing, name not confirmed' }],
  },
  kairouan: {
    name: 'Kairouan: makroudh stop', ar: 'القيروان', lat: 35.681, lon: 10.1006, kind: 'stop',
    photos: 'kairouan', videos: ['oUZtjMxcYp8'],
    summary: 'The holy city. Buy makroudh and see the Great Mosque lit up.',
    body: 'You pass in the late afternoon, after visiting hours (the mosque closes to visitors in the early afternoon), so this is a short stop: buy a box of makroudh (date-filled semolina cakes) for the people at home, and drive past the Great Mosque of Uqba, founded in 670 and one of the oldest mosques in Africa.',
  },
  'sousse-end': {
    name: 'Beach villa, Hammam Sousse', ar: 'حمام سوسة', lat: 35.884, lon: 10.6008, kind: 'night', approx: true,
    photos: 'stay-villa',
    summary: 'Back on the coast. Three nights in a beach villa near Port El Kantaoui, until Fri 13 Nov.',
    body: 'Booked on Airbnb: the "Beach floor villa near Port Kantaoui", hosted by Zied. Check-in from 15:00, so it is ready when you arrive. Unload, split the fuel money, and rest: you stay here until Friday 13 November (checkout by 13:00).',
    contacts: [{ label: 'Zied (host)', phone: '+49 176 21807949', source: 'Airbnb booking' }],
  },
};

export const days = [
  {
    id: 'd1', n: 1, date: '2026-11-07', weekday: 'Saturday', short: 'Sat 7 Nov',
    title: 'Coast to the ksour', from: 'Sousse', to: 'Tataouine',
    start: '07:30', sunrise: '06:42', sunset: '17:22',
    color: 'var(--d1)',
    stops: [
      ['sousse', 0], ['agareb', 15], ['chenini-gabes', 45], ['jara', 35], ['matmata-new', 0], ['matmata', 25],
      ['sidi-driss', 60], ['toujane', 20], ['dkhilet-toujane', 0], ['ksar-hallouf', 20], ['beni-khedache', 0], ['ksar-hadada', 20],
      ['tataouine-night', 0],
    ],
    note: 'Your 07:30 departure works: with Google Maps drive times you reach Ksar Hadada around 17:15, just before sunset (17:22), and the Airbnb in Tataouine about half an hour later, after dark. Do not let the Gabès stops run over.',
    night: 'n1',
  },
  {
    id: 'd2', n: 2, date: '2026-11-08', weekday: 'Sunday', short: 'Sun 8 Nov',
    title: 'Ksour, then the sand', from: 'Tataouine', to: 'Douz',
    start: '07:45', sunrise: '06:48', sunset: '17:26',
    color: 'var(--d2)',
    stops: [['tataouine-night', 0], ['chenini-tataouine', 60], ['guermessa', 30], ['ghomrassen', 30], ['ksar-ghilane', 105], ['douz', 0], ['douz-hotel', 10], ['douz-dune', 75], ['douz-night', 0]],
    note: 'Google Maps marks the direct Chenini to Ksar Ghilane track as closed, so the plan goes south first (Chenini, Guermessa), then back north to Ghomrassen and west on the paved C114 past Ksar Hallouf. You still reach Douz around 16:20, in time for the quad at sunset.',
    night: 'n2',
  },
  {
    id: 'd3', n: 3, date: '2026-11-09', weekday: 'Monday', short: 'Mon 9 Nov',
    title: 'Salt and dates', from: 'Douz', to: 'Tozeur',
    start: '09:00', sunrise: '06:54', sunset: '17:28',
    color: 'var(--d3)',
    stops: [
      ['douz-hotel', 0], ['chott', 30], ['tozeur-medina', 60], ['tozeriana', 75], ['tozeur-hotel', 25],
      ['paradis', 60], ['chakwak', 60], ['belvedere', 0],
    ],
    note: 'Shortest drive of the trip and a slow morning after the quad. The medina comes before lunch, the parks after. Afternoon option: Mos Espa and Ong Jmel at sunset (see below).',
    extras: ['mos-espa', 'nefta'],
    night: 'n3',
  },
  {
    id: 'd4', n: 4, date: '2026-11-10', weekday: 'Tuesday', short: 'Tue 10 Nov',
    title: 'Canyons, then home', from: 'Tozeur', to: 'Sousse',
    start: '07:30', sunrise: '06:56', sunset: '17:27',
    color: 'var(--d4)',
    stops: [
      ['tozeur-hotel', 0], ['chebika', 45], ['tamerza', 40], ['mides', 40], ['redeyef', 0], ['moulares', 0],
      ['gafsa', 75], ['kairouan', 30], ['sousse-end', 0],
    ],
    note: 'Longest day: 437 km. The mountain oases are done before noon, and everything after Gafsa is on main roads, so driving after dark is fine. The loop ends at the beach villa in Hammam Sousse, where you stay three more nights, until Friday 13 November.',
    night: 'n4',
  },
];

// Booked stays (confirmed 2 Nov 2026). `total` is what the four of you pay, in TND.
// Airbnb charged in euros: converted at 1 € ≈ 3.36 TND (the rate used for the car rental).
export const EUR_TND = 3.36;
export const nights = {
  n1: {
    label: 'Night 1 · Sat 7 Nov', area: 'Tataouine',
    options: [
      {
        id: 'tataouine', name: 'Airbnb in Tataouine', type: 'Airbnb · hosted by Braiek', lat: 32.9457, lon: 10.4678, approx: true,
        total: 280, approxPrice: true, pick: true, photos: 'stay-tataouine',
        via: 'Airbnb', checkin: 'Sat 7 Nov, evening', checkout: 'Sun 8 Nov, morning',
        meals: 'No meals booked',
        paid: 'About 70 TND per person (approximate)',
        phones: [],
        contact: 'Braiek, through the Airbnb app',
        web: 'https://www.airbnb.com/rooms/26702384',
        note: 'Listed as "tataouinelesbains". Airbnb only shows the neighbourhood, so the pin is approximate: get the exact address from Braiek in the app.',
      },
    ],
  },
  n2: {
    label: 'Night 2 · Sun 8 Nov', area: 'Douz',
    options: [
      {
        id: 'sahara', name: 'Hotel Sahara Douz', type: 'Hotel · tourist zone, by the dunes', lat: 33.4352, lon: 9.0201,
        total: 578, pick: true, photos: 'stay-sahara',
        via: 'Tunisiebooking.com', checkin: 'Sun 8 Nov, from 14:00', checkout: 'Mon 9 Nov, before 12:00',
        meals: 'Breakfast included (no dinner)',
        rooms: '1 double + 2 single standard rooms',
        paid: '94 TND paid online. Pay the other 484 TND at the hotel on arrival, plus the tourist tax',
        phones: [{ num: '+216 75 470 864', source: 'Tunisiebooking voucher' }],
        note: 'Booked in Marouane\'s name: print the voucher from his email and show it at check-in. Free cancellation until 4 Nov.',
      },
    ],
  },
  n3: {
    label: 'Night 3 · Mon 9 Nov', area: 'Tozeur',
    options: [
      {
        id: 'marabout', name: 'Marabout Guest House', type: 'Airbnb · whole house · hosted by Hedi', lat: 33.9185, lon: 8.1229,
        total: Math.round(115 * EUR_TND), eur: 115, pick: true, photos: 'stay-marabout',
        via: 'Airbnb', checkin: 'Mon 9 Nov, from 14:00', checkout: 'Tue 10 Nov, by 12:00',
        meals: 'No meals',
        paid: 'Paid: 115 €',
        phones: [{ num: '+216 96 999 477', source: 'Airbnb booking' }],
        contact: 'Hedi (host)',
        note: 'Free cancellation until 8 Nov at 14:00, then non-refundable.',
      },
    ],
  },
  n4: {
    label: 'Nights 4–6 · Tue 10 – Fri 13 Nov', area: 'Hammam Sousse', after: true,
    options: [
      {
        id: 'villa', name: 'Beach floor villa near Port El Kantaoui', type: 'Airbnb · whole house · hosted by Zied', lat: 35.884, lon: 10.6008, approx: true,
        total: Math.round(191.1 * EUR_TND), eur: 191.1, nightsCount: 3, pick: true, photos: 'stay-villa',
        via: 'Airbnb', checkin: 'Tue 10 Nov, from 15:00', checkout: 'Fri 13 Nov, by 13:00',
        meals: 'No meals',
        paid: 'Paid: 191.10 € for 3 nights (63.70 € a night)',
        phones: [{ num: '+49 176 21807949', source: 'Airbnb booking' }],
        contact: 'Zied (host)',
        note: 'No smoking inside. After the road trip: three nights by the sea.',
      },
    ],
  },
};

export const budget = {
  fuel: { pricePetrol: 2.525, priceDiesel: 2.205, consumption: 7.5, bufferPct: 5 },
  tolls: 8, // A1 Sousse → Gabès, one way. Estimate: check at the booth.
  // per person
  meals: [
    { label: 'Coffee & snack, Agareb', pp: 8 },
    { label: 'Lunch, Sidi Driss (Matmata)', pp: 35 },
    { label: 'Dinner, Tataouine', pp: 20 },
    { label: 'Lunch in a camp, Ksar Ghilane', pp: 35 },
    { label: 'Dinner, Douz', pp: 20 },
    { label: 'Lunch, Tozeriana (Tozeur)', pp: 40 },
    { label: 'Dinner, Tozeur', pp: 20 },
    { label: 'Lunch, Bistro 76 (Gafsa)', pp: 30 },
    { label: 'Water, coffees, snacks (4 days)', pp: 60 },
  ],
  activities: [
    { label: 'Entries & tips (Matmata house, Chenini guide, Chak Wak, zoo…)', pp: 45 },
    { label: 'Ksar Ghilane hot spring & dunes', pp: 0 },
  ],
  quad: { quads: 4, hours: 1.5, pricePerQuadHour: 70 },
  tiers: { budget: 0.75, normal: 1, comfort: 1.35 },
};

// Car rental for 4 days (Sat 7 → Tue 10 Nov 2026). Reserved: the Mahindra XUV 3XO from Marrak, 120 DT/day.
export const rental = {
  days: 4,
  searched: '4 days, Sat 7 → Tue 10 Nov. XUV 3XO reserved with Marrak',
  hours: 'Fix with Marrak where and when you collect the XUV 3XO (Saturday around 07:00 in Sousse is ideal) and where you return it on Tuesday evening.',
  groups: [{ id: 'local', title: 'Reserved' }],
  cars: [
    {
      id: 'xuv3xo', group: 'local', name: 'Mahindra XUV 3XO', cls: 'Compact SUV · new car · 1.2 turbo petrol', pick: true, photos: 'm-xuv3xo',
      gearbox: 'Ask Marrak', seats: 5, trunk: '≈ 364 L', fuel: 'petrol', consumption: 6.5,
      offers: [{ by: 'Marrak · reserved (120 DT/day)', total: 480 }],
      verdict: 'Reserved: a brand-new SUV from Marrak, 120 DT a day.',
      good: ['New car, launched in Tunisia in 2026', 'SUV height for the mountain roads and sand drifts'],
      bad: ['Boot is fine for four soft bags, tight for hard suitcases', 'Not a 4x4: stay out of deep sand'],
    },
  ],
  agencies: [
    {
      name: 'Marrak', where: 'Your contact for the new Mahindra XUV 3XO', web: null,
      phones: [],
      prices: 'XUV 3XO reserved: 120 DT a day, 480 DT for the 4 days',
      deposit: 'Ask',
      note: 'Ask what the 120 DT includes (insurance, unlimited km, second driver), the gearbox, and where you collect and return the car.',
    },
  ],
};

// Driving time (minutes) and distance (km) per leg, read from Google Maps on 23 Oct 2026.
// Legs added with the 2 Nov bookings (to and from the Tataouine Airbnb, Kairouan → Hammam Sousse) use OSRM.
// The Chott stop is not routable on Google: Douz → Tozeur (124 min, 129 km) is split in two.
export const googleLegs = {
  'sousse>agareb': [91, 135], 'agareb>chenini-gabes': [87, 145], 'chenini-gabes>jara': [13, 6.2], 'jara>matmata-new': [31, 27],
  'matmata-new>matmata': [20, 15.9], 'sidi-driss>toujane': [35, 26.2], 'toujane>dkhilet-toujane': [13, 9.1],
  'dkhilet-toujane>ksar-hallouf': [31, 22.7], 'ksar-hallouf>beni-khedache': [14, 7.9], 'beni-khedache>ksar-hadada': [30, 24.7],
  'chenini-tataouine>guermessa': [26, 27], 'guermessa>ghomrassen': [15, 11.8],
  'ghomrassen>ksar-ghilane': [115, 122], 'ksar-ghilane>douz': [99, 143], 'douz>douz-hotel': [6, 3],
  'douz-hotel>chott': [85, 86], 'chott>tozeur-medina': [40, 43],
  'tozeur-hotel>chebika': [53, 56], 'chebika>tamerza': [18, 14], 'tamerza>mides': [15, 9], 'mides>redeyef': [27, 25],
  'redeyef>moulares': [19, 17.3], 'moulares>gafsa': [49, 53.7], 'gafsa>kairouan': [195, 199],
  'tozeur-hotel>nefta': [25, 24.8], 'nefta>mos-espa': [19, 15.9], 'mos-espa>tozeur-hotel': [40, 40],
};

// Points the road must go through (not stops), so the drawn route follows the paved road.
export const viaPoints = {
  // north to Beni Khedache, then west on the C114 to the C211, then south to Ksar Ghilane
  'ghomrassen>ksar-ghilane': [[33.2514, 10.2001], [33.27, 9.7]],
};
