CSS = r'''
  :root { --bone: #F7F5EF; --bone2: #EFEDE6; --ink: #0A0A0A; --ink5: #5E5E63; --ink3: #A1A1A6; --lime: #C5E832; --red: #C2410C; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #bbb; font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif; color: var(--ink); }
  .disp { font-family: 'Fraunces', Georgia, serif; font-weight: 400; letter-spacing: -0.025em; font-variation-settings: "opsz" 144; }
  em { font-style: italic; color: var(--ink5); }
  b.k { font-weight: 700; color: var(--ink); }

  /* 1080×1440, safe zone 180 top/bottom, ≥50 left, ≥120 right */
  .slide { position: relative; width: 1080px; height: 1440px; overflow: hidden; background: var(--bone); padding: 180px 120px 180px 90px; display: flex; flex-direction: column; justify-content: center; }
  .slide + .slide { margin-top: 20px; }
  .slide > * { flex-shrink: 0; }
  .glow { position: absolute; width: 1300px; height: 1300px; left: -380px; top: -520px; border-radius: 50%; background: radial-gradient(closest-side, rgba(197,232,50,.28), rgba(197,232,50,0)); pointer-events: none; }
  .logo { position: absolute; left: 90px; top: 78px; height: 48px; }
  .num { position: absolute; right: 120px; top: 84px; font-size: 32px; font-weight: 600; color: var(--ink3); font-variant-numeric: tabular-nums; }
  .swipe { position: absolute; right: 120px; bottom: 96px; display: inline-flex; align-items: center; gap: 16px; font-size: 36px; font-weight: 600; color: var(--ink5); }
  .swipe svg { width: 46px; height: 46px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
  .src { position: absolute; left: 90px; bottom: 100px; font-size: 26px; color: var(--ink3); max-width: 760px; }
  .tag { margin-top: 22px; font-size: 26px; color: var(--ink3); }

  .h1 { font-size: 146px; line-height: .97; }
  .h2 { font-size: 112px; line-height: 1.0; }
  .h3 { font-size: 100px; line-height: 1.0; }
  .lead { margin-top: 44px; font-size: 46px; line-height: 1.3; color: var(--ink5); }
  .mark { background: linear-gradient(transparent 62%, var(--lime) 62%, var(--lime) 92%, transparent 92%); font-style: normal; color: var(--ink); }
  .pill { align-self: flex-start; display: inline-flex; align-items: center; gap: 14px; padding: 18px 32px; border-radius: 999px; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,.06); font-size: 36px; font-weight: 600; margin-bottom: 44px; }
  .pill i { width: 16px; height: 16px; border-radius: 50%; background: var(--lime); }

  /* dark */
  .dark { background: var(--ink); color: #fff; }
  .dark em { color: var(--lime); }
  .dark .num { color: rgba(255,255,255,.4); }
  .dark .swipe { color: rgba(255,255,255,.75); }
  .dark .lead { color: rgba(255,255,255,.72); }
  .dark .tag, .dark .src { color: rgba(255,255,255,.35); }
  .dark .glow { left: auto; right: -560px; top: auto; bottom: -620px; }

  /* cover notification */
  .notif { transform: rotate(-1.6deg); margin-top: 80px; padding: 36px 40px 40px; border-radius: 48px; background: rgba(255,255,255,.95); color: var(--ink); box-shadow: 0 40px 120px rgba(0,0,0,.5); }
  .notif .top { display: flex; align-items: center; gap: 18px; font-size: 32px; font-weight: 600; color: var(--ink5); }
  .notif .app { width: 58px; height: 58px; border-radius: 15px; background: var(--ink); display: inline-flex; align-items: center; justify-content: center; color: var(--lime); font-family: 'Fraunces', serif; font-size: 42px; line-height: 1; }
  .notif .app.g { background: #fff; border: 2px solid var(--bone2); color: #4285F4; font-family: inherit; font-weight: 800; font-size: 36px; }
  .notif .app.m { background: #2F7CF6; }
  .notif .top time { margin-left: auto; color: var(--ink3); }
  .notif b { display: block; margin-top: 22px; font-size: 46px; }
  .notif p { margin-top: 10px; font-size: 44px; line-height: 1.3; }

  /* transition slide */
  .gain { margin-top: 60px; display: grid; gap: 28px; }
  .gain div { display: flex; gap: 30px; align-items: center; padding: 38px 44px; border-radius: 40px; background: #fff; box-shadow: 0 20px 50px rgba(0,0,0,.06); font-size: 46px; line-height: 1.25; font-weight: 600; }
  .gain span { flex: 0 0 76px; height: 76px; border-radius: 50%; background: var(--lime); display: inline-flex; align-items: center; justify-content: center; font-size: 38px; font-weight: 800; }

  /* steps + card */
  .steps { margin-top: 50px; display: grid; gap: 22px; }
  .step { display: flex; align-items: center; gap: 28px; font-size: 46px; font-weight: 600; line-height: 1.2; }
  .step b { flex: 0 0 72px; height: 72px; border-radius: 50%; background: var(--bone2); display: inline-flex; align-items: center; justify-content: center; font-size: 32px; color: var(--ink5); }
  .card { margin-top: 48px; padding: 40px 48px; border-radius: 44px; background: #fff; box-shadow: 0 30px 80px rgba(0,0,0,.08); }
  .card small { display: block; font-size: 30px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; color: var(--ink3); }
  .card p { margin-top: 12px; font-size: 48px; line-height: 1.22; font-weight: 600; }
  .dark .card { background: #1D1D1F; box-shadow: none; border: 3px solid rgba(255,255,255,.12); }
  .dark .card p { color: #fff; }

  /* big number */
  .big { font-size: 420px; line-height: .85; letter-spacing: -0.05em; margin-top: 50px; }
  .big span { font-size: 200px; }
  .dark .big { color: var(--lime); }

  /* compare */
  .cmp { margin-top: 60px; border-radius: 44px; overflow: hidden; background: #fff; box-shadow: 0 30px 80px rgba(0,0,0,.08); }
  .cmp .row { display: grid; grid-template-columns: 1fr 170px 170px; align-items: center; padding: 30px 44px; border-top: 2px solid var(--bone2); font-size: 42px; font-weight: 600; }
  .cmp .row.hd { border-top: 0; background: var(--ink); color: #fff; font-size: 32px; font-weight: 700; padding: 26px 44px; }
  .cmp .row.hd span:last-child { color: var(--lime); }
  .cmp .row > span:not(:first-child) { text-align: center; }
  .no, .yes { display: inline-flex; width: 64px; height: 64px; border-radius: 50%; align-items: center; justify-content: center; }
  .no { background: var(--bone2); } .yes { background: var(--lime); }
  .no svg, .yes svg { width: 34px; height: 34px; fill: none; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
  .no svg { stroke: var(--ink3); } .yes svg { stroke: var(--ink); }

  /* example box */
  .ex { margin-top: 60px; display: flex; gap: 28px; align-items: flex-start; padding: 44px 48px; border-radius: 44px; background: var(--ink); color: #fff; }
  .ex svg { flex: 0 0 60px; width: 60px; height: 60px; fill: none; stroke: var(--lime); stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; margin-top: 4px; }
  .ex p { font-size: 46px; line-height: 1.3; font-weight: 500; }
  .ex p b { color: var(--lime); font-weight: 600; }
  .idx { display: inline-flex; align-items: center; justify-content: center; width: 100px; height: 100px; border-radius: 50%; background: var(--lime); font-size: 46px; font-weight: 700; margin-bottom: 40px; }

  /* timeline */
  .tl { margin-top: 60px; display: grid; gap: 0; }
  .tl div { position: relative; display: flex; gap: 34px; padding-bottom: 40px; }
  .tl div::before { content: ""; position: absolute; left: 25px; top: 54px; bottom: 0; width: 4px; background: rgba(255,255,255,.18); }
  .tl div:last-child::before { display: none; }
  .tl i { flex: 0 0 54px; height: 54px; border-radius: 50%; background: var(--lime); }
  .tl time { display: block; font-size: 34px; font-weight: 700; color: var(--lime); }
  .tl p { margin-top: 6px; font-size: 46px; line-height: 1.25; font-weight: 600; color: #fff; }

  /* quote */
  .quote { font-size: 150px; line-height: .98; }
  .quote small { display: block; margin-top: 60px; font-family: -apple-system, "Inter", sans-serif; font-size: 40px; letter-spacing: 0; color: var(--ink5); font-weight: 600; }
  .dark .quote small { color: rgba(255,255,255,.55); }

  /* google */
  .stars { display: inline-flex; gap: 6px; vertical-align: -4px; }
  .stars svg { width: 40px; height: 40px; }
  .stars .on { fill: #F5B400; } .stars .off { fill: #DADCE0; }
  .gcard { display: flex; align-items: center; gap: 32px; padding: 44px 48px; border-radius: 44px; background: #fff; box-shadow: 0 30px 80px rgba(0,0,0,.08); }
  .gcard + .gcard { margin-top: 30px; }
  .gcard .pic { flex: 0 0 128px; height: 128px; border-radius: 30px; background: var(--bone2); display: inline-flex; align-items: center; justify-content: center; }
  .gcard .pic svg { width: 64px; height: 64px; fill: none; stroke: var(--ink3); stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  .gcard h4 { font-size: 50px; font-weight: 700; }
  .gcard .r { margin-top: 10px; display: flex; align-items: center; gap: 14px; font-size: 44px; font-weight: 600; color: var(--ink5); }
  .gcard .r b { color: var(--ink); }
  .gcard.win { outline: 8px solid var(--lime); }
  .gcard.lose { opacity: .55; }

  /* mail / quote */
  .mail { margin-top: 56px; border-radius: 44px; background: #fff; box-shadow: 0 30px 80px rgba(0,0,0,.10); overflow: hidden; color: var(--ink); }
  .mail .hd { display: flex; justify-content: space-between; align-items: baseline; gap: 20px; padding: 34px 48px; border-bottom: 2px solid var(--bone2); }
  .mail .hd small { font-size: 30px; color: var(--ink3); font-weight: 600; }
  .mail .hd b { font-size: 32px; color: var(--ink5); }
  .mail .bd { padding: 40px 48px 46px; font-size: 42px; line-height: 1.36; color: #2a2a2d; }
  .mail .btn { display: inline-flex; align-items: center; gap: 16px; margin-top: 34px; padding: 26px 40px; border-radius: 999px; background: var(--ink); color: #fff; font-size: 38px; font-weight: 700; }
  .kv { display: flex; justify-content: space-between; gap: 30px; font-size: 40px; line-height: 1.25; padding: 14px 0; }
  .kv span { color: var(--ink5); } .kv b { font-weight: 600; white-space: nowrap; }
  .kv.sum { margin-top: 14px; padding-top: 26px; border-top: 2px solid var(--bone2); font-size: 50px; }
  .kv.sum b { font-weight: 800; } .kv.sum span { color: var(--ink); font-weight: 700; }
  .note { margin-top: 10px; font-size: 32px; color: var(--ink3); }
  .timer { align-self: flex-start; display: inline-flex; align-items: center; gap: 16px; padding: 20px 32px; border-radius: 999px; background: var(--lime); color: var(--ink); font-size: 38px; font-weight: 700; }
  .timer svg { width: 42px; height: 42px; fill: none; stroke: var(--ink); stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
  .chips { margin-top: 36px; display: flex; flex-wrap: wrap; gap: 18px; }
  .chips span { display: inline-flex; align-items: center; gap: 12px; padding: 20px 28px; border-radius: 999px; background: var(--ink); color: #fff; font-size: 38px; font-weight: 600; }
  .chips span i { width: 14px; height: 14px; border-radius: 50%; background: var(--lime); }
  .lbl { margin-top: 56px; font-size: 32px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; color: var(--ink3); }

  .bubble { margin-top: 40px; padding: 42px 48px; border-radius: 44px; font-size: 44px; line-height: 1.3; font-weight: 600; }
  .bubble.agent { background: #fff; color: var(--ink); border-bottom-right-radius: 14px; margin-left: 50px; }
  .bubble.client { background: #1D1D1F; color: #fff; border: 3px solid rgba(255,255,255,.12); border-bottom-left-radius: 14px; margin-right: 140px; }
  .who { margin-top: 14px; font-size: 30px; font-weight: 600; color: rgba(255,255,255,.45); }
  .who.r { text-align: right; }
  .done { margin-top: 50px; align-self: flex-start; display: inline-flex; align-items: center; gap: 20px; padding: 26px 38px; border-radius: 999px; background: var(--lime); color: var(--ink); font-size: 42px; font-weight: 700; }
  .done span { width: 58px; height: 58px; border-radius: 50%; background: var(--ink); display: inline-flex; align-items: center; justify-content: center; }
  .done svg { width: 32px; height: 32px; fill: none; stroke: var(--lime); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }

  .flow { margin-top: 48px; display: grid; gap: 22px; }
  .flow div { display: flex; gap: 28px; align-items: flex-start; padding: 30px 40px; border-radius: 38px; background: #1D1D1F; border: 3px solid rgba(255,255,255,.1); }
  .flow b { flex: 0 0 66px; height: 66px; border-radius: 50%; background: var(--lime); color: var(--ink); display: inline-flex; align-items: center; justify-content: center; font-size: 34px; }
  .flow p { font-size: 44px; line-height: 1.25; font-weight: 600; padding-top: 6px; color: #fff; }
  .flow p span { display: block; margin-top: 6px; font-size: 38px; font-weight: 500; color: rgba(255,255,255,.6); }

  /* CTA (manual 4a) */
  .cta { justify-content: flex-start; padding-top: 180px; align-items: center; text-align: center; }
  .cta .trust { font-size: 38px; line-height: 1.3; color: var(--ink5); max-width: 860px; }
  .cta .ch { margin-top: 22px; font-size: 136px; line-height: .9; }
  .cta .ch .kw { display: inline-block; padding: 0 18px 12px; background: var(--lime); border-radius: 26px; font-style: normal; color: var(--ink); }
  .cta .cs { margin-top: 24px; font-size: 40px; font-weight: 600; }
  .cta .stage { position: relative; width: 870px; margin-top: 34px; }
  .cta .row { display: flex; justify-content: space-between; }
  .cta .co { width: 400px; font-size: 38px; line-height: 1.2; color: var(--ink5); }
  .cta .co b { display: block; color: var(--ink); font-weight: 700; }
  .cta .stem { display: flex; justify-content: space-between; padding: 0 198px; height: 40px; }
  .cta .stem.t { margin-top: 14px; } .cta .stem.b { margin-bottom: 14px; }
  .cta .stem i { position: relative; width: 4px; background: var(--ink); }
  .cta .stem i::after { content: ""; position: absolute; left: 50%; width: 18px; height: 18px; border-radius: 50%; background: var(--ink); transform: translateX(-50%); }
  .cta .stem.t i::after { top: -6px; } .cta .stem.b i::after { bottom: -6px; }
  .laptop { margin: 0 auto; width: 740px; }
  .laptop .lid { padding: 18px; border-radius: 30px 30px 0 0; background: #1a1a1a; }
  .laptop .scr { height: 286px; border-radius: 12px; background: var(--ink); padding: 34px 38px; text-align: left; color: #fff; position: relative; overflow: hidden; }
  .laptop .scr::after { content: ""; position: absolute; width: 600px; height: 600px; right: -300px; top: -320px; border-radius: 50%; background: radial-gradient(closest-side, rgba(197,232,50,.35), rgba(197,232,50,0)); }
  .laptop .base { height: 26px; margin: 0 -50px; border-radius: 0 0 26px 26px; background: linear-gradient(#d9d9dc, #a9a9ad); }
  .scr .sl { display: flex; align-items: center; gap: 14px; font-size: 26px; font-weight: 700; color: var(--lime); letter-spacing: .04em; text-transform: uppercase; }
  .scr .sl img { height: 30px; }
  .scr h5 { margin-top: 14px; font-family: 'Fraunces', serif; font-weight: 400; font-size: 52px; line-height: 1; letter-spacing: -0.02em; }
  .scr ul { list-style: none; margin-top: 16px; display: grid; gap: 10px; }
  .scr li { display: flex; align-items: center; gap: 14px; font-size: 28px; font-weight: 600; color: rgba(255,255,255,.85); }
  .scr li i { width: 30px; height: 30px; border-radius: 50%; background: var(--lime); display: inline-flex; align-items: center; justify-content: center; }
  .scr li svg { width: 18px; height: 18px; fill: none; stroke: var(--ink); stroke-width: 3.4; stroke-linecap: round; stroke-linejoin: round; }
'''
ARROW = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
CHECK = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
CROSS = '<svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg>'
STARDEF = '<svg width="0" height="0" style="position:absolute"><defs><path id="st" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></defs></svg>'
def stars(n): return '<span class="stars">' + ''.join(f'<svg class="{"on" if i<n else "off"}" viewBox="0 0 24 24"><use href="#st"/></svg>' for i in range(5)) + '</span>'
TOTAL = 10
def slide(i, body, dark=False, cls='', glow=False, swipe=False):
    logo = 'nexivo-logo-inverse.png' if dark else 'nexivo-logo.png'
    c = ' '.join(x for x in ['slide', 'dark' if dark else '', cls] if x)
    return (f'<section class="{c}">\n' + ('  <div class="glow"></div>\n' if glow else '') +
            f'  <img class="logo" src="../../../assets/{logo}" alt="">\n  <div class="num">{i}/{TOTAL}</div>\n{body}\n' +
            (f'  <div class="swipe">Posuňte {ARROW}</div>\n' if swipe else '') + '</section>')
def cta(i, screen_label, screen_title, screen_items):
    lis = ''.join(f'<li><i>{CHECK}</i>{t}</li>' for t in screen_items)
    body = f'''  <div class="trust">Stavíme AI agenty pro firmy, které nestíhají telefony a poptávky.</div>
  <div class="ch disp">Napište<br><em class="kw">„AGENT“</em></div>
  <div class="cs">do komentáře · pošleme vám ukázku na míru</div>
  <div class="stage">
    <div class="row"><div class="co"><b>AI konzultace</b>zdarma, 30 minut</div><div class="co"><b>Ukázka agenta</b>pro váš obor</div></div>
    <div class="stem t"><i></i><i></i></div>
    <div class="laptop"><div class="lid"><div class="scr">
      <div class="sl"><img src="../../../assets/nexivo-logo-inverse.png" alt="">{screen_label}</div>
      <h5>{screen_title}</h5><ul>{lis}</ul>
    </div></div><div class="base"></div></div>
    <div class="stem b"><i></i><i></i></div>
    <div class="row"><div class="co"><b>Odhad úspory</b>kolik hodin týdně</div><div class="co"><b>Agent na 3 dny</b>zdarma, nexivoai.cz</div></div>
  </div>'''
    return slide(i, body, cls='cta')
def page(slides):
    return ('<!doctype html>\n<html lang="cs">\n<head>\n<meta charset="utf-8">\n'
            '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&display=block">\n'
            '<style>' + CSS + '</style>\n</head>\n<body>\n' + STARDEF + '\n\n' + '\n\n'.join(slides) + '\n\n</body>\n</html>\n')
