// Usage (from repo root):
//   python3 -m http.server 8790 &
//   NODE_PATH=$(npm root -g) node social/tools/render-reel.js social/reels/<name>/index.html out.mp4 [seconds] [workers]
// The page must expose window.TL (paused GSAP timeline) and window.READY (fonts promise).
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), os = require('os'), path = require('path');
const [,, page, out, secsArg, workersArg] = process.argv;
const FPS = 30, W = +(workersArg || 4);
(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'reel-'));
  const b = await chromium.launch();
  const probe = await b.newPage();
  await probe.goto(`http://localhost:8790/${page}`, { waitUntil: 'load' });
  const secs = +(secsArg || await probe.evaluate(() => window.TL.duration()));
  await probe.close();
  const n = Math.round(FPS * secs) + 1, errs = [];
  await Promise.all(Array.from({ length: W }, async (_, w) => {
    const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
    p.on('pageerror', e => errs.push(e.message));
    await p.goto(`http://localhost:8790/${page}`, { waitUntil: 'load' });
    await p.evaluate(() => window.READY.then(() => {}));
    const from = Math.floor(n * w / W), to = Math.floor(n * (w + 1) / W);
    // Seek must not return the timeline: Playwright would try to serialise it and hang.
    for (let i = 0; i < from; i += 15) await p.evaluate(t => { window.TL.seek(t, false); }, i / FPS);
    for (let i = from; i < to; i++) {
      await p.evaluate(t => { window.TL.seek(t, false); }, i / FPS);
      await p.screenshot({ path: `${dir}/f${String(i).padStart(4, '0')}.png` });
    }
  }));
  await b.close();
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-framerate', String(FPS), '-i', `${dir}/f%04d.png`,
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'slow', '-movflags', '+faststart', out]);
  fs.rmSync(dir, { recursive: true });
  console.log(`${out}: ${n} frames, ${secs}s`, errs.length ? errs : '');
})();
