# CLAUDE.md

This file provides guidance to Claude Code and other AI agents working in this repository.

## Project Overview

Marketing website + client portal for **Nexivo** — a Czech AI agency selling AI receptionist, chatbot and AI agent services to small businesses (salons, clinics, guesthouses) in CZ and SK.

**Live site:** nexivoai.cz  
**GitHub:** github.com/romanrichter1/my-site-app  
**Vercel project:** my-site-app (linked via `.vercel/project.json`)  
**Owner:** Roman Richter — roman@nexivoai.cz

No build system, no package manager. All files are standalone HTML with inline or linked CSS/JS.

---

## File Structure

```
/
├── index.html                  ← Main landing page (nexivoai.cz)
├── nexivo_inquiry.html         ← Poptávkový formulář (nexivoai.cz/nexivo_inquiry)
├── nexivo_marketing.css        ← Shared CSS for all marketing pages
├── colors_and_type.css         ← Design tokens: colors, typography, spacing
├── og-gen.html                 ← OG image generator (open in browser to download PNG)
├── vercel.json                 ← cleanUrls + redirects
├── assets/
│   ├── nexivo-favicon.svg      ← Favicon: "n" + lime dot on cream bg
│   ├── nexivo-logo.png         ← Logo — používá se všude na světlém pozadí
│   ├── nexivo-logo-inverse.png ← Totéž pro tmavé pozadí (patička)
│   ├── nexivo-wordmark.svg     ← Starý wordmark, nikde se nepoužívá
│   ├── nexivo-mark.svg         ← Geometric N mark, nepoužívá se
│   └── ...
└── klient/
    ├── index.html              ← Login page (nexivoai.cz/klient)
    └── dashboard.html          ← Client dashboard (nexivoai.cz/klient/dashboard)
```

**Deleted files** (redirects in vercel.json):
- `nexivo_landing.html` → `/` (was duplicate of index.html)
- `nexivo_login.html` → `/klient`
- `nexivo_register.html` → `/klient`

---

## Design System

**Colors** (defined in `colors_and_type.css`; dashboard keeps its own inline vars):
- `--bone-50: #F7F5EF` — primary background (cream)
- `--ink-1000: #0A0A0A` — primary text (near-black), ink scale is neutral grey
- `--lime-500: #C5E832` — accent, only for accents and CTA

**Fonts:** Fraunces (Google Fonts) for headings and big numbers, italic `<em>` in grey; system stack (-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif) for body text.

**Design language:** Apple-inspired — lots of whitespace, big bold headings, cards with 24–28 px radius and soft shadow, sticky blurred nav, line SVG icons, no emoji, Czech "vykání".
The "APPLE-STYLE LAYER" at the end of `nexivo_marketing.css` overrides the legacy components above it — keep new styles there.

---

## Marketing Landing Page (`index.html`)

Positioning: Nexivo sells ONLY AI agents to service firms with 5+ employees. No prices on the site.

Sections in order:
- Hero (`.hero--center`: eyebrow pill → title with lime underline `.hero__mark` → sub → 2 CTAs → `.hero__checks` trust row incl. guarantee link → `.taskdemo` „Zadej úkol“ interactive demo below: 3 task chips, tool rail, steps, result card; autoplays until first click)
- Co vám agent reálně pošle (`#agenti`) — 4 HTML mockups, `[data-live]` animates on scroll, mobile carousel `[data-carousel]`
- Agent není ChatGPT (`#jak-agent-pracuje`) — `[data-vs-duel]` comparison scrubbed by scroll (GPT rows strike through, agent rows + checks pop in, score 0→4/4, `.vs__badge`), mobile toggle kept; `[data-flow]` steps lighting up
- Pro koho (`#pro-koho`)
- Case study (`#case-study`, `.is-hidden` — show only with verified client consent)
- Čísla (`#cisla`) — all stats labelled "Ilustrativní ukázka"
- Jak to funguje (`#jak-to-funguje`)
- Reporting Agent (`#reporting`)
- Nabídka služeb (`#pricing` — id kept for old links) + price-on-request card
- Reference (`#reference`, `.is-hidden` — placeholder [DOPLNIT])
- FAQ (`#faq`), Closing CTA, Footer

**Motion layer** (last `<script>` in `index.html`, styles at end of `nexivo_marketing.css`):
GSAP 3.12.5 + ScrollTrigger (cdnjs), `defer`. Runs only when `html.js-motion` is set (head script;
skipped for reduced motion, removed if GSAP fails to load). **Everything moves only with native scroll** —
no Lenis/smooth-scroll library and no pointer-driven effects (cursor follower, magnetic buttons, tilt,
spotlight, mouse parallax were removed: Roman found trackpad control broken).
- `[data-split]` headings → masked word reveal; `[data-extend]` sections → clip-path grows to full bleed
- `.hero__layers [data-depth]` → scroll parallax (floating chips only ≥ 1240 px)
- Elements GSAP transforms must not have a CSS `transform` transition (see `transition-property` override)

`/#ukazka` opens the booking modal on load (used by subpage nav CTAs).

**Booking modal:** Custom cream overlay with `Calendly.initInlineWidget()` inside.  
Config: `window.CALENDLY_URL = "https://calendly.com/romecrichter/nexivo"` in `<head>`.  
Trigger: all `[data-cta="calendly"]` elements. **No href/target on these elements** — JS handles clicks only.  
Calendly CSS+JS loaded from `assets.calendly.com` in `<head>`.

**Calculator modal:** `#calc` — multi-step savings calculator, opens via `[data-calc]` buttons.

**FAQ accordion:** `.faq__item[data-open]` toggle, `grid-template-rows` slide + opacity fade animation.

---

## Pricing Packages

| Name | Price | Content |
|------|-------|---------|
| Basic | 13 890 Kč | OnePager + chatbot + rezervační systém |
| Plus | 28 680 Kč | Web + AI agent (Google Calendar / Reservio) |
| Business | 32 680 Kč | Web + chatbot + AI recepční |
| Premium | 37 680 Kč | Vše z Plus i Business — AI agent + AI recepční |

AI recepční (Business, Premium) has additional monthly phone costs billed by usage.

---

## Inquiry Page (`nexivo_inquiry.html`)

Multi-step form with plan summary sidebar. Plan pre-selected via `?plan=basic|plus|business|premium` URL param.

**Stripe payment links** (in `window.STRIPE_LINKS`):
- `basic`: `https://buy.stripe.com/00w3co36V0os4Xo2fo1B603`
- `plus`: `https://buy.stripe.com/eVq8wI5f34EI89Af2a1B602`
- `business`: `https://buy.stripe.com/7sY5kw9vjefi1Lc2fo1B601`
- `premium`: `https://buy.stripe.com/bJe4gs6j74EI4Xo9HQ1B600`

Page is `noindex` (form page, not for search engines).

---

## Client Portal (`klient/`)

**Login** (`klient/index.html`):
- Split layout: form left, stats panel right (cream + dark)
- Any credentials accepted (demo mode — no real auth yet)
- On submit: redirects to `/klient/dashboard`
- `noindex, nofollow`

**Dashboard** (`klient/dashboard.html`):
- React 18 via CDN + Babel standalone (JSX inline)
- Hash routing: `#/home`, `#/agent`, `#/reception`, `#/chatbot`
- Three services: AI agent, AI recepční, Chatbot
- Interactive charts: Kč/Hodiny toggle + Den/Týden/Měsíc/Rok
- Sidebar hamburger menu on mobile (< 900px)
- All CSS inline in `<style>`, all JSX in one `<script type="text/babel">`

---

## Aktivace účtu (`klient/aktivovat.html` + `api/aktivace.js`)

Formulář posílá JSON na `/api/aktivace` (Vercel serverless, CommonJS, bez závislostí).

- **Vždy:** Fakturoid API v3 → najde/založí odběratele podle IČO. **Tohle je jediné trvalé
  úložiště kontaktu** — i u platby kartou, aby se lead neztratil.
- **`platba = faktura`:** navíc vystaví **jednorázovou** fakturu se splatností v den vystavení
  (`FAKTUROID_DUE_DAYS=0`) a pošle ji klientovi. Odkaz na fakturu (`public_html_url`) se vrací
  do prohlížeče a zobrazí na potvrzovací obrazovce, takže klient může zaplatit hned.
- **`platba = karta`:** jen odběratel, pak redirect na Stripe Payment Link.

**Odeslání faktury mailem** má tři úrovně: Fakturoid (jen placený tarif, jinak 403) →
Resend (když je `RESEND_API_KEY`) → odkaz na obrazovce. Účet `riventi1` je na placeném tarifu,
takže platí první úroveň a faktura klientovi reálně odchází. Notifikace majiteli jde jen přes
Resend, který nastavený není — je best-effort, takže požadavek projde i bez ní.

**Účet Fakturoid:** slug `riventi1`, RIVENTI s.r.o., IČO 19892292, `vat_mode:
identified_person` → **fakturuje se bez DPH**, `FAKTUROID_VAT_RATE=0`. Klíče pro Client
Credentials se berou z **Nastavení → Uživatelský účet → API**, ne z OAuth aplikace.

Ceny počítá `priceFor()` — aktivace stojí 24 900 Kč za agenta, s množstevní slevou 20 %
při dvou a 40 % od tří výš. Na faktuře jsou vždy dva řádky: produkt „Konzultační
a implementační služby v oblasti automatizace procesů" a pod ním sleva.

| Agentů | Před slevou | Sleva | Celkem jednorázově |
|--------|-------------|-------|--------------------|
| 1 | 24 900 | — | 24 900 |
| 2 | 49 800 | 20 % | 39 840 |
| 3 | 74 700 | 40 % | 44 820 |
| 4 | 99 600 | 40 % | 59 760 |
| 5 | 124 500 | 40 % | 74 700 |

Tabulka výše platí pro **platbu fakturou** (jednorázově).

**Platba kartou = měsíční předplatné přes Stripe** (ne jednorázová částka):

| Agentů | Měsíčně |
|--------|---------|
| 1 | 2 490 Kč |
| 2 | 4 990 Kč |
| 3 | 7 490 Kč |
| 4 | 9 990 Kč |
| 5 | 12 490 Kč |

Stripe Payment Links pro kartu musí být nastavené jako opakovaná měsíční platba s těmito částkami.

Ochrana: jen POST, kontrola `Origin`, honeypot pole `website`, serverová validace všech polí.

**Proměnné prostředí ve Vercelu** (nastaveno v Production):
`FAKTUROID_SLUG`, `FAKTUROID_CLIENT_ID`, `FAKTUROID_CLIENT_SECRET`, `FAKTUROID_USER_AGENT`,
`FAKTUROID_VAT_RATE`, `FAKTUROID_DUE_DAYS`, `NOTIFY_EMAIL`.
Volitelné, zatím nenastavené: `RESEND_API_KEY`, `MAIL_FROM` — bez nich se jen neposílají maily.

---

## Vercel Deployment

```bash
PATH="/opt/homebrew/opt/node@26/bin:/opt/homebrew/bin:$PATH" vercel --prod
```

`cleanUrls: true` → `.html` extensions stripped automatically.  
After deploy, always push to GitHub: `git push origin main`

**Domain:** nexivoai.cz (aliased in Vercel)

---

## Conventions

- **Language:** All nexivo files in Czech (`lang="cs"`), formal vykání
- **No build system** — edit HTML/CSS directly, no transpilation
- **CSS tokens** — use `colors_and_type.css` variables for marketing pages, inline `:root` vars for dashboard
- **Dual file rule ABOLISHED** — `nexivo_landing.html` deleted, `index.html` is the only landing page
- **Internal links** — always clean paths (`/`, `/nexivo_inquiry`, `/klient`), never `.html` extensions
- **No comments** in code unless WHY is non-obvious

---

## Rollback log (redesign hero + motion, říjen 2026)

Když Roman napíše „smaž animace“ / „vrať hero“ apod., vrať příslušný commit přes `git revert <hash>`
(nikdy ne reset/force-push na `main`) a pushni na `main`. Revertuj odshora dolů.

| Commit | Co dělá | Revert vrátí |
|--------|---------|--------------|
| `b4f654b` | Srovnání ChatGPT vs agent jako souboj při scrollu (přeškrtávání, skóre 4/4, odznak vs, kategorie řádků) | původní statické dva sloupce |
| `89b2ddd` | Odstraněn Lenis a všechny efekty řízené myší (kurzor, magnetická tlačítka, tilt, spotlight, parallax za myší) — trackpad nešel ovládat | Lenis + efekty myši zpět |
| `ee28ffa` | Motion layer: Lenis, GSAP/ScrollTrigger, parallax vrstvy v hero (mřížka, koule, plovoucí karty), word-reveal nadpisů, clip-path roztažení tmavých sekcí, kurzor, magnetická tlačítka, spotlight/tilt karet | stránku bez JS animací (CSS reveals zůstanou) |
| `e91ef5b` | Interaktivní demo „Zadej úkol“ (`.taskdemo`) místo chatu „Jana Dvořáková“ | původní chat mockup `.callcard` |
| `f9c068d` | Hero vycentrovaný ve stylu Everbot/Editee: pilulka, podtržené „rutinu“, řádek s fajfkami | původní dvousloupcový hero |

Vše jen v `index.html`, `nexivo_marketing.css` a `CLAUDE.md`.
