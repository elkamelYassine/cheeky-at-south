// Downloads the chosen Wikimedia Commons photos and writes src/data/photos.json (with credits).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const SCR = process.argv[2];
const all = { ...JSON.parse(readFileSync(SCR + '/commons.json', 'utf8')), ...JSON.parse(readFileSync(SCR + '/commons2.json', 'utf8')) };
const byTitle = {};
for (const list of Object.values(all)) for (const p of list) byTitle[p.title.slice(5)] = p;
const pick = {
  sousse: ['Medina of Sousse, Sousse Governorate, Tunisia, January 2024 - Ribat Fortress.jpg'],
  agareb: ['Agareb, aerial view.jpg'],
  'chenini-gabes': ['Palmier pour le legmi oasis Gabès.JPG', 'Tunisie. Cascade de Chennini, dans l\'oasis de Gabès - (mission) Blanc ; (photogr.) Blanc ; '],
  jara: ['Feuilles de hénné Gabès Tunisie souk Jara 01.jpg', 'Grande mosquée de Gabès.jpg', 'Ouzef poissons secs Gabès Tunisie souk Jara.jpg'],
  'matmata-new': ['Matmata Nouvelle, Tunisia - panoramio.jpg'],
  matmata: ['Tunisia-3574 - Matmata Scenery (8001302218).jpg', 'Troglodyte Homes, Matmata (150108) (9461126569).jpg', 'Star Wars Panorama at Matmata - panoramio.jpg'],
  'sidi-driss': ['Hôtel Sidi Driss, Starwars, Tunisie, 20220325 140111.jpg', 'Hôtel, Sidi Driss, Star Wars, mars 2022, DSC 2269.jpg'],
  toujane: ['Les monts de Toujane.jpg', 'Toujane (wide angle).jpg'],
  'ksar-hallouf': ['Ksar el Hallouf Médenine.jpg', 'Ksar el-Hallouf overlook.jpg'],
  'beni-khedache': ['Ksar Beni Khedache 01.jpg', 'Beni Khedache.jpg'],
  'ksar-hadada': ['Ksar Hadada intérieur.jpg', 'Views of Ksar Hadada from the minaret of the mosque-4.jpg'],
  guermessa: ['Old Village of Guermessa at Sunset, Tataouine, Tunisia.jpg', 'Historic Village of Guermessa, Tataouine, Tunisia.jpg'],
  'chenini-tataouine': ['Village troglodytique de Chenini - Tataouine (5405383855).jpg', 'Mosquée au village troglodytique de Chenini - Tataouine (5407518536).jpg'],
  'ksar-ghilane': ['Ksar Ghilane, Tunisia (Unsplash).jpg', 'Ksar Ghilane (4103846788).jpg', 'Castellum Tisavar (Ksar Rhilane, Ksar Ghilane), Tunisia.jpg'],
  douz: ['Camels at Festival of the Sahara.jpg', 'Sahara Festival Douz 02.JPG'],
  mehari: ['Tunisia 2007, Mehari Hotel in Douz, sulfur pool - panoramio.jpg'],
  chott: ['Barque sur une mer de sel à Chott Jrid.jpg', 'Chott el jerid.jpg'],
  tozeur: ['Medina de Tozeur 04.jpg', 'Medina de Tozeur 09.jpg', 'Une grappe de datte avant la récolte , palmeraie de tozeur - tunisie.jpg'],
  'tozeur-zoo': ['Zoo du paradis, tozeur, Tunisie, mars 2022 DSC 2153.jpg', 'Dromadaire Tozeur.jpg'],
  chakwak: ['Parc Chak Wak Tozeur 02.jpg', 'Modèle de la Grande Mosquée de Kairouan au parc Chak Wak, Tozeur.jpg'],
  'ras-el-ain': ['Ras El Aïn Park (Tozeur Park) 01.jpg'],
  'dar-cherait': ['Musée Dar Cheraït Tozeur 01.jpg'],
  'mos-espa': ['Ong Jmel, Mos Espa, Star Wars set, Nefta, Tunisie DSC 1997.jpg', 'Ong Jmel, Mos Espa, Star Wars set, Nefta, Tunisie DSC 2017.jpg'],
  nefta: ['Corbeille de Nefta, Tunisie, DSC 2125.jpg'],
  chebika: ['Oasis Chebika 1.jpg', 'Chebika oasis de tunisie.jpg'],
  tamerza: ['Vues de Tamerza, grande cascade, Tozeur, DSC 1887.jpg', 'Vues de Tamerza, grande cascade, Tozeur, DSC 1867.jpg'],
  mides: ['MID - Oasis and cliffs at Mides Canyon, Tunisia, 2023.jpg', 'Mides Canyon - Mides, Tunisia 01.jpg'],
  redeyef: ['Redeyef.jpg'],
  moulares: ['Moularès.jpg'],
  selja: ['Selja02(js).jpg', 'Le lézard rouge (39).jpg'],
  gafsa: ['Piscines romaines de Gafsa, juin 2013.jpg', 'Roman pools Gafsa -01.jpg'],
  kairouan: ['The Minaret of the Great Mosque Okba of Kairouan, Tunisia.jpg', 'Arcades of the Great Mosque Okba of Kairouan.jpg'],
  'ouled-soltane': ['Ksar Ouled Soltane Vue 3.jpg', 'Ksar Ouled Soltane 26.jpg'],
  'ouled-debbab': ['Ksar Ouled Debbab 21.jpg'],
};
const out = {};
for (const [k, titles] of Object.entries(pick)) {
  out[k] = [];
  for (const [i, t] of titles.entries()) {
    const p = byTitle[t] || Object.values(byTitle).find((x) => x.title.startsWith('File:' + t));
    if (!p) { console.log('MISSING', k, t); continue; }
    const file = `/img/${k}-${i + 1}.jpg`;
    const dest = new URL('../public' + file, import.meta.url);
    if (!existsSync(dest)) {
      for (let a = 0; a < 4; a++) {
        const r = await fetch(p.thumb, { headers: { 'User-Agent': 'cheeky-at-south/1.0 (trip site)' } });
        if (r.ok) { writeFileSync(dest, Buffer.from(await r.arrayBuffer())); break; }
        console.log('retry', r.status, k); await new Promise((r) => setTimeout(r, 8000));
      }
      await new Promise((r) => setTimeout(r, 700));
    }
    out[k].push({ src: file, w: 1400, h: Math.round((1400 * p.h) / p.w), credit: p.artist || 'Wikimedia Commons', license: p.license, page: p.page });
  }
}
writeFileSync(new URL('../src/data/photos.json', import.meta.url), JSON.stringify(out, null, 1));
console.log('done', Object.values(out).flat().length);
