# Nexivo: prompty na Reels / FB videa

49 promptů, 16 agentů po 3 variantách (Follow Up má 4: navíc skutečná případová studie).
Podklady: web nexivoai.cz + prezentace „AI Agenti 2026 nexivo“ (Google Slides). Každý prompt je samostatné zadání pro výrobu videa.
Použití: napište „vyrob reel podle `social/reels-prompts.md`, **Inquiry Agent B**“.

---

## 0. Společná pravidla (platí pro každé video)

**Formát**
- 1080 × 1920, 30 fps, **15–20 s**, MP4 H.264, bez zvuku (hudbu přidat v Instagramu / FB).
- Výroba: HTML + GSAP timeline, render po snímcích (jako `nexivo-inquiry-reel.mp4`).
- Bezpečná zóna: důležitý text mezi **y 250–1500 px**, nic podstatného do pravých 140 px (ikony IG).

**Brand**
- Krémová `#F7F5EF`, téměř černá `#0A0A0A`, limetková `#C5E832` jen na akcent a zvýraznění.
- Nadpisy Fraunces (italika šedě / limetkově na tmavé), text systémový sans.
- Žádné emoji v obraze, čisté čárové ikony, karty s velkým zaoblením.
- Logo `assets/nexivo-logo.png` (světlé pozadí) / `nexivo-logo-inverse.png` (tmavé).

**Struktura (vždy stejná kostra)**
| Čas | Část | Obsah |
|---|---|---|
| 0–3 s | **Hook** | Číslo, statistika nebo bolest. Pohyb už v 1. snímku. |
| 3–6 s | **Problém** | Rozvést bolest na konkrétní situaci z provozu. |
| 6–14 s | **Agent v akci** | Co agent reálně udělá: notifikace na iPhonu, e-mail, zápis do kalendáře, faktura, report… |
| 14–17 s | **Výsledek** | Jedna věta / jedno číslo, co majitel získá. |
| posledních 2,5–3 s | **CTA** | Tmavá karta: **„Napište do komentáře AGENT a zjistěte, jak tohoto pomocníka získat.“** + logo + `nexivoai.cz` |

**Co funguje na IG/FB (dodržovat)**
1. **Žádné prázdné úvodní snímky.** 1. snímek už obsahuje text a pohyb. Žádné fade-in z prázdna.
2. **Hook v horní třetině**, max 7 slov, velké písmo (110–150 px).
3. **Pattern interrupt do 1 s**: rychlý zoom, „cvaknutí“ notifikace, číslo, které se roztočí, nebo přeškrtnutí.
4. **Změna obrazu každých 1,5–2,5 s.** Nic nestojí déle než 3 s.
5. **Titulky / text v obraze vždy**: většina lidí kouká bez zvuku.
6. **Konkrétní scéna z provozu** (jméno klienta, čas, částka) > obecné tvrzení.
7. **Smyčka**: poslední snímek CTA vizuálně navazuje na hook, aby video běželo znovu (víc přehrání = lepší dosah).
8. **Jedna myšlenka na video.** Ne seznam všech funkcí.
9. Statistiku vždy s **malým zdrojem** dole (26 px, šedá). Bez zdroje = neuvádět číslo, použít bolest.

**CTA a komentář „AGENT“**: aby to fungovalo, je potřeba automatická odpověď do DM (ManyChat nebo Meta Business Suite → Automatizace → klíčové slovo „AGENT“). Bez ní lidi napíší a nic se nestane.

**Klíčová sdělení z prezentace (používat ve výsledku / CTA části)**
- „AI agent = zaměstnanec na 24/7 úvazek.“
- „Naučíte ho všechno jednou a on to už nezapomene.“
- „Nespí, nezapomíná a nikdy se nevzdá.“
- Čtyři věci, které běžná AI neumí: **pozoruje, rozhoduje, jedná, pamatuje si**. ChatGPT poradí, agent tu práci udělá.
- „Funguje jako super zaměstnanec, za zlomek ceny.“
- Prezentace míří hlavně na **realitní makléře**: varianty označené *(makléři)* používají jejich scénáře (prohlídky, Sreality, majitelé nemovitostí).

**Skutečná případová studie (z prezentace):** investor do nemovitostí, Follow Up Agent se pravidelně ptal majitelů neprodaných nemovitostí, v jaké fázi prodeje jsou → **deal za 3 mil. Kč**, který by jinak proklouzl. Použít jen anonymně a se souhlasem klienta (stejné pravidlo jako případová studie na webu).

**Ověřené zdroje k číslům** (používat jen tyto, nebo dohledat nové):
| Číslo | Zdroj | Poznámka |
|---|---|---|
| až o **391 %** vyšší konverze při odpovědi do 1 min | Velocify, analýza 3,5 mil. leadů (2010–2012) | srovnání „do 1 min“ vs „později“ |
| **23 %** firem na poptávku z webu nikdy neodpovědělo, průměr **42 h** | HBR, *The Short Life of Online Sales Leads* (2011), 2 241 firem | |
| kontakt do 1 h → **~7×** vyšší šance kvalifikovat lead | HBR, studie 1,25 mil. leadů (2011) | vs. kontakt o hodinu později |
| připomínky snižují nedorazivší o **~25 %** (21 % → 15 %) | meta-analýza, *Using digital notifications to improve attendance* (2016) | zdravotnictví |
| obchodníci prodávají jen **28 %** času | Salesforce, State of Sales (2023), 7 700 obchodníků | zbytek admin a data |
| **28 %** pracovního týdne (~13 h) zabírají e-maily | McKinsey Global Institute (2012) | starší data |
| **~11 h týdně** tráví majitelé malých firem administrativou | American Express SME Barometer (UK) | |
| **10 h týdně** tráví firmy vymáháním pozdních plateb | Intrum, European Payment Report 2024 | Evropa |
| **88 %** lidí zvolí firmu, která odpovídá na všechny recenze (vs. 47 %) | BrightLocal, Local Consumer Review Survey 2024 | |

Nepoužívat: „62 % hovorů zůstane nezvednutých“ a „85 % lidí nezavolá zpět“. Kolují jen po blozích prodejců bez primární studie.

---

## 1. Inquiry Agent
*Odpoví na poptávku z webu, e-mailu nebo formuláře do minuty, zjistí potřebné informace a nabídne termín schůzky. Z prezentace: „Osloví zájemce dřív, než stihne napsat konkurenci.“ 60 s od poptávky k první zprávě. „Rozdíl mezi odpovědí za 40 vteřin a za dva dny je rozdíl mezi zakázkou a promarněným leadem.“*

### Inquiry Agent A: „Závod se stopkami“ (17 s)
- **Hook 0–3 s:** Obrazovka rozdělená na dvě poloviny, nahoře „Vy“, dole „Konkurence“. Obě stopky startují z 0:00 a text „Kdo odpoví dřív?“ dopadne do středu.
- **Problém 3–6 s:** Vaše stopky běží dál (2 h, 5 h, 18 h), u konkurence zezelená „0:38 · odpovězeno“. Text: „Zákazník už má termín jinde.“
- **Agent 6–14 s:** Vaše polovina se přepne na Inquiry Agenta. Poptávka „Rekonstrukce koupelny“, agent píše, nabídne „čt 9:00 / pá 14:00“, klient klikne a v kalendáři se objeví blok. Stopky skončí na 0:38.
- **Výsledek 14–17 s:** „Do 1 minuty = až o 391 % vyšší šance na obchod.“ Zdroj: Velocify.
- **CTA:** standardní karta.
- **Popisek:** Konkurence vám nebere zákazníky cenou, ale rychlostí. Napište AGENT.

### Inquiry Agent B: „23 % firem nikdy neodpoví“ (16 s)
- **Hook 0–3 s:** Mřížka 100 malých ikon obálek, 23 z nich zčervená a „spadne“. Velké „23 %“.
- **Problém 3–6 s:** „…firem na poptávku z webu nikdy neodpoví. Průměr ostatních: 42 hodin.“ Zdroj: HBR 2011.
- **Agent 6–13 s:** Jedna obálka přiletí na iPhone, notifikace „Nová poptávka · 21:47“. Agent odpoví v 21:48 a doptá se: „Jaká je výměra? Kdy by vám to vyhovovalo?“ Klient odpoví a zapíše se do CRM.
- **Výsledek 13–16 s:** „Odpověď ve 21:48. I když vy už spíte.“
- **Popisek:** Poptávky nechodí jen v pracovní době. Napište AGENT.

### Inquiry Agent C: „POV: makléř na prohlídce“ (18 s) *(makléři)*
- **Hook 0–3 s:** „POV: Jste na prohlídce. Telefon vibruje.“ Telefon v obraze se třese a notifikace „Poptávka ze Sreality“ se skládají na sebe (3×).
- **Problém 3–6 s:** Notifikace zešednou s časem „před 4 h“. Text: „Zájemce mezitím napsal dalším třem makléřům.“
- **Agent 6–14 s:** Přetočíme čas zpět na 18:02. Poptávka „Jana Pokorná · byt 2+kk, Hostivice“ → 18:02 agent: „Volný termín prohlídky mám zítra v 17:00, vyhovoval by vám?“ → 18:09 „Prohlídka potvrzena, lead uložen do CRM“. Totéž u zbylých dvou.
- **Výsledek 14–18 s:** „60 vteřin od poptávky k první zprávě. Vy ukazujete byt, agent domlouvá další.“
- **Popisek:** Kdo odpoví první, ten ukazuje byt. Napište AGENT.

---

## 2. Follow Up Agent
*Ozve se klientům k rozjednaným nabídkám, před schůzkou i po ní. Z prezentace: čte stav dealu v CRM, píše přes **WhatsApp nebo e-mail**, odpověď zapíše zpátky do CRM. „Ozve se každému, na koho byste zapomněli.“*

### Follow Up Agent A: „30 dní ticha“ (17 s)
- **Hook 0–3 s:** Trhací kalendář rychle odlistuje 30 stránek, každá s razítkem „bez odpovědi“. Text: „Nabídka odeslána. Pak ticho.“
- **Problém 3–6 s:** Karta nabídky „Martin Kovář · 186 000 Kč“ blédne a přidá se na hromádku dalších zapomenutých nabídek. „Nikdo se neozval. Ani vy.“
- **Agent 6–14 s:** Den 30: Follow Up Agent pošle zprávu na WhatsApp „Je pro vás nabídka stále aktuální?“. Klient odpoví „Ano, zavolejte mi zítra“, v CRM se změní stav na „Horký“ a obchodník dostane úkol.
- **Výsledek 14–17 s:** Karta 186 000 Kč se vrátí z hromádky zpátky do barvy. „Žádná nabídka už neusne.“
- **Popisek:** Nejdražší nabídka je ta, na kterou se zapomnělo. Napište AGENT.

### Follow Up Agent B: „Hřbitov nabídek“ (16 s)
- **Hook 0–3 s:** Tabulka v CRM, sloupec „Poslední kontakt“ se rozsvítí červeně u 9 řádků. Velký součet „1 240 000 Kč v nabídkách bez odpovědi“. *(ilustrativní ukázka)*
- **Problém 3–6 s:** „Obchodník to měl v plánu. Pak přišel další týden.“
- **Agent 6–13 s:** Agent projede řádky jeden po druhém, ke každému napíše personalizovanou zprávu (podle předmětu nabídky) a stav se přepíná z „Ticho“ na „Odpověděl“. Počítadlo odpovědí roste.
- **Výsledek 13–16 s:** „Obchodník volá jen těm, kdo odpověděli.“
- **Popisek:** Kolik peněz vám leží v nabídkách, na které se nikdo nezeptal? Napište AGENT.

### Follow Up Agent C: „Den po schůzce“ (18 s)
- **Hook 0–3 s:** „Schůzka proběhla skvěle. A pak…“ Rychlý střih na prázdnou schránku a cvrčky (vizuálně: ikona přesýpacích hodin).
- **Problém 3–6 s:** „Klient čeká na shrnutí. Vy máte další 4 schůzky.“
- **Agent 6–14 s:** 1 h po schůzce agent pošle shrnutí, další kroky a termín. Za 3 dny přijde připomínka „Dorazila vám nabídka?“ a pak iPhone notifikace majiteli: „Klient potvrdil objednávku“.
- **Výsledek 14–18 s:** „Profesionální dojem bez jediné minuty vaší práce.“
- **Popisek:** Rozdíl mezi „ozveme se“ a podpisem je follow-up. Napište AGENT.

### Follow Up Agent D: „3 miliony z jednoho follow-upu“ (18 s) *(případová studie)*
- **Hook 0–3 s:** Velké „3 000 000 Kč“ se roztočí z nuly, pod tím „z jednoho dealu, který málem proklouzl“.
- **Problém 3–6 s:** Seznam neprodaných nemovitostí, majitelé neodpovídají, investor „to zkusí za měsíc“, a pak zapomene.
- **Agent 6–14 s:** Follow Up Agent se pravidelně ptá majitelů i makléřů „V jaké fázi je prodej?“ (měsíc 1, 2, 3 se odlistuje), jeden majitel po 3 měsících odpoví „Cena jde dolů, máte zájem?“ a investor dostane notifikaci „Horký deal“.
- **Výsledek 14–18 s:** „Nikdy se nevzdal. Proto našel deal, který by jinak proklouzl.“ Malý text: „Skutečný klient Nexivo, anonymizováno.“
- **Popisek:** Nejlepší obchody vznikají z vytrvalosti, kterou člověk nemá čas mít. Napište AGENT.
- **Poznámka:** jen se souhlasem klienta.

---

## 3. Calendar Manager Agent
*Domlouvá a přeplánuje termíny napříč kalendáři týmu. Nic se nepřekrývá, nic nevypadne. Z prezentace: klient napíše e-mail, že chce změnit termín, agent najde v kalendáři nejlepší náhradu, sám pošle e-mail se 2 možnostmi a po odpovědi termín zapíše („Vytvořeno agentem“). „Vy se jen řídíte podle kalendáře.“*

### Calendar Manager A: „Tetris v kalendáři“ (16 s)
- **Hook 0–3 s:** Týdenní kalendář a do něj padají bloky schůzek jako v Tetrisu a překrývají se (červené kolize). „Kdo tohle dnes přeplánuje?“
- **Problém 3–6 s:** Chatové bubliny „Můžeme to posunout?“ ×5, čas plyne. „Hodina denně jen na domlouvání termínů.“ *(bolest, bez čísla ze studie)*
- **Agent 6–13 s:** Calendar Manager vezme bloky a rovná je: kolize zmizí, mezery vyplní, klientům odejdou e-maily s výběrem náhradního termínu, ti kliknou a bloky zezelenají.
- **Výsledek 13–16 s:** Čistý kalendář celého týmu. „Váš tým se jen řídí kalendářem.“
- **Popisek:** Domlouvání termínů není práce, za kterou vám někdo zaplatí. Napište AGENT.

### Calendar Manager B: „Nedorazil“ (17 s)
- **Hook 0–3 s:** Prázdná židle a hodiny ukazují 9:15. Velké „Nedorazil.“
- **Problém 3–6 s:** „Připomínky snižují nedorazivší klienty asi o čtvrtinu.“ Graf 21 % → 15 %. Zdroj: meta-analýza 2016.
- **Agent 6–14 s:** Den předem iPhone klienta: „Zítra 9:00 · Potvrdit / Přesunout“. Klient klikne „Přesunout“, agent nabídne 2 termíny a uvolněný slot obsadí jiný klient z čekací listiny.
- **Výsledek 14–17 s:** Židle už není prázdná. „Volný termín = ztracené peníze. Agent ho zaplní.“
- **Popisek:** Každý nedorazivší klient vás stojí hodinu práce. Napište AGENT.

### Calendar Manager C: „Přeobjedná prohlídku bez jediného kliknutí“ (18 s) *(makléři)*
- **Hook 0–3 s:** E-mail „Dobrý den, nestihnu zítřejší prohlídku…“ a nad ním „09:12“. Text: „A teď 20 minut přeposílání termínů.“
- **Problém 3–6 s:** Kalendář makléře plný: focení bytu Korunní 8, prohlídky, schůzky. „Kde je volno?“
- **Agent 6–14 s:** 09:14 odeslaná pošta: „Náhradní termíny prohlídky, Vinohradská 24: čt 2. 10. 16:30 / pá 3. 10. 14:00“. Klient odepíše „čtvrtek“ a v kalendáři se objeví blok „Prohlídka, Vinohradská 24 · 16:30–17:15 · Tomáš Novák“ se štítkem „VYTVOŘENO AGENTEM“.
- **Výsledek 14–18 s:** „2 minuty od e-mailu po nový termín. Bez jediného vašeho kliknutí.“
- **Popisek:** Přeplánování termínu není práce pro makléře. Napište AGENT.

---

## 4. Reporting Agent
*Čte CRM, fakturaci a kalendář. Každé pondělí pošle majiteli přehled firmy a upozorní na problémy.*

### Reporting Agent A: „Pondělí 7:00“ (16 s)
- **Hook 0–3 s:** Zamčený iPhone, hodiny přeskočí 6:59 → 7:00 a „cvakne“ notifikace „Týdenní přehled firmy“.
- **Problém 3–6 s:** Flashback: neděle večer, Excel, 4 záložky, exporty. „Tohle už dělat nemusíte.“
- **Agent 6–13 s:** Notifikace se otevře do reportu: tržby 412 300 Kč (číslo se roztočí), +8,4 %, nové poptávky 23, sloupce schůzek po obchodnících. *(ilustrativní)*
- **Výsledek 13–16 s:** Žlutý box „Upozornění: u Petra 3. týden klesá počet schůzek.“ Text: „Víte to dřív, než to bolí.“
- **Popisek:** Kolik jste minulý týden vydělali? Bez otevření Excelu. Napište AGENT.

### Reporting Agent B: „Řídíte firmu podle pocitu?“ (17 s)
- **Hook 0–3 s:** Velký otazník, který se rozpadne na čísla. „Řídíte firmu podle pocitu?“
- **Problém 3–6 s:** Tři otázky rychle za sebou: „Kolik nabídek visí? Kdo nestíhá? Které zakázky nejsou zaplacené?“ Pod každou „nevím“.
- **Agent 6–14 s:** Agent propojí CRM, fakturaci a kalendář (tři ikony se spojí čarou) a vyjede jedna stránka se 3 odpověďmi, každá s barevným semaforem.
- **Výsledek 14–17 s:** „Jedna stránka. Každé pondělí. Bez exportu.“
- **Popisek:** Data už máte. Jen je nikdo nedává dohromady. Napište AGENT.

### Reporting Agent C: „Problém, který byste přehlédli“ (18 s)
- **Hook 0–3 s:** Graf tržeb roste a nahoře „Všechno vypadá dobře.“ Pak zoom na detail.
- **Problém 3–6 s:** Detail ukáže: jeden zákazník = 40 % tržeb, splatnost se mu prodlužuje. „Tohle v grafu nevidíte.“ *(ilustrativní)*
- **Agent 6–14 s:** Reporting Agent tuto anomálii označí limetkovým zvýrazňovačem a majitel dostane notifikaci „Riziko: závislost na 1 zákazníkovi + zpožděné platby“ s doporučeným krokem.
- **Výsledek 14–18 s:** „Agent nečte jen čísla. Čte souvislosti.“
- **Popisek:** Nejnebezpečnější problém je ten, o kterém nevíte. Napište AGENT.

---

## 5. Voice Agent
*Zvedá telefon, když váš tým nemůže. Vyřídí dotaz nebo zapíše termín, umí i odchozí hovory, třeba potvrzení schůzek.*

### Voice Agent A: „Zmeškané hovory“ (16 s)
- **Hook 0–3 s:** iPhone zamčená obrazovka, notifikace „Zmeškaný hovor“ padají jedna za druhou a počítadlo letí 1 → 7. „Dnes do 12:00.“
- **Problém 3–6 s:** Kadeřnice s nůžkami v ruce (ilustrace / silueta) a text: „Nemůžete odejít od klienta.“
- **Agent 6–13 s:** Hovor zvedne Voice Agent a na obrazovce běží přepis hovoru: „Dobrý den, salon Bella, jak vám mohu pomoci?“ Klientka chce střih v pátek, agent nabídne 15:30 a zapíše termín, v kalendáři vyskočí blok.
- **Výsledek 13–16 s:** Počítadlo zmeškaných hovorů padá 7 → 0. „Každý hovor zvednutý.“
- **Popisek:** Kolik zákazníků vám dnes nedovolalo? Napište AGENT.

### Voice Agent B: „Mimo pracovní dobu“ (17 s)
- **Hook 0–3 s:** Ceduli „ZAVŘENO“ na dveřích někdo otočí a telefon za ní zvoní. „19:40. Někdo volá.“
- **Problém 3–6 s:** „Zákazník zavolá konkurenci, která to zvedne.“
- **Agent 6–14 s:** Voice Agent hovor zvedne, zjistí, o co jde (oprava auta, STK), nabídne termín zítra 8:00 a pošle SMS potvrzení. Majitel ráno vidí v přehledu „Večer: 3 hovory · 2 termíny“.
- **Výsledek 14–17 s:** „Vaše firma má otevřeno, i když vy ne.“
- **Popisek:** Recepční, která nikdy nemá pauzu. Napište AGENT.

### Voice Agent C: „Odchozí potvrzení“ (18 s)
- **Hook 0–3 s:** Seznam 24 zítřejších termínů a u každého ikona telefonu. „Kdo jim všem zavolá?“
- **Problém 3–6 s:** „Recepční: 2 hodiny na telefonu. Každý den.“
- **Agent 6–14 s:** Voice Agent volá postupně (ikony se rozsvěcují), u každého „Potvrzeno ✓“ nebo „Přesunuto“. Uvolněné sloty se hned nabídnou dalším.
- **Výsledek 14–18 s:** „Méně prázdných židlí. Připomínky snižují nedorazivší asi o čtvrtinu.“ Zdroj: meta-analýza 2016.
- **Popisek:** Potvrzování termínů není práce pro člověka. Napište AGENT.

---

## 6. Google Review Agent
*Po dokončení zakázky požádá spokojeného klienta o recenzi na Googlu. Víc recenzí, víc důvěry, víc poptávek. Z prezentace: „Po podpisu smlouvy si sám řekne o recenzi. Vy už nemusíte.“ Zpráva 2 dny po podpisu: „Dobrý den, pane Nováku, ještě jednou gratuluji k novému bytu. Kdybyste měl minutu, moc by mi pomohlo krátké hodnocení na Googlu.“ → 4,9 ★ · 68 recenzí.*

### Google Review Agent A: „4,1 vs 4,8“ (16 s)
- **Hook 0–3 s:** Mapa Google, dva piny vedle sebe: „Vy 4,1 ★ (12)“ vs „Konkurence 4,8 ★ (230)“. Uživatel klikne na konkurenci.
- **Problém 3–6 s:** „Spokojení zákazníci recenze nepíšou. Nespokojení ano.“
- **Agent 6–13 s:** Zakázka označena „Hotovo“ → za 2 h SMS klientovi „Jak jste byl spokojen?“ → 5 hvězd → rovnou odkaz na Google recenzi. Počítadlo recenzí roste 12 → 47, hodnocení 4,1 → 4,7. *(ilustrativní)*
- **Výsledek 13–16 s:** Teď klikají na váš pin. „Recenze přicházejí samy.“
- **Popisek:** Lidé si vybírají podle hvězdiček dřív, než vám zavolají. Napište AGENT.

### Google Review Agent B: „Ve správnou chvíli“ (17 s)
- **Hook 0–3 s:** Šťastný klient odjíždí z autoservisu (ilustrace) a nad ním bublina „Super práce!“. Text: „A recenzi nenapíše nikdy.“
- **Problém 3–6 s:** „Na to, abyste o ni požádali, si vzpomenete za 3 týdny.“
- **Agent 6–14 s:** Agent pozná dokončenou zakázku (podpis smlouvy / faktura) a 2 dny poté pošle osobní zprávu „…ještě jednou gratuluji k novému bytu…“ ve chvíli, kdy je klient nejspokojenější, a nespokojené hodnocení (3 ★ a méně) pošle soukromě majiteli místo na Google.
- **Výsledek 14–17 s:** „Pochvala skončí na Googlu. Kritika u vás, ne veřejně.“
- **Popisek:** Načasování je všechno, i u recenzí. Napište AGENT.

### Google Review Agent C: „Na recenze se odpovídá“ (18 s)
- **Hook 0–3 s:** „88 % lidí zvolí firmu, která odpovídá na všechny recenze.“ Číslo se roztočí. Zdroj: BrightLocal 2024.
- **Problém 3–6 s:** Profil firmy se 40 recenzemi bez jediné odpovědi, šedé bubliny.
- **Agent 6–14 s:** Agent připraví osobní odpověď ke každé recenzi a majitel ji schválí jedním klepnutím na iPhonu. Bubliny „Odpověď majitele“ se postupně doplňují.
- **Výsledek 14–18 s:** „Vypadáte jako firma, které na zákaznících záleží. Protože záleží.“
- **Poznámka:** jen pokud agent u klienta odpovídá i na recenze, jinak tuto variantu nepoužívat.
- **Popisek:** Recenze bez odpovědi = zákazník bez odpovědi. Napište AGENT.

---

## 7. Lead Agent / Lead Scraper Agent
*Pravidelně prochází zdroje, které určíte, a připraví obchodníkům čerstvé kontakty bez ručního hledání. Z prezentace: každou neděli projede **Bazoš, Bezrealitky, Sreality a Facebook Marketplace** a hledá nemovitosti a pozemky bez makléře. Lead přijde rovnou do **Telegramu** (fotka, cena, lokalita, odkaz) s tlačítkem **„Claimnout“**, lead si vezme první makléř. Jednou týdně souhrn: co přišlo a co zůstalo ležet. „Na dlouhou trať několik zakázek navíc ročně.“*

### Lead Agent A: „28 % času prodejem“ (16 s)
- **Hook 0–3 s:** Koláčový graf pracovního týdne obchodníka, výseč „prodej“ se zmenší na **28 %**. Zdroj: Salesforce State of Sales.
- **Problém 3–6 s:** Zbytek koláče se popíše: „hledání kontaktů“, „přepisování do CRM“, „admin“.
- **Agent 6–13 s:** Lead Agent projede zdroje (mapa, katalogy, weby) jako radar a karty kontaktů naskakují do CRM s poznámkou „proč právě oni“.
- **Výsledek 13–16 s:** Výseč „prodej“ naroste. „Obchodník volá. Agent hledá.“
- **Popisek:** Platíte obchodníka za hledání v Google Mapách? Napište AGENT.

### Lead Agent B: „Claimni první“ (17 s) *(makléři)*
- **Hook 0–3 s:** Telegram notifikace „NOVÝ LEAD“ s fotkou bytu „3+1 · Brno-Líšeň · 5,9 mil. · bez makléře“ cvakne do obrazu.
- **Problém 3–6 s:** Flashback: makléř v neděli večer projíždí Bazoš, Bezrealitky, Sreality, Marketplace (4 záložky se střídají). „2 hodiny. Každou neděli.“
- **Agent 6–14 s:** Agent projede všechny 4 portály (loga se postupně odškrtnou), leady padají do skupiny v Telegramu, makléř Petr klepne „Claimnout“ a lead je jeho, ostatní vidí „Vzal Petr“.
- **Výsledek 14–17 s:** Týdenní souhrn: „14 leadů · 11 vzato · 3 leží“. *(ilustrativní)* „Kdo claimne první, volá první.“
- **Popisek:** Nemovitosti bez makléře nečekají, až budete mít čas. Napište AGENT.

### Lead Agent C: „Signál k nákupu“ (18 s)
- **Hook 0–3 s:** „Tahle firma vás právě teď potřebuje. A neví o vás.“ Pulzující pin na mapě.
- **Problém 3–6 s:** Signály, které člověk přehlédne: nová pobočka, inzerát na recepční, špatné recenze na nedostupnost.
- **Agent 6–14 s:** Lead Agent signály sbírá (ikony se slévají do jedné karty), skóruje je „horký / teplý“ a horké pošle obchodníkovi s návrhem zprávy.
- **Výsledek 14–18 s:** „Voláte těm, kdo to řeší právě teď.“
- **Popisek:** Nejlepší čas zavolat je, když mají problém. Napište AGENT.

---

## 8. Social Trends Agent
*Sleduje trendy na sociálních sítích ve vašem oboru a každé pondělí pošle hotový plán: co natočit, čím video začít a jak ho natočit lépe. Z prezentace („Analytik trendů na sociálních sítích“): pošle **interaktivní HTML návod**, který se otevře v telefonu: u každého trendu jak ho natočit, čím, **jak daleko stát od kamery (2,5 m, celá postava, kamera v úrovni pasu)** a co říct v prvních 5 vteřinách. Příklad: „Tour bytu za 15 sekund ↑ 340 %“, hook „Tenhle byt šel z inzerátu do rezervace za 48 hodin. Tohle rozhodlo.“*

### Social Trends Agent A: „Co natočit tento týden?“ (16 s)
- **Hook 0–3 s:** Prázdná obrazovka natáčení s blikajícím červeným REC a text „Co mám dneska natočit?“.
- **Problém 3–6 s:** Nekonečný scroll feedu se rozmaže. „Hodina scrollování. Nula nápadů.“
- **Agent 6–13 s:** Notifikace „Trendy týdne“ → 2 videa z oboru s počty zhlédnutí, které rostou (+340 %), → hook na první 3 vteřiny → 3 tipy k natočení. *(ilustrativní)*
- **Výsledek 13–16 s:** „Plán na celý týden v pondělí v 8:00.“
- **Popisek:** Nevíte, co natočit? Agent už to ví. Napište AGENT.

### Social Trends Agent B: „1 284 videí za vás“ (17 s)
- **Hook 0–3 s:** Počítadlo letí 0 → 1 284 a pod ním mřížka miniatur videí. „Tolik videí ve vašem oboru prošel agent.“
- **Problém 3–6 s:** „Vy jste za týden viděli 20. A nevíte, proč fungovala.“
- **Agent 6–14 s:** Mřížka se zúží na 2 vítěze a agent rozebere, proč fungují: hook, délka, formát (štítky se přilepí k videu).
- **Výsledek 14–17 s:** „Netipujete. Kopírujete to, co prokazatelně funguje.“
- **Popisek:** Algoritmus není loterie, když víte, co funguje. Napište AGENT.

### Social Trends Agent C: „Hook, který zastaví palec“ (18 s)
- **Hook 0–3 s:** Palec scrolluje a pak se zastaví na limetkovém textu „Tady jsou 3 věci, které vám makléři neřeknou“.
- **Problém 3–6 s:** „Rozhodují první 3 vteřiny. Většina firem je promrhá logem.“
- **Agent 6–14 s:** V telefonu se otevře HTML návod „Trendy týdne“: trend „Tour bytu za 15 sekund ↑ 340 %“ → hook (typewriter) → schéma „kamera ← 2,5 m → vy, celá postava, kamera v úrovni pasu“ → štítky „na výšku · denní světlo · rychlé střihy“.
- **Výsledek 14–18 s:** „Otevřete v telefonu a jdete točit.“
- **Popisek:** Video bez hooku nikdo nedokouká. Napište AGENT.

---

## 9. Marketing specialist Agent (Manažer sociálních sítí)
*Z prezentace: „Nahrajete fotky a jednu větu. Zbytek udělá agent.“ Připraví a sdílí příspěvky na celý týden, vytvoří video nebo fotku, napíše text i hashtagy ve vašem tónu, vybere nejlepší čas a **zdůvodní proč**, publikuje na **Facebook, Instagram i YouTube**, **až 3× denně**. Klient jen schválí, nebo nechá agenta publikovat samotného.*

### Social Content Agent A: „Prázdný profil“ (16 s)
- **Hook 0–3 s:** Instagram profil firmy a poslední příspěvek „před 47 dny“ zčervená.
- **Problém 3–6 s:** „Zákazník vás najde. Vypadáte zavřeně.“
- **Agent 6–13 s:** Agent ze zakázky z minulého týdne (fotky + popis) sám poskládá carousel 5 slidů: slidy se skládají jeden po druhém, přidá se popisek a stav „Naplánováno · čt 18:00“.
- **Výsledek 13–16 s:** Mřížka profilu se zaplní 9 příspěvky. „Aktivní profil bez vaší práce.“
- **Popisek:** Váš profil je výloha. Kdy jste ji naposledy umyli? Napište AGENT.

### Social Content Agent B: „Ze zakázky video“ (17 s)
- **Hook 0–3 s:** Tři fotky z telefonu (před / během / po) vyletí z galerie. „Z tohohle bude reel.“
- **Problém 3–6 s:** „Natočit, sestříhat, napsat popisek… nikdy na to není čas.“
- **Agent 6–14 s:** Majitel nahraje 3 fotky a napíše jednu větu „Hotová koupelna v Líšni“. Agent fotky seřadí, přidá text, přechody a brand barvy, renderuje 15s video (progress bar), připíše popisek a hashtagy a navrhne čas „čt 18:00, protože vaši sledující jsou nejaktivnější večer“ → „Publikováno · Facebook + Instagram + YouTube“.
- **Výsledek 14–17 s:** „Každá zakázka = obsah. Automaticky.“
- **Popisek:** Nejlepší obsah už máte v galerii. Napište AGENT.
- **Poznámka:** tohle video je samo ukázkou té služby, v popisku to klidně řekněte: „Tohle video vyrobil agent.“

### Social Content Agent C: „Tohle video vyrobil agent“ (18 s)
- **Hook 0–3 s:** „Tohle video jsem nenatočil já.“ Text se přepíše na „Vyrobil ho AI agent.“
- **Problém 3–6 s:** „Majitel firmy nemá čas být influencer.“
- **Agent 6–14 s:** Split screen: vlevo podklady (web, ceník, recenze), vpravo agent z nich skládá týdenní plán (3 carousely + 2 reely) v kalendáři obsahu a stav „Ke schválení“ → majitel klepne „Schválit vše“.
- **Výsledek 14–18 s:** „Až 3 příspěvky denně. Vy jen schválíte.“
- **Popisek:** 2 minuty týdně na schválení, zbytek za vás. Napište AGENT.

---

## 10. Administrativní agent *(na míru)*
*Vyplňuje smlouvy, objednávky a dokumenty v Google Docs z údajů klienta, posílá je k podpisu a zakládá do složek.*

### Administrativní agent A: „11 hodin týdně“ (16 s)
- **Hook 0–3 s:** Hromada papírů roste a velké „11 h týdně“. Pod tím: „tolik tráví majitelé malých firem administrativou.“ Zdroj: American Express SME Barometer.
- **Problém 3–6 s:** „Kopírovat IČO, adresu, částku. Pořád dokola.“
- **Agent 6–13 s:** Google Docs šablona smlouvy: pole {Název firmy}, {IČO}, {Cena}, {Termín} se samy vyplňují (typewriter), dole se objeví „Odesláno k podpisu“ a soubor sám zaletí do složky „Klienti / 2026 / Novák s.r.o.“.
- **Výsledek 13–16 s:** „Smlouva hotová za 20 vteřin. Bez překlepu.“
- **Popisek:** Kolik smluv jste letos přepisovali ručně? Napište AGENT.

### Administrativní agent B: „Překlep v IČO“ (17 s)
- **Hook 0–3 s:** Smlouva a zvýrazněný řádek „IČO: 1989229“ (chybí číslice) bliká červeně. „Jedna chyba. Smlouva zpátky.“
- **Problém 3–6 s:** „Ruční přepisování = chyby, opravy, zdržení podpisu.“
- **Agent 6–14 s:** Agent načte údaje z objednávky / ARES, doplní je do šablony, sám zkontroluje, že sedí (fajfky u každého pole), a pošle klientovi.
- **Výsledek 14–17 s:** „Údaje z jednoho místa. Pokaždé správně.“
- **Popisek:** Administrativa nemá dělat chyby. Lidé je dělají, když spěchají. Napište AGENT.

### Administrativní agent C: „Od poptávky po podpis“ (18 s)
- **Hook 0–3 s:** Časová osa „Poptávka → Nabídka → Smlouva → Podpis“ a u každého kroku nálepka „ručně“. „4 kroky, 4× copy-paste.“
- **Problém 3–6 s:** „Smlouva čeká 3 dny, protože ji nikdo nestihl připravit.“
- **Agent 6–14 s:** Klient potvrdí nabídku a agent vygeneruje smlouvu v Google Docs, pošle ji k podpisu, po podpisu ji založí a majiteli přijde notifikace „Smlouva podepsána · Novák s.r.o.“.
- **Výsledek 14–18 s:** „Ze 3 dnů na 3 minuty.“ *(ilustrativní)*
- **Popisek:** Rychlost podpisu je rychlost tržby. Napište AGENT.

---

## 11. Chief of Staff agent *(na míru)*
*Sleduje e-maily a kalendář, připomíná úkoly, hlídá, co se mělo stihnout a nestihlo, a každé ráno řekne, co je dnes nejdůležitější.*

### Chief of Staff A: „Ranní briefing“ (17 s)
- **Hook 0–3 s:** iPhone budík 6:30 a pod ním hned notifikace „Váš den: 3 věci, které dnes musíte“.
- **Problém 3–6 s:** Flashback: 87 nepřečtených e-mailů, 6 schůzek, post-ity. „Kde začít?“
- **Agent 6–14 s:** Briefing se rozbalí: „1) Novák čeká na nabídku od úterka. 2) Ve 14:00 schůzka, podklady v příloze. 3) Faktura 32 000 Kč po splatnosti.“ U každého tlačítko „Vyřídit“.
- **Výsledek 14–17 s:** „Asistent, který čte všechno. Vy jen to důležité.“
- **Popisek:** Den začíná buď plánem, nebo chaosem. Napište AGENT.

### Chief of Staff B: „28 % týdne v e-mailu“ (16 s)
- **Hook 0–3 s:** Schránka a počítadlo nepřečtených letí 0 → 143. „28 % pracovního týdne v e-mailu.“ Zdroj: McKinsey.
- **Problém 3–6 s:** „Mezi tím se ztratí ten jeden e-mail, na kterém záleží.“
- **Agent 6–13 s:** Agent e-maily roztřídí: 3 vyžadují vás (limetkový štítek), 12 vyřídil sám (koncepty odpovědí), zbytek archivuje. Na iPhonu přijde upozornění jen na ty 3.
- **Výsledek 13–16 s:** Ze 143 zůstanou 3. „Zbytek má pod kontrolou.“
- **Popisek:** Nemusíte číst všechno. Jen to, co je opravdu pro vás. Napište AGENT.

### Chief of Staff C: „Co se nestihlo“ (18 s)
- **Hook 0–3 s:** Pátek 17:00 a seznam slibů z týdne („Pošlu do středy“, „Zavolám zítra“…), 3 z nich zčervenají. „Tohle jste slíbili. A nestihli.“
- **Problém 3–6 s:** „Neplněné sliby stojí důvěru, ne čas.“
- **Agent 6–14 s:** Agent je našel v e-mailech a kalendáři, sestaví seznam „Nestihlo se → navržený nový termín → koncept omluvného e-mailu“, majitel na iPhonu klepne „Odeslat vše“.
- **Výsledek 14–18 s:** „Nic nespadne pod stůl.“
- **Popisek:** Pamatovat si sliby není vaše práce. Napište AGENT.

---

## 12. Fakturační agent *(na míru)*
*Hlídá splatnost faktur, najde nezaplacené, pošle zdvořilou upomínku a zapíše stav do přehledu.*

### Fakturační agent A: „10 hodin týdně za cizími penězi“ (16 s)
- **Hook 0–3 s:** Razítko „PO SPLATNOSTI“ dopadne na fakturu. „10 hodin týdně.“
- **Problém 3–6 s:** „…tráví evropské firmy vymáháním pozdních plateb.“ Zdroj: Intrum European Payment Report 2024.
- **Agent 6–13 s:** Agent projde fakturaci a vytáhne 4 faktury po splatnosti (86 400 Kč), každému odběrateli pošle osobní upomínku a za 7 dní další.
- **Výsledek 13–16 s:** Razítka se jedno po druhém přepíšou na „ZAPLACENO“ a počítadlo dlužné částky padá na 0. *(ilustrativní)*
- **Popisek:** Peníze za odvedenou práci nemáte honit vy. Napište AGENT.

### Fakturační agent B: „Trapný telefonát“ (17 s)
- **Hook 0–3 s:** Telefon s kontaktem „Stálý zákazník“ a palec váhá nad „Volat“. „Nikdo nechce volat kvůli dluhu.“
- **Problém 3–6 s:** „Tak se to odkládá. A faktura stárne.“ Počítadlo dní po splatnosti běží 0 → 45.
- **Agent 6–14 s:** Agent pošle zdvořilou upomínku v tónu firmy, přiloží QR platbu a klient zaplatí. Majiteli přijde notifikace „Zaplaceno · 32 000 Kč“.
- **Výsledek 14–17 s:** „Vztah zůstal. Peníze dorazily.“
- **Popisek:** Upomínka nemusí být nepříjemná. Jen musí odejít včas. Napište AGENT.

### Fakturační agent C: „Cashflow přehled“ (18 s)
- **Hook 0–3 s:** Graf účtu klesá k nule a nahoře „Máte tržby. Proč nemáte peníze?“
- **Problém 3–6 s:** Pod grafem se rozsvítí „Nezaplaceno: 214 000 Kč“. *(ilustrativní)*
- **Agent 6–14 s:** Agent ukáže, kdo dluží a jak dlouho (seřazené karty), každý den pošle připomínky a v pondělí majiteli přehled „Vybráno 128 000 Kč · zbývá 86 000 Kč“.
- **Výsledek 14–18 s:** Graf účtu se zvedá. „Cashflow pod kontrolou bez jediného telefonátu.“
- **Popisek:** Faktura vystavená není faktura zaplacená. Napište AGENT.

---

## 13. Chat Agent
*Z prezentace: píše si s klienty **24/7 přes SMS, WhatsApp, web i Instagram**, i ve 22:40, když vy spíte. A dá vám vědět, když klient chce bližší informace.*

### Chat Agent A: „22:40“ (16 s)
- **Hook 0–3 s:** Tmavá obrazovka, hodiny 22:40 a zpráva na Instagramu „Dobrý den, máte ještě volný ten byt?“ cvakne do obrazu.
- **Problém 3–6 s:** „Vy spíte. Klient čeká. Ráno už píše jinam.“
- **Agent 6–13 s:** Chat Agent odpoví za pár vteřin, doptá se (rozpočet, termín), pošle fotky a nabídne prohlídku. Ráno majitel vidí notifikaci „Klient chce prohlídku · čt 17:00“.
- **Výsledek 13–16 s:** „Odpovídá ve 22:40. A ráno vám řekne, co klient chce.“
- **Popisek:** Zákazníci píšou, když mají čas oni, ne vy. Napište AGENT.

### Chat Agent B: „4 kanály, jeden agent“ (17 s)
- **Hook 0–3 s:** 4 ikony (SMS, WhatsApp, web chat, Instagram) a z každé letí zprávy najednou. „Kdo tohle všechno odpoví?“
- **Problém 3–6 s:** Recepční přepíná mezi 4 aplikacemi, zprávy se ztrácejí.
- **Agent 6–14 s:** Všechny zprávy se slijí do jednoho proudu a agent odpovídá v každém kanálu ve stejném tónu firmy. Zprávy, kde klient chce víc, dostanou limetkový štítek „Pro vás“.
- **Výsledek 14–17 s:** „Jeden agent. Všechny kanály. 24/7.“
- **Popisek:** Klient si vybere kanál. Vy nemusíte hlídat žádný. Napište AGENT.

### Chat Agent C: „Jen to důležité“ (18 s)
- **Hook 0–3 s:** Počítadlo „47 zpráv dnes“ a pod ním „Vy jste odpověděli na 0.“
- **Problém 3–6 s:** „Většina jsou stejné otázky: cena, termín, kde parkovat.“
- **Agent 6–14 s:** Agent odpoví na 44 rutinních dotazů (fajfky padají) a 3 konverzace, kde klient chce nabídku, předá majiteli s krátkým shrnutím na iPhonu.
- **Výsledek 14–18 s:** „Ze 47 zpráv řešíte 3. Ty, co vydělávají.“
- **Popisek:** Na „kolik to stojí“ nemusíte odpovídat stokrát. Napište AGENT.

---

## 14. Hledač smluv *(na míru)*
*Z prezentace: prohledá celou e-mailovou schránku a najde zapomenutý dokument.*

### Hledač smluv A: „Kde je ta smlouva?“ (16 s)
- **Hook 0–3 s:** Vyhledávací pole ve schránce „smlouva“ → „2 847 výsledků“. Text: „Kde je ta smlouva z roku 2023?“
- **Problém 3–6 s:** Scrollování, přílohy, „FW: RE: RE: smlouva final_v3“. „30 minut hledání.“
- **Agent 6–13 s:** Majitel napíše agentovi jednu větu „smlouva s Novákem na Korunní“, agent projede schránku a vrátí PDF s datem, odesílatelem a zvýrazněnou klauzulí o výpovědi.
- **Výsledek 13–16 s:** „Za 10 vteřin. I to, co jste zapomněli, že máte.“
- **Popisek:** Vaše schránka ví všechno. Jen se v ní nikdo nevyzná. Napište AGENT.

### Hledač smluv B: „Termín, který propadne“ (17 s)
- **Hook 0–3 s:** Kalendář a červené „Za 5 dní končí výpovědní lhůta“. „Věděli jste o tom?“
- **Problém 3–6 s:** „Byla to příloha e-mailu z loňského března.“
- **Agent 6–14 s:** Agent najde všechny smlouvy ve schránce, vytáhne z nich data (konec, výpověď, prodloužení) a založí připomínky do kalendáře. iPhone notifikace „Za 30 dní: výpověď smlouvy s dodavatelem X“.
- **Výsledek 14–17 s:** „Žádná lhůta už neproklouzne.“
- **Popisek:** Automatické prodloužení smlouvy stojí peníze. Napište AGENT.

### Hledač smluv C: „Přílohy na jednom místě“ (18 s)
- **Hook 0–3 s:** Rozsypané PDF ikonky po celé obrazovce. „Smlouvy, faktury, předávací protokoly… všude.“
- **Problém 3–6 s:** „Účetní chce podklady. Vy hledáte celý večer.“
- **Agent 6–14 s:** Agent projde schránku, PDF se samy seřadí do složek „Smlouvy / Faktury / Protokoly“ podle klienta a roku a účetní dostane sdílený odkaz.
- **Výsledek 14–18 s:** „Večer zpátky. Účetní spokojená.“
- **Popisek:** Papírování, které se uklidí samo. Napište AGENT.

---

## 15. Onboarding klienta *(na míru)*
*Z prezentace: pošle podklady, hlídá podpisy, připomene chybějící dokumenty.*

### Onboarding A: „Chybí podpis“ (16 s)
- **Hook 0–3 s:** Checklist nového klienta „Smlouva ✗ · Plná moc ✗ · Kopie OP ✗“. „Týden po domluvě. Pořád nic.“
- **Problém 3–6 s:** „Urgovat podklady je nepříjemné. Tak se to odkládá.“
- **Agent 6–13 s:** Agent pošle uvítací e-mail s podklady, za 2 dny připomene, co chybí, a položky se odškrtávají, jak klient dokumenty posílá. Majitel dostane „Onboarding hotový · Novák“.
- **Výsledek 13–16 s:** „Klient je připravený, než si na to vzpomenete.“
- **Popisek:** První dojem klienta dělá onboarding. Napište AGENT.

### Onboarding B: „První den klienta“ (17 s)
- **Hook 0–3 s:** „Podepsáno.“ Konfety se zastaví a nápis: „A co teď?“
- **Problém 3–6 s:** Klient čeká na instrukce. Vy máte další schůzku.
- **Agent 6–14 s:** Do 5 minut po podpisu odejde e-mail „Vítejte, tady je, co bude dál“, kalendářová pozvánka na úvodní schůzku a seznam podkladů s nahrávacím odkazem.
- **Výsledek 14–17 s:** „Profesionální start. Pokaždé stejně dobrý.“
- **Popisek:** Klient pozná kvalitu v prvních 24 hodinách. Napište AGENT.

### Onboarding C: „10 klientů, 10 checklistů“ (18 s)
- **Hook 0–3 s:** 10 karet klientů, každá s jiným počtem chybějících dokumentů (červená čísla).
- **Problém 3–6 s:** „Kdo co poslal? Kdo co podepsal?“ Excel s barevnými buňkami.
- **Agent 6–14 s:** Agent hlídá všech 10 najednou, posílá jen těm, komu něco chybí, a čísla se postupně mění na zelené fajfky. Majitel v pondělí dostane přehled „8 hotovo · 2 čekají na OP“.
- **Výsledek 14–18 s:** „Vy řešíte klienty. Ne papíry.“
- **Popisek:** Urgování dokumentů zvládne agent líp než vy. Napište AGENT.

---

## 16. Cenový hlídač *(na míru, makléři)*
*Z prezentace: upozorní, když v lokalitě spadnou ceny podobných nemovitostí.*

### Cenový hlídač A: „Cena spadla“ (16 s)
- **Hook 0–3 s:** iPhone notifikace „Brno-Žabovřesky: 3+1 zlevnilo o 400 000 Kč“ cvakne do obrazu.
- **Problém 3–6 s:** „Kupující to ví dřív než vy? Pak prodáváte naslepo.“
- **Agent 6–13 s:** Agent denně sleduje inzeráty v lokalitě, graf ceny za m² se vykresluje a zlevnění bliká. Makléř dostane shrnutí: „3 podobné byty zlevnily, váš je nad trhem o 6 %“. *(ilustrativní)*
- **Výsledek 13–16 s:** „Cenu nastavíte podle trhu. Ne podle pocitu.“
- **Popisek:** Trh se hýbe každý den. Vy se nemusíte dívat. Napište AGENT.

### Cenový hlídač B: „Argument pro majitele“ (17 s)
- **Hook 0–3 s:** Majitel bytu: „Za 7 milionů to prodáme.“ A pod tím razítko „?“.
- **Problém 3–6 s:** „Přesvědčit majitele o reálné ceně je nejtěžší část prodeje.“
- **Agent 6–14 s:** Agent připraví jednostránkový přehled: podobné byty v lokalitě, jejich ceny, jak dlouho visí a kolik zlevnily. Makléř ho pošle majiteli jedním klepnutím.
- **Výsledek 14–17 s:** „Data místo dohadování.“
- **Popisek:** Nejlepší argument je ten, který nemusíte vymýšlet. Napište AGENT.

### Cenový hlídač C: „Příležitost pro kupce“ (18 s)
- **Hook 0–3 s:** Radar přes mapu Brna, jeden pin zezelená. „Tenhle byt právě zlevnil pod tržní cenu.“
- **Problém 3–6 s:** „Takové příležitosti zmizí do 48 hodin.“
- **Agent 6–14 s:** Agent porovná nové ceny s průměrem lokality a pošle makléři (nebo investorovi) okamžitou notifikaci se seznamem kupců z CRM, pro které by byt byl vhodný.
- **Výsledek 14–18 s:** „Zavoláte kupci dřív, než to uvidí ostatní.“
- **Popisek:** Rychlost je v realitách všechno. Napište AGENT.

---

## Pořadí výroby (doporučení)
1. Follow Up D (3 mil. Kč, se souhlasem klienta), Inquiry A, Chat Agent A: skutečný výsledek + nejsilnější bolesti.
2. Voice A, Chief of Staff A, Fakturační A, Reporting A: peníze a čísla.
3. Zbytek po týdnech, vždy 1 varianta na agenta, ať se vizuál neopakuje.
