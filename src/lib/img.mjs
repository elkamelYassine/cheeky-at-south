// Responsive image helpers for entries of src/data/photos.json (built by scripts/enhance.mjs).
const base = (p) => p.src.replace(/\.jpg$/, '');

// "…-640.webp 640w, …-1200.webp 1200w, …" or '' when the photo has no webp set
export const webpSrcset = (p) => (p?.webp?.length ? p.webp.map((w) => `${base(p)}-${w}.webp ${w}w`).join(', ') : '');

// largest version, for the lightbox
export const fullSrc = (p) => (p?.webp?.length ? `${base(p)}-${p.webp.at(-1)}.webp` : p.src);
