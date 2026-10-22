# Instagram + Facebook: strategie, napojení, náklady

Stav k 22. 10. 2026.

- **Fáze 1 (teď):** Claude vyrábí carousely + popisky, Roman je stáhne a publikuje ručně. Bez napojení na Meta.
- **Fáze 2 (až fáze 1 ukáže výsledky):** reely + publikace přes Meta Graph API (`tools/publish-meta.js`), sekce 2–5 níže.

---

## Fáze 1: carousely, publikace ručně

### Rytmus a výroba
- **3 carousely týdně** (po, st, pá, 11:30 nebo 19:30), tj. 12 měsíčně.
- **Jedna session týdně** (třeba neděle večer nebo pondělí 7:00): napíšeš „vyrob 3 carousely na tento týden“.
  Vyrobím je, pošlu náhled, ty dáš jedno kolo oprav, pak ti pošlu hotové JPEGy + text.
- Každý carousel leží v `social/carousels/<nazev>/`: `index.html` (zdroj), `01.jpg … 07.jpg`, `caption.txt`.
  Render: `NODE_PATH=$(npm root -g) node social/tools/render-carousel.js social/carousels/<nazev>/index.html`.
- Formát: 1080 × 1350 (4:5), 6–8 slidů, JPEG. Slide 1 = hook, předposlední = důkaz/číslo se zdrojem, poslední = CTA.
  Vzor: `carousels/chatgpt-vs-agent/`.

### Publikace (Roman, ~5 min na příspěvek)
1. Ulož slidy z chatu do galerie (v pořadí 01 → 07).
2. Instagram → nový příspěvek → vybrat víc fotek → vložit text z `caption.txt`.
3. Zapnout **„Sdílet také na Facebooku“** (Centrum účtů propojí IG s FB stránkou). Jedno nahrání = obě sítě.
4. Komentáře „AGENT“ v 1. měsíci **odpovídej ručně** do DM. Při téhle velikosti je to prodejní rozhovor, ne support;
   automatizaci řešit až nad ~10 za týden.

### Témata na první 4 týdny
| # | Carousel | Pilíř |
|---|---|---|
| 1 | ChatGPT vám poradí, agent to udělá (**hotový**) | Edukace |
| 2 | Google Review Agent: spokojení recenze nepíšou (**hotový**) | Důvěra |
| 2c | Kalkulační agent pro stavební firmy: nabídka za 5 minut (**hotový**) | Agent v akci |
| 2b | 5 věcí, které vaše recepční dělá zbytečně | Bolest |
| 3 | Co se stane s poptávkou, která přijde v neděli ve 22:00 | Bolest |
| 4 | Den v salonu s AI recepční: 8:00 → 18:00 | Agent v akci |
| 5 | 23 % firem na poptávku z webu nikdy neodpoví (HBR) | Důkaz |
| 6 | Follow Up Agent: nabídka za 186 000 Kč, 30 dní ticha | Agent v akci |
| 7 | AI agent vs. brigádník na recepci: srovnání | Edukace |
| 8 | Připomínky snižují počet nedorazivších o ~25 % | Důkaz |
| 9 | 3 otázky, podle kterých poznáte, že vám agent ušetří čas | Edukace |
| 10 | Jak nastavujeme agenta: 4 kroky od hovoru po spuštění | Zákulisí |
| 11 | Mýty o AI ve firmě (zabere to měsíce, je to drahé, klienti to poznají) | Edukace |
| 12 | Co agent pošle majiteli každé pondělí ráno (Reporting Agent) | Agent v akci |

Čísla jen z ověřené tabulky v `reels-prompts.md`, vždy se zdrojem na slidu.

### Náklady fáze 1
| Položka | Měsíčně |
|---|---|
| Meta, publikace | 0 Kč |
| Claude: 12 carouselů (à 15–30 Kč při API cenách Opus 5.5) + 4 týdenní dávky | **~200–400 Kč** |
| Na předplatném Claude (Pro/Max) | v rámci limitu, nic navíc |
| Tvůj čas | ~30 min schvalování + 3 × 5 min publikace týdně |
| Placená podpora (volitelně od 2. měsíce, jen nejlepší carousel) | 1 500–3 000 Kč |

### Vyhodnocení po 4 týdnech
Uložení + sdílení na příspěvek (hlavní signál, že obsah má hodnotu), komentáře/DM „AGENT“, domluvené konzultace.
Pokud přijdou **≥ 2 konzultace** → přidat reely a automatizaci (fáze 2). Pokud 0 → měnit témata a hooky, ne frekvenci.

---

## 1. Cíl a metrika

Sítě mají jediný úkol: **domluvené konzultace** s majiteli servisních firem (5+ zaměstnanců:
salony, kliniky, zubaři, veterináři, penziony, autoservisy, makléři).

| Metrika | Cíl za 90 dní |
|---|---|
| Komentáře/DM „AGENT“ | 10 / měsíc |
| Domluvené konzultace z IG/FB | 4 / měsíc |
| Sledující | vedlejší, neřešit |

Dosah bez konverze je zbytečný. Každý příspěvek končí jedním CTA.

---

## 2. Obsah (fáze 2)

### Rytmus (týdně, totéž na IG i FB)
| Den | Formát | Pilíř |
|---|---|---|
| Po | Reel (animace, `reels-prompts.md`) | Agent v akci |
| St | Carousel 6–8 slidů | Edukace / bolest |
| Čt | Reel **s tváří Romana** (telefon, 20–40 s) | Zákulisí / názor |
| Pá | Reel (animace) | Agent v akci |
| Ne | Carousel | Výsledek / srovnání |

= **3 reely + 2 carousely týdně**. Časy: 11:30 nebo 19:30.

### Pilíře
1. **Agent v akci (40 %)** — jedna konkrétní scéna z provozu. Zdroj: 49 hotových promptů v `reels-prompts.md`.
2. **Bolest provozu (25 %)** — zmeškané hovory, ruční přepisování, zapomenuté follow-upy. Carousel: „5 úkolů, které vaše recepční dělá zbytečně“.
3. **Edukace (20 %)** — „ChatGPT poradí, agent to udělá“, pozoruje / rozhoduje / jedná / pamatuje si.
4. **Zákulisí a důvěra (15 %)** — Roman na kameru: jak nastavuje agenta, co řekl klient, chyba, kterou udělal.

**Nepříjemná pravda:** animované reely jsou dobrý základ, ale jako solo zakladatel prodáváš sebe.
Jedno 30s video s tváří týdně bude mít větší dopad na konzultace než tři animace. Natočíš na telefon
za 10 minut, střih udělám já (titulky, zkrácení), pokud video nahraješ do repa.

### Carousely
- 1080 × 1350 (4:5), **JPEG** (Instagram přes API PNG nebere), 6–8 slidů, max 10.
- Slide 1 = hook (max 7 slov, Fraunces), poslední slide = CTA.
- Vyrábím je stejně jako reely: HTML ve značkovém stylu → screenshot přes Playwright → JPEG.
  Ukládají se do `social/carousels/<nazev>/01.jpg …`.

### CTA a automatizace „AGENT“
Komentář „AGENT“ → automatická DM se 2 otázkami (obor, počet zaměstnanců) → Calendly odkaz.
Nastavit v **Meta Business Suite → Automatizace** (zdarma) nebo ManyChat. Bez toho CTA nefunguje.

---

## 3. Fáze 2: jednorázové napojení (Roman, ~30 min)

1. **Instagram → profesionální (firemní) účet** a propojit s FB stránkou Nexivo (Meta Business Suite → Nastavení → Účty).
2. **developers.facebook.com → Create app** (typ Business). Přidat produkty *Facebook Login for Business* a *Instagram Graph API*.
   Aplikace může zůstat v **Development mode** — publikuješ jen na vlastní účty jako admin, App Review není potřeba.
3. **Graph API Explorer** → vybrat aplikaci → User token s oprávněními:
   `pages_show_list, pages_read_engagement, pages_manage_posts, instagram_basic, instagram_content_publish, business_management`.
4. **Access Token Debugger → Extend** (60denní user token) → v Exploreru `GET /me/accounts` →
   `access_token` stránky = **trvalý token stránky**. ID stránky je tamtéž.
   IG ID: `GET /<id-stránky>?fields=instagram_business_account`.
5. **Prostředí Claude** (menu prostředí v záhlaví session → Edit):
   - proměnné `META_PAGE_TOKEN`, `META_PAGE_ID`, `META_IG_USER_ID`
   - Network access → Allowed domains: `graph.facebook.com`, `rupload.facebook.com`
   - nová session je načte. **Token nikdy nevkládej do chatu.**
6. Ověření: `node social/tools/publish-meta.js check`.

Token stránky odvozený z dlouhodobého user tokenu nevyprší. Zneplatní ho změna hesla nebo odebrání aplikace.

---

## 4. Fáze 2: jak to poběží

1. **Pondělí ráno, jedna session (~45 min tvého času):** napíšeš „vyrob týden“ → vyrobím 3 reely + 2 carousely + popisky.
2. Pošlu náhledy, ty schválíš / opravíš (jedno kolo).
3. Publikuju: hned, nebo naplánuju připomínku do session na konkrétní čas (IG API neumí nativní plánování).
4. Neděle: rychlý report (dosah, uložení, komentáře AGENT) a co příští týden změnit.

Příkazy:
```bash
node social/tools/publish-meta.js reel social/reels/followup-a/nexivo-followup-a.mp4 --caption-file social/reels/followup-a/caption.txt --publish
node social/tools/publish-meta.js carousel social/carousels/chatgpt-vs-agent/0{1..7}.jpg --caption-file social/carousels/chatgpt-vs-agent/caption.txt --publish
```
Bez `--publish` je to jen náhled. Carousel obrázky musí být pushnuté (berou se z veřejného GitHubu).

Limity Meta: 100 příspěvků přes API za 24 h na IG účet (carousel = 1), carousel max 10 položek,
reel 3 s – 15 min, MP4 H.264, 9:16.

---

## 5. Náklady fáze 2

### Meta a nástroje
| Položka | Cena |
|---|---|
| Meta Graph API, aplikace, publikace | **0 Kč** |
| Hosting médií (veřejný GitHub repo) | 0 Kč |
| Automatizace „AGENT“ v Meta Business Suite | 0 Kč (ManyChat volitelně, placený tarif) |
| Placená podpora příspěvků (doporučeno od 2. měsíce, jen top reely) | 150–300 Kč/den, ~3 000 Kč/měs. |

### Claude (kredity)
Odhad podle velikosti práce. Ceny Opus 5.5: $4 / 1M vstupních, $20 / 1M výstupních tokenů,
čtení z cache $0,20 / 1M. Přepočet ~23 Kč/$.

| Úkol | Tokeny (přibližně) | Při API cenách |
|---|---|---|
| Nový reel (scény, render, kontrola snímků, popisek) | 1,5–3 M vstup (většina z cache) + 30–50 k výstup | ~50–80 Kč |
| Carousel 7 slidů + popisek | 0,5–1 M + 15–25 k | ~15–30 Kč |
| Publikace jednoho příspěvku | 50–150 k + 2 k | ~2–5 Kč |
| Týdenní report | 200–400 k + 5 k | ~5–10 Kč |

**Měsíčně (12 reelů + 8 carouselů + publikace + 4 reporty): ~1 000–1 500 Kč** při API cenách.
Na předplatném Claude (Max) se to vejde do limitů, na Pro budeš týdenní dávku tahat přes 2 okna.

Jak to držet levně:
- **Vyrábět v dávce** jednou týdně v jedné session (kontext se načte jednou, zbytek jde z cache).
- Nové reely stavět kopií hotové šablony (`reels/followup-a/`), ne od nuly.
- Opravy dávat najednou v jednom kole, ne po jedné.
