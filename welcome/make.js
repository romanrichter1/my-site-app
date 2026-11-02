// Usage: node welcome/make.js welcome/clients/<slug>.json  → welcome/out/welcome-<slug>.{png,pdf}
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const cfgPath = path.resolve(process.argv[2] || '');
if (!fs.existsSync(cfgPath)) { console.error('Usage: node welcome/make.js welcome/clients/<slug>.json'); process.exit(1); }
const c = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const slug = path.basename(cfgPath, '.json');
const dir = __dirname;
const outDir = path.join(dir, 'out');
fs.mkdirSync(outDir, { recursive: true });

const call = c.call ? `  <div class="call">
    <div>
      <div class="t">${c.call.title}</div>
      <p>${c.call.text}</p>
    </div>
    <div class="tel">${c.call.phone}</div>
  </div>
` : '';
const steps = c.steps.map(([t, x], i) =>
  `    <div class="step"><div class="num">${i + 1}</div><div><b>${t}</b><span>${x}</span></div></div>\n`).join('');

const html = fs.readFileSync(path.join(dir, 'template.html'), 'utf8')
  .replace(/{{assets}}/g, path.join(dir, '..', 'assets'))
  .replace(/{{call}}/g, call)
  .replace(/{{steps}}/g, steps)
  .replace(/{{(\w+)}}/g, (_, k) => c[k] ?? '');

const htmlPath = path.join(outDir, `welcome-${slug}.html`);
fs.writeFileSync(htmlPath, html);

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 3 });
  await p.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const overflow = await p.evaluate(() => {
    const page = document.querySelector('.page').getBoundingClientRect();
    const foot = document.querySelector('.foot').getBoundingClientRect();
    return Math.ceil(foot.bottom - page.bottom);
  });
  await p.screenshot({ path: path.join(outDir, `welcome-${slug}.png`) });
  await p.pdf({ path: path.join(outDir, `welcome-${slug}.pdf`), format: 'A4', printBackground: true });
  await b.close();
  fs.unlinkSync(htmlPath);
  if (overflow > 0) { console.error(`POZOR: obsah přetéká o ${overflow}px — zkrať texty.`); process.exit(2); }
  console.log(`OK → welcome/out/welcome-${slug}.png + .pdf`);
})();
