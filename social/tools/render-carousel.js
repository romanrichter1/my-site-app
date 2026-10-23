// Usage (from repo root):
//   NODE_PATH=$(npm root -g) node social/tools/render-carousel.js social/carousels/<name>/index.html
// Every <section class="slide"> (any size, carousels 1080×1440) becomes 01.jpg, 02.jpg … next to the HTML.
// JPEG on purpose: Instagram rejects PNG carousels via API and recompresses them in-app anyway.
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const page = path.resolve(process.argv[2]);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(`file://${page}`, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready.then(() => {}));
  const slides = await p.$$('section.slide');
  const dir = path.dirname(page);
  for (const f of fs.readdirSync(dir)) if (/^\d\d\.jpg$/.test(f)) fs.rmSync(path.join(dir, f));
  for (const [i, s] of slides.entries()) {
    await s.screenshot({ path: path.join(dir, `${String(i + 1).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 92 });
  }
  await b.close();
  console.log(`${slides.length} slides → ${dir}`, errs.length ? errs : '');
})();
