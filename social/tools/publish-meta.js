#!/usr/bin/env node
// Publikace na Instagram + Facebook stránku přes Meta Graph API (bez závislostí, Node 18+).
//
//   node social/tools/publish-meta.js check
//   node social/tools/publish-meta.js reel <video.mp4> --caption "…" [--ig] [--fb] [--publish]
//   node social/tools/publish-meta.js carousel <img1.jpg> <img2.jpg> … --caption "…" [--ig] [--fb] [--publish]
//
// Bez --publish jen vypíše, co by udělal (dry run). Bez --ig/--fb publikuje na obě sítě.
// Carousel: IG bere jen JPEG přes veřejnou URL. Lokální soubory se převedou na
// raw.githubusercontent.com URL — musí být commitnuté a pushnuté (repo je veřejné).
//
// Env: META_PAGE_TOKEN (dlouhodobý token stránky), META_PAGE_ID, META_IG_USER_ID,
//      volitelně META_GRAPH_VERSION (default v23.0), GITHUB_RAW_BASE.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const V = process.env.META_GRAPH_VERSION || 'v23.0';
const GRAPH = `https://graph.facebook.com/${V}`;
const TOKEN = process.env.META_PAGE_TOKEN;
const PAGE = process.env.META_PAGE_ID;
const IG = process.env.META_IG_USER_ID;

function parseArgs(argv) {
  const out = { _: [], caption: '', ig: false, fb: false, publish: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--caption') out.caption = argv[++i] || '';
    else if (a === '--caption-file') out.caption = fs.readFileSync(argv[++i], 'utf8').trim();
    else if (a === '--ig') out.ig = true;
    else if (a === '--fb') out.fb = true;
    else if (a === '--publish') out.publish = true;
    else out._.push(a);
  }
  if (!out.ig && !out.fb) out.ig = out.fb = true;
  return out;
}

async function graph(method, endpoint, params = {}) {
  const url = new URL(endpoint.startsWith('http') ? endpoint : `${GRAPH}/${endpoint}`);
  const body = new URLSearchParams({ ...params, access_token: TOKEN });
  const res = method === 'GET'
    ? await fetch(`${url}?${body}`)
    : await fetch(url, { method, body });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(`${method} ${endpoint}: ${JSON.stringify(json.error || json)}`);
  return json;
}

async function rupload(uploadUrl, file) {
  const data = fs.readFileSync(file);
  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: { Authorization: `OAuth ${TOKEN}`, offset: '0', file_size: String(data.length) },
    body: data,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(`upload: ${res.status} ${JSON.stringify(json)}`);
  return json;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// IG zpracovává média asynchronně — publikovat jde až po FINISHED.
async function waitForContainer(id) {
  for (let i = 0; i < 60; i++) {
    const { status_code, status } = await graph('GET', id, { fields: 'status_code,status' });
    if (status_code === 'FINISHED') return;
    if (status_code === 'ERROR' || status_code === 'EXPIRED') throw new Error(`kontejner ${id}: ${status}`);
    await sleep(5000);
  }
  throw new Error(`kontejner ${id}: zpracování trvá přes 5 min`);
}

function rawUrl(file) {
  if (/^https?:\/\//.test(file)) return file;
  const base = process.env.GITHUB_RAW_BASE || (() => {
    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    return `https://raw.githubusercontent.com/romanrichter1/my-site-app/${branch}`;
  })();
  const rel = path.relative(execSync('git rev-parse --show-toplevel').toString().trim(), path.resolve(file));
  return `${base}/${rel.split(path.sep).map(encodeURIComponent).join('/')}`;
}

async function igReel(file, caption) {
  const c = await graph('POST', `${IG}/media`, {
    media_type: 'REELS', upload_type: 'resumable', caption, share_to_feed: 'true',
  });
  await rupload(c.uri, file);
  await waitForContainer(c.id);
  const { id } = await graph('POST', `${IG}/media_publish`, { creation_id: c.id });
  return id;
}

async function fbReel(file, caption) {
  const { video_id, upload_url } = await graph('POST', `${PAGE}/video_reels`, { upload_phase: 'start' });
  await rupload(upload_url, file);
  await graph('POST', `${PAGE}/video_reels`, {
    upload_phase: 'finish', video_id, video_state: 'PUBLISHED', description: caption,
  });
  return video_id;
}

async function igCarousel(urls, caption) {
  const children = [];
  for (const image_url of urls) {
    children.push((await graph('POST', `${IG}/media`, { image_url, is_carousel_item: 'true' })).id);
  }
  for (const id of children) await waitForContainer(id);
  const c = await graph('POST', `${IG}/media`, { media_type: 'CAROUSEL', children: children.join(','), caption });
  await waitForContainer(c.id);
  return (await graph('POST', `${IG}/media_publish`, { creation_id: c.id })).id;
}

async function fbCarousel(urls, caption) {
  const params = { message: caption };
  for (const [i, url] of urls.entries()) {
    const { id } = await graph('POST', `${PAGE}/photos`, { url, published: 'false' });
    params[`attached_media[${i}]`] = JSON.stringify({ media_fbid: id });
  }
  return (await graph('POST', `${PAGE}/feed`, params)).id;
}

async function check() {
  const page = await graph('GET', PAGE, { fields: 'name,instagram_business_account' });
  const ig = await graph('GET', IG, { fields: 'username,followers_count,media_count' });
  const limit = await graph('GET', `${IG}/content_publishing_limit`, { fields: 'quota_usage,config' });
  console.log(`FB stránka: ${page.name} (IG propojený: ${page.instagram_business_account?.id === IG ? 'ano' : 'NE'})`);
  console.log(`Instagram: @${ig.username}, ${ig.followers_count} sledujících, ${ig.media_count} příspěvků`);
  console.log(`Limit API publikací za 24 h: ${JSON.stringify(limit.data?.[0] || limit)}`);
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const a = parseArgs(rest);
  if (!TOKEN || !PAGE || !IG) throw new Error('Chybí META_PAGE_TOKEN / META_PAGE_ID / META_IG_USER_ID.');

  if (cmd === 'check') return check();

  if (cmd === 'reel') {
    const file = a._[0];
    if (!file || !fs.existsSync(file)) throw new Error('Zadejte cestu k MP4.');
    const mb = (fs.statSync(file).size / 1e6).toFixed(1);
    console.log(`Reel ${file} (${mb} MB) → ${[a.ig && 'IG', a.fb && 'FB'].filter(Boolean).join(' + ')}\nPopisek:\n${a.caption}\n`);
    if (!a.publish) return console.log('Dry run — přidejte --publish.');
    if (a.ig) console.log('IG media id:', await igReel(file, a.caption));
    if (a.fb) console.log('FB video id:', await fbReel(file, a.caption));
    return;
  }

  if (cmd === 'carousel') {
    if (a._.length < 2 || a._.length > 10) throw new Error('Carousel potřebuje 2–10 obrázků.');
    const bad = a._.filter((f) => !/\.jpe?g$/i.test(f));
    if (bad.length) throw new Error(`Instagram bere jen JPEG: ${bad.join(', ')}`);
    const urls = a._.map(rawUrl);
    console.log(`Carousel (${urls.length}) → ${[a.ig && 'IG', a.fb && 'FB'].filter(Boolean).join(' + ')}\n${urls.join('\n')}\nPopisek:\n${a.caption}\n`);
    if (!a.publish) return console.log('Dry run — přidejte --publish.');
    if (a.ig) console.log('IG media id:', await igCarousel(urls, a.caption));
    if (a.fb) console.log('FB post id:', await fbCarousel(urls, a.caption));
    return;
  }

  throw new Error('Příkaz: check | reel | carousel');
}

main().catch((e) => { console.error(e.message); process.exit(1); });
