# AI Agent — Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Přidat produkt "AI agent" do nexivo_landing.html — vlastní wow sekci s animovaným chat mockupem na tmavém pozadí, dvě nové cenové karty (Premium + Enterprise), a synchronizovat vše s nexivo_inquiry.html.

**Architecture:** Tři soubory se mění: `nexivo_landing.html` dostane novou sekci a rozšířený ceník; `nexivo_marketing.css` dostane nové styly pro ink sekci + animace chat bubbles + 5-sloupcový pricing grid; `nexivo_inquiry.html` dostane Premium a Enterprise v JS objektu PLANS. Animace jsou čistě CSS (@keyframes) — žádné JS knihovny.

**Tech Stack:** Vanilla HTML/CSS/JS, Google Fonts (Fraunces + Manrope), inline SVG ikony

---

## Soubory

- Modify: `nexivo_landing.html` — nav link, AI agent sekce (za `#websites`, před `.savings`), pricing karty
- Modify: `nexivo_marketing.css` — `.agent-*` komponenty, `.agent-chat` animace, `.pricing` 5-karet layout
- Modify: `nexivo_inquiry.html` — přidat `premium` a `enterprise` do `PLANS` JS objektu, přidat tlačítka do switcher

---

## Task 1: Nav — přidat odkaz "AI agent"

**Files:**
- Modify: `nexivo_landing.html:26-31`

- [ ] **Krok 1: Přidat nav link**

V `nexivo_landing.html` najdi blok `.nav__links` (řádky 26–31) a přidej nový odkaz za "Weby s chatem":

```html
<div class="nav__links">
  <a class="nav__link" href="#receptionist">AI recepční</a>
  <a class="nav__link" href="#websites">Weby s chatem</a>
  <a class="nav__link" href="#agent">AI agent</a>
  <a class="nav__link" href="#for-whom">Pro koho</a>
  <a class="nav__link" href="#pricing">Ceník</a>
  <a class="nav__link" href="#refs">Reference</a>
</div>
```

- [ ] **Krok 2: Ověřit v prohlížeči**

Otevři `nexivo_landing.html` v prohlížeči. Nav bar musí mít odkaz "AI agent" mezi "Weby s chatem" a "Pro koho". Kliknutí na odkaz zatím nikam neskrolluje (sekce ještě neexistuje) — to je správně.

- [ ] **Krok 3: Commit**

```bash
git add nexivo_landing.html
git commit -m "feat: add AI agent nav link"
```

---

## Task 2: CSS — styly pro AI agent sekci

**Files:**
- Modify: `nexivo_marketing.css` — přidat na konec souboru

- [ ] **Krok 1: Přidat styly AI agent sekce**

Na konec `nexivo_marketing.css` přidej:

```css
/* ---------- AI agent section ---------- */
.agent-section {
  background: var(--ink-1000);
  padding: 120px 48px;
  color: var(--bone-50);
}

.agent-section .section__eyebrow {
  color: var(--lime-500);
}
.agent-section .section__eyebrow::before {
  background: var(--lime-500);
}

.agent-layout {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 72px;
  align-items: center;
}

.agent-copy {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.agent-copy h2 {
  font: 400 56px/1.04 var(--font-display);
  letter-spacing: -0.026em;
  color: var(--bone-50);
  font-variation-settings: "opsz" 96;
  text-wrap: balance;
  margin: 0;
}

.agent-copy h2 em {
  font-style: italic;
  color: var(--lime-500);
}

.agent-copy p {
  font: 400 18px/1.6 var(--font-sans);
  color: var(--ink-300);
  margin: 0;
  max-width: 480px;
}

.agent-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.agent-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font: 400 15px/1.5 var(--font-sans);
  color: var(--bone-50);
}

.agent-list li::before {
  content: "";
  width: 6px;
  height: 6px;
  background: var(--lime-500);
  flex-shrink: 0;
  margin-top: 7px;
  border-radius: 1px;
  box-shadow: 0 0 8px rgba(199, 242, 48, 0.6);
}

/* ---------- chat mockup ---------- */
.agent-mock {
  background: var(--ink-900);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.08);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow:
    0 0 0 1px rgba(199,242,48,0.06),
    0 32px 80px rgba(0,0,0,0.45);
}

.agent-mock__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

.agent-mock__avatar {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: var(--lime-500);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.agent-mock__avatar svg {
  width: 18px;
  height: 18px;
  stroke: var(--ink-1000);
  stroke-width: 2;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.agent-mock__who {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.agent-mock__name {
  font: 600 14px/1 var(--font-sans);
  color: var(--bone-50);
}

.agent-mock__status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font: 500 11px/1 var(--font-sans);
  color: var(--lime-500);
  letter-spacing: 0.04em;
}

.agent-mock__status-dot {
  width: 6px;
  height: 6px;
  background: var(--lime-500);
  border-radius: 999px;
  animation: pulse 1.6s ease-in-out infinite;
}

.agent-chat {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 220px;
}

/* Chat bubble animations */
.agent-bubble {
  max-width: 88%;
  padding: 10px 14px;
  border-radius: 12px;
  font: 400 14px/1.5 var(--font-sans);
  opacity: 0;
  transform: translateY(6px);
}

.agent-bubble--them {
  background: rgba(255,255,255,0.07);
  color: var(--bone-50);
  align-self: flex-start;
  border-bottom-left-radius: 4px;
  animation: bubbleIn 0.35s var(--ease-out) forwards;
}

.agent-bubble--agent {
  background: var(--ink-700);
  color: var(--bone-50);
  align-self: flex-end;
  border-bottom-right-radius: 4px;
  animation: bubbleIn 0.35s var(--ease-out) forwards;
}

.agent-bubble--confirm {
  background: var(--lime-500);
  color: var(--ink-1000);
  align-self: flex-end;
  border-bottom-right-radius: 4px;
  font-weight: 500;
  animation: bubbleIn 0.35s var(--ease-out) forwards;
}

.agent-bubble small {
  display: block;
  font: 400 11px/1 var(--font-sans);
  opacity: 0.5;
  margin-top: 4px;
}

.agent-bubble--confirm small {
  opacity: 0.65;
  color: var(--ink-700);
}

/* Typing indicator */
.agent-typing {
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 14px;
  background: var(--ink-700);
  border-radius: 12px;
  border-bottom-right-radius: 4px;
  opacity: 0;
  animation: bubbleIn 0.3s var(--ease-out) forwards;
}

.agent-typing span {
  width: 5px;
  height: 5px;
  background: var(--ink-300);
  border-radius: 999px;
  animation: typingDot 1.2s ease-in-out infinite;
}

.agent-typing span:nth-child(2) { animation-delay: 0.18s; }
.agent-typing span:nth-child(3) { animation-delay: 0.36s; }

@keyframes bubbleIn {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes typingDot {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-4px); opacity: 1; }
}

/* Animation delays per bubble */
.agent-bubble:nth-child(1) { animation-delay: 0.3s; }
.agent-bubble:nth-child(2) { animation-delay: 1.2s; }
.agent-typing          { animation-delay: 2.0s; }
.agent-bubble:nth-child(3) { animation-delay: 3.2s; }
.agent-bubble:nth-child(4) { animation-delay: 4.4s; }

/* Google Calendar confirmation card */
.agent-cal {
  margin-top: 4px;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  opacity: 0;
  transform: translateY(8px);
  animation: bubbleIn 0.4s var(--ease-out) 5.4s forwards;
}

.agent-cal__icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #4285F4;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.agent-cal__icon svg {
  width: 20px;
  height: 20px;
  fill: #FFFFFF;
}

.agent-cal__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.agent-cal__title {
  font: 600 13px/1 var(--font-sans);
  color: var(--ink-1000);
}

.agent-cal__meta {
  font: 400 12px/1 var(--font-sans);
  color: var(--ink-500);
}

.agent-cal__check {
  margin-left: auto;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: #34A853;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.agent-cal__check svg {
  width: 12px;
  height: 12px;
  stroke: #FFFFFF;
  stroke-width: 2.5;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

- [ ] **Krok 2: Commit**

```bash
git add nexivo_marketing.css
git commit -m "feat: add AI agent section CSS with animated chat mockup"
```

---

## Task 3: HTML — AI agent sekce

**Files:**
- Modify: `nexivo_landing.html` — vložit za `<!-- PRODUCT DETAIL: WEBSITE + CHAT -->` sekci (za zavírací `</section>` na řádku ~168), před `<!-- SAVINGS STRIP -->`

- [ ] **Krok 1: Vložit AI agent sekci**

V `nexivo_landing.html` najdi komentář `<!-- SAVINGS STRIP -->` (řádek ~170) a těsně před něj vlož:

```html
  <!-- AI AGENT -->
  <section class="agent-section" id="agent">
    <div class="section__head" style="margin-bottom:64px;">
      <div>
        <span class="section__eyebrow">AI agent</span>
        <h2 class="section__title" style="color:var(--bone-50);">Rezervace dokončena. <em style="font-style:italic;color:var(--lime-500);">Vy jste u toho nebyli.</em></h2>
      </div>
      <p class="section__intro" style="color:var(--ink-300);">Váš web teď prodává i ve 2 ráno. AI agent přijme klienta přes chat, zapíše schůzku do kalendáře a pošle potvrzení — bez jediného vašeho kliknutí.</p>
    </div>

    <div class="agent-layout">
      <div class="agent-copy">
        <ul class="agent-list">
          <li>Napojení na Google Kalendář a Reservio — rezervace v reálném čase.</li>
          <li>Agent vezme jméno, kontakt a termín přímo v chatu.</li>
          <li>Automatický potvrzovací e-mail ihned po rezervaci.</li>
          <li>SMS nebo chat připomínka 2 hodiny před termínem.</li>
          <li>Čeština, slovenština, angličtina — bez nastavení.</li>
        </ul>
        <div class="hero__cta">
          <a href="#calendly" target="_blank" rel="noopener" class="btn btn--primary" data-cta="calendly">Domluvit ukázku
            <svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </div>

      <!-- Animated chat mockup -->
      <div class="agent-mock">
        <div class="agent-mock__head">
          <div class="agent-mock__avatar">
            <svg viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/></svg>
          </div>
          <div class="agent-mock__who">
            <span class="agent-mock__name">Nexivo Agent</span>
            <span class="agent-mock__status">
              <span class="agent-mock__status-dot"></span>Online
            </span>
          </div>
        </div>

        <div class="agent-chat">
          <div class="agent-bubble agent-bubble--them">
            Dobrý den, chtěl bych se objednat na střih.<small>10:23</small>
          </div>
          <div class="agent-bubble agent-bubble--agent">
            Jasně, rád pomůžu. Na kdy byste měl zájem — máte v úterý ve 14:00 nebo ve čtvrtek v 10:00?<small>AI agent · 10:23</small>
          </div>
          <div class="agent-typing" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <div class="agent-bubble agent-bubble--them">
            Čtvrtek 10:00 mi sedí.<small>10:23</small>
          </div>
          <div class="agent-bubble agent-bubble--confirm">
            Hotovo. Schůzka zapsána na čtvrtek 22. 5. v 10:00. Potvrzení přijde na váš e-mail.<small>AI agent · 10:24</small>
          </div>
        </div>

        <div class="agent-cal">
          <div class="agent-cal__icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="#FFFFFF" stroke-width="2"/></svg>
          </div>
          <div class="agent-cal__info">
            <span class="agent-cal__title">Střih — Jan Novák</span>
            <span class="agent-cal__meta">Čtvrtek 22. 5. · 10:00 · Přidáno do Google Kalendáře</span>
          </div>
          <div class="agent-cal__check">
            <svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Krok 2: Ověřit v prohlížeči**

Otevři `nexivo_landing.html`. Scrolluj dolů za sekci "Weby s chatem". Musí se zobrazit:
- Tmavá ink sekce s lime eyebrow "AI agent"
- Headline s lime kurzívou
- 5 bullet pointů s lime tečkami
- Animated chat mockup vpravo — bubbles se objevují postupně (celá sekvence trvá ~6 s)
- Google Kalendář karta se vynoří nakonec

- [ ] **Krok 3: Commit**

```bash
git add nexivo_landing.html
git commit -m "feat: add AI agent section with animated chat mockup"
```

---

## Task 4: Ceník — přidat Premium a Enterprise karty

**Files:**
- Modify: `nexivo_landing.html` — pricing sekce (~řádky 188–256)
- Modify: `nexivo_marketing.css` — update `.pricing` grid

- [ ] **Krok 1: Update pricing grid CSS**

V `nexivo_marketing.css` najdi a nahraď existující `.pricing` pravidlo:

```css
/* PŮVODNÍ: */
.pricing {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

/* NAHRADIT ZA: */
.pricing {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.pricing--row2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
  max-width: calc(66.66% + 10px);
}
```

- [ ] **Krok 2: Update HTML ceníku**

V `nexivo_landing.html` najdi `<div class="pricing">` a jeho uzavírací `</div>` (obsahuje 3 `.plan` karty). Za tento div přidej druhý řádek s Premium a Enterprise:

```html
    <div class="pricing--row2">
      <article class="plan">
        <h3 class="plan__name">Premium</h3>
        <p class="plan__sub">Moderní web s AI agentem — rezervace, potvrzení a připomínky přes chat. Bez chatbotu, s inteligencí.</p>
        <div class="plan__price">
          <span class="num">32&#8239;680</span>
          <span class="unit">Kč</span>
          <span class="once">jednorázově</span>
        </div>
        <ul class="plan__list">
          <li><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none"><path d="M20 6L9 17l-5-5"/></svg> Moderní web na míru</li>
          <li><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none"><path d="M20 6L9 17l-5-5"/></svg> AI agent v chatu</li>
          <li><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none"><path d="M20 6L9 17l-5-5"/></svg> Rezervace přes Google Kalendář / Reservio</li>
          <li><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none"><path d="M20 6L9 17l-5-5"/></svg> Potvrzovací e-mail automaticky</li>
          <li><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none"><path d="M20 6L9 17l-5-5"/></svg> SMS / chat připomínka před termínem</li>
          <li><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none"><path d="M20 6L9 17l-5-5"/></svg> CZ · SK · EN</li>
        </ul>
        <div class="plan__cta"><a class="btn btn--ghost" href="nexivo_inquiry.html?plan=premium">Vybrat Premium</a></div>
      </article>

      <article class="plan plan--featured">
        <span class="plan__tag">Kompletní řešení</span>
        <h3 class="plan__name">Enterprise</h3>
        <p class="plan__sub">Web s AI agentem a AI recepční. Každý kontaktní bod pokrytý — chat i telefon.</p>
        <div class="plan__price">
          <span class="num">37&#8239;680</span>
          <span class="unit">Kč</span>
          <span class="once">jednorázově</span>
        </div>
        <ul class="plan__list">
          <li><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none"><path d="M20 6L9 17l-5-5"/></svg> Vše z balíčku Premium</li>
          <li><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none"><path d="M20 6L9 17l-5-5"/></svg> AI recepční na příchozí hovory</li>
          <li><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none"><path d="M20 6L9 17l-5-5"/></svg> Vlastní hlas AI recepční</li>
          <li><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none"><path d="M20 6L9 17l-5-5"/></svg> Synchronizace chatu a telefonu</li>
          <li><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none"><path d="M20 6L9 17l-5-5"/></svg> Týdenní souhrn a doporučení</li>
        </ul>
        <div class="plan__cta"><a class="btn btn--primary" href="nexivo_inquiry.html?plan=enterprise">Vybrat Enterprise</a></div>
      </article>
    </div>
```

- [ ] **Krok 3: Ověřit v prohlížeči**

Scrolluj na ceník. Musí být:
- Řada 1: Basic · Standard · Business (3 karty, stejně jako dřív)
- Řada 2: Premium · Enterprise (2 karty, zarovnané vlevo, šířka 2/3 gridu)
- Enterprise je tmavá featured karta s lime "Kompletní řešení" tagem a bílým názvem

- [ ] **Krok 4: Commit**

```bash
git add nexivo_landing.html nexivo_marketing.css
git commit -m "feat: add Premium and Enterprise pricing cards"
```

---

## Task 5: Inquiry — přidat Premium a Enterprise

**Files:**
- Modify: `nexivo_inquiry.html` — JS objekt `PLANS` a `summary__plans` switcher

- [ ] **Krok 1: Přidat Premium a Enterprise do PLANS objektu**

V `nexivo_inquiry.html` najdi JS objekt `const PLANS = {` a přidej dvě nové položky za `business`:

```js
      premium: {
        name: "Premium",
        sub: "Moderní web s AI agentem — rezervace, potvrzení a připomínky přes chat.",
        priceFmt: "32 680",
        priceNum: 32680,
        featured: false,
        features: [
          "Moderní web na míru",
          "AI agent v chatu",
          "Rezervace přes Google Kalendář / Reservio",
          "Potvrzovací e-mail automaticky",
          "SMS / chat připomínka před termínem",
          "CZ · SK · EN",
        ],
      },
      enterprise: {
        name: "Enterprise",
        sub: "Web s AI agentem a AI recepční. Chat i telefon — každý kontaktní bod pokrytý.",
        priceFmt: "37 680",
        priceNum: 37680,
        featured: true,
        features: [
          "Vše z balíčku Premium",
          "AI recepční na příchozí hovory",
          "Vlastní hlas AI recepční",
          "Synchronizace chatu a telefonu",
          "Týdenní souhrn a doporučení",
        ],
      },
```

- [ ] **Krok 2: Přidat tlačítka do plan switcher**

V `nexivo_inquiry.html` najdi `.summary__plans` div se 3 tlačítky a přidej Premium a Enterprise:

```html
          <div class="summary__plans" role="group" aria-label="Změna balíčku">
            <button type="button" data-plan="basic">Basic</button>
            <button type="button" data-plan="standard">Standard</button>
            <button type="button" data-plan="business">Business</button>
            <button type="button" data-plan="premium">Premium</button>
            <button type="button" data-plan="enterprise">Enterprise</button>
          </div>
```

- [ ] **Krok 3: Přidat Stripe placeholdery**

V `nexivo_inquiry.html` najdi `window.STRIPE_LINKS` a přidej:

```js
    window.STRIPE_LINKS = {
      basic:      "https://buy.stripe.com/test_basic_placeholder",
      standard:   "https://buy.stripe.com/test_standard_placeholder",
      business:   "https://buy.stripe.com/test_business_placeholder",
      premium:    "https://buy.stripe.com/test_premium_placeholder",
      enterprise: "https://buy.stripe.com/test_enterprise_placeholder"
    };
```

- [ ] **Krok 4: Ověřit v prohlížeči**

Otevři `nexivo_inquiry.html?plan=premium`. Vlevo musí být:
- Název "Premium", cena "32 680 Kč"
- 6 feature položek
- Switcher má 5 tlačítek, "Premium" je aktivní

Otevři `nexivo_inquiry.html?plan=enterprise`. Vlevo musí být:
- Název "Enterprise", cena "37 680 Kč", tag "Nejvolenější"
- 5 feature položek

- [ ] **Krok 5: Commit**

```bash
git add nexivo_inquiry.html
git commit -m "feat: add Premium and Enterprise to inquiry page"
```

---

## Task 6: Push a finální kontrola

- [ ] **Krok 1: Celková vizuální kontrola**

Otevři `nexivo_landing.html` a projdi celou stránku:
1. Nav obsahuje "AI agent" odkaz
2. Scrolluj za "Weby s chatem" — tmavá AI agent sekce s animovaným chatem
3. Ceník: 3 karty + pod nimi 2 karty (Premium · Enterprise)
4. Klikni "Vybrat Premium" — otevře `nexivo_inquiry.html?plan=premium` se správnými daty
5. Klikni "Vybrat Enterprise" — otevře `nexivo_inquiry.html?plan=enterprise` se správnými daty

- [ ] **Krok 2: Push**

```bash
git push
```
