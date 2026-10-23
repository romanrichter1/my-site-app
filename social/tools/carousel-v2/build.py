import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from common import *
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'carousels')
HOUSE = '<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/></svg>'
CLOCK = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
CAL = '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4"/></svg>'
LOOP = '<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg>'
EYE = '<svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'
SHIELD = '<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>'
def row(t, a, b):
    m = lambda v: f'<span class="{"yes" if v else "no"}">{CHECK if v else CROSS}</span>'
    return f'<div class="row"><span>{t}</span><span>{m(a)}</span><span>{m(b)}</span></div>'

# ---------- A: poptávkový agent ----------
A = [
slide(1, f'''  <div class="h1 disp">Tohle ChatGPT<br><em>neudělá.</em></div>
  <div class="notif"><div class="top"><span class="app">n.</span>AI agent<time>22:41</time></div>
    <b>Nová poptávka vyřízena</b><p>Odpověděl jsem paní Novákové a zapsal ji na úterý 10:00 do kalendáře.</p></div>
  <div class="lead">Zatímco jste spali. Bez kopírování, bez vás.</div>''', dark=True, glow=True, swipe=True),
slide(2, f'''  <div class="h2 disp">Za minutu<br><em>budete vědět:</em></div>
  <div class="gain">
    <div><span>1</span>proč vám ChatGPT neušetří ani hodinu</div>
    <div><span>2</span>kolik zakázek stojí pomalá odpověď</div>
    <div><span>3</span>co udělá agent, když jste offline</div>
  </div>''', swipe=True),
slide(3, f'''  <div class="h2 disp">Přijde poptávka.<br><em>S ChatGPT:</em></div>
  <div class="steps">
    <div class="step"><b>1</b>Zkopírujete e-mail do ChatGPT</div>
    <div class="step"><b>2</b>Necháte napsat odpověď</div>
    <div class="step"><b>3</b>Zkopírujete ji zpět a odešlete</div>
    <div class="step"><b>4</b>Ručně zapíšete termín</div>
    <div class="step"><b>5</b>Za týden zapomenete připomenout</div>
  </div>
  <div class="card"><small>Výsledek</small><p>Napsal text. Práci jste udělali vy.</p></div>'''),
slide(4, f'''  <div class="h2 disp">A mezitím<br><em>čas běží.</em></div>
  <div class="big disp">42<span> h</span></div>
  <div class="lead">Tak dlouho průměrně trvá firmám odpovědět na poptávku z webu. <b class="k">23 %</b> neodpoví vůbec.</div>
  <div class="src">Zdroj: Harvard Business Review, The Short Life of Online Sales Leads (2011)</div>''', glow=True),
slide(5, f'''  <div class="h2 disp">Přitom stačí<br><em>odpovědět do hodiny.</em></div>
  <div class="big disp">7<span>×</span></div>
  <div class="lead">vyšší šance na skutečný rozhovor s klientem než při pozdější odpovědi.</div>
  <div class="src">Zdroj: Harvard Business Review, The Short Life of Online Sales Leads (2011)</div>'''),
slide(6, f'''  <div class="h2 disp">Rozdíl je<br><em>v jednom slově.</em></div>
  <div class="cmp">
    <div class="row hd"><span></span><span>ChatGPT</span><span>Agent</span></div>
    {row("Sám hlídá e-mail a web", 0, 1)}
    {row("Odpoví klientovi", 0, 1)}
    {row("Zapíše termín", 0, 1)}
    {row("Sám se připomene", 0, 1)}
  </div>
  <div class="lead">ChatGPT radí. Agent <b class="k">jedná.</b></div>'''),
slide(7, f'''  <span class="idx">1</span>
  <div class="h2 disp">Pozoruje<br><em>a rozhoduje.</em></div>
  <div class="lead">Sám vidí každou novou poptávku a pozná, co klient chce: termín, cenu, nebo jen informaci.</div>
  <div class="ex">{EYE}<p>Neděle <b>22:40</b>: „Máte v úterý volno na barvení?“ Agent ví, že jde o rezervaci.</p></div>'''),
slide(8, f'''  <div class="h2 disp">A pak<br><em>to udělá.</em></div>
  <div class="tl">
    <div><i></i><span><time>22:40</time><p>Přijde poptávka z webu</p></span></div>
    <div><i></i><span><time>22:41</time><p>Agent odpoví a nabídne dva volné termíny</p></span></div>
    <div><i></i><span><time>22:47</time><p>Klientka vybere úterý 10:00, agent ho zapíše</p></span></div>
    <div><i></i><span><time>pondělí 18:00</time><p>Agent jí pošle připomínku</p></span></div>
  </div>
  <div class="tag">Ilustrativní ukázka</div>''', dark=True, glow=True),
slide(9, f'''  <div class="quote disp">ChatGPT<br>poradí.<br><em class="mark">Agent to<br>udělá.</em><small>Naučíte ho všechno jednou. On to už nezapomene.</small></div>''', glow=True),
cta(10, 'Ukázka agenta', 'Poptávkový agent', ['Odpoví do 5 minut, i v noci', 'Nabídne volný termín', 'Zapíše ho do kalendáře']),
]

# ---------- B: Google Review Agent ----------
B = [
slide(1, f'''  <div class="h1 disp">Vaši spokojení<br>klienti vám<br><em>tiše škodí.</em></div>
  <div class="notif"><div class="top"><span class="app g">G</span>Nová recenze na Googlu<time>teď</time></div>
    <b>{stars(1)}&nbsp; „Nikdo to nezvedá.“</b><p>Hodnocení firmy kleslo na 3,9.</p></div>
  <div class="lead">Nespokojený napíše hned. Spokojený skoro nikdy.</div>''', dark=True, glow=True, swipe=True),
slide(2, f'''  <div class="h2 disp">Za minutu<br><em>budete vědět:</em></div>
  <div class="gain">
    <div><span>1</span>proč máte méně recenzí, než si zasloužíte</div>
    <div><span>2</span>kolik zákazníků vás kvůli tomu nenajde</div>
    <div><span>3</span>jak to otočit, aniž byste o recenze prosili</div>
  </div>''', swipe=True),
slide(3, f'''  <div class="h2 disp">Recenze na Googlu<br><em>jsou nová výloha.</em></div>
  <div class="big disp">83<span>%</span></div>
  <div class="lead">lidí hledá recenze místních firem právě <b class="k">na Googlu</b>. Dřív, než vám zavolají.</div>
  <div class="src">Zdroj: BrightLocal, Local Consumer Review Survey 2025</div>''', glow=True),
slide(4, f'''  <div class="h2 disp">Kam byste<br><em>zavolali vy?</em></div>
  <div style="margin-top:60px">
    <div class="gcard lose"><span class="pic">{HOUSE}</span><div><h4>Salon A</h4><div class="r"><b>4,1</b>{stars(4)}(12)</div></div></div>
    <div class="gcard win"><span class="pic">{HOUSE}</span><div><h4>Salon B</h4><div class="r"><b>4,8</b>{stars(5)}(147)</div></div></div>
  </div>
  <div class="lead">Stejná ulice, stejné ceny. Rozhodnou hvězdičky.</div>
  <div class="tag">Ilustrativní ukázka</div>'''),
slide(5, f'''  <div class="h2 disp">Proč recenze<br><em>nepřibývají?</em></div>
  <div class="steps">
    <div class="step"><b>1</b>Klient odchází spokojený</div>
    <div class="step"><b>2</b>„Napíšu vám recenzi,“ slíbí</div>
    <div class="step"><b>3</b>Doma na to zapomene</div>
    <div class="step"><b>4</b>Nikdo mu to nepřipomene</div>
  </div>
  <div class="card"><small>Výsledek</small><p>Ozve se jen ten, kdo byl nespokojený.</p></div>'''),
slide(6, f'''  <div class="h2 disp">Problém není<br><em>v kvalitě.</em></div>
  <div class="lead">Je v načasování. Nejochotnější je klient <b class="k">den po návštěvě</b>, dokud má zážitek v hlavě. Za týden už se mu nechce.</div>
  <div class="ex">{CLOCK}<p>Kdo se zeptá <b>druhý den</b>, dostane recenzi. Kdo se nezeptá, nedostane nic.</p></div>'''),
slide(7, f'''  <div class="h2 disp">Pozor na<br><em>pravidla Googlu.</em></div>
  <div class="lead">Ptát se jen spokojených klientů Google zakazuje. Takové recenze může smazat.</div>
  <div class="ex">{SHIELD}<p>Proto se agent zeptá <b>každého</b> klienta. Férově a podle pravidel.</p></div>'''),
slide(8, f'''  <div class="h2 disp">Agent se zeptá<br><em>za vás.</em></div>
  <div class="mail">
    <div class="hd"><small>Den po návštěvě · e-mail</small><b>9:00</b></div>
    <div class="bd">Dobrý den, paní Novotná, děkujeme za včerejší návštěvu. Pokud jste byla spokojená, moc by nám pomohlo krátké hodnocení na Googlu. Zabere 30 vteřin.
      <div><span class="btn">Napsat recenzi <span class="stars"><svg class="on" viewBox="0 0 24 24"><use href="#st"/></svg></span></span></div></div>
  </div>''', dark=True, glow=True),
slide(9, f'''  <div class="h2 disp">Recenze<br><em>přicházejí samy.</em></div>
  <div class="flow">
    <div><b>1</b><p>Návštěva skončí<span>agent to vidí v rezervacích</span></p></div>
    <div><b>2</b><p>Druhý den odejde e-mail<span>s přímým odkazem na recenzi</span></p></div>
    <div><b>3</b><p>Bez reakce? Jedna slušná připomínka<span>a dál už neotravuje</span></p></div>
  </div>''', dark=True),
cta(10, 'Ukázka agenta', 'Google Review Agent', ['Zeptá se každého klienta', 'Den po návštěvě, automaticky', 'Podle pravidel Googlu']),
]

# ---------- C: kalkulační agent ----------
C = [
slide(1, f'''  <div class="h1 disp" style="font-size:134px">Zakázka za<br>468 000 Kč.<br><em>Prohraná o 3 dny.</em></div>
  <div class="notif"><div class="top"><span class="app m"><svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></span>E-mail · Jan Dvořák<time>pá 9:12</time></div>
    <b>Re: Nabídka zateplení</b><p>Děkuji, ale už jsme podepsali s firmou, která poslala nabídku ještě ten večer.</p></div>
  <div class="lead">Nevyhrál levnější. Vyhrál rychlejší.</div>''', dark=True, glow=True, swipe=True),
slide(2, f'''  <span class="pill"><i></i>Pro stavební firmy</span>
  <div class="h2 disp">Za minutu<br><em>budete vědět:</em></div>
  <div class="gain">
    <div><span>1</span>kam mizí 3 dny nad každou nabídkou</div>
    <div><span>2</span>proč zakázky bere ten nejrychlejší</div>
    <div><span>3</span>jak poslat nabídku do 5 minut</div>
  </div>''', swipe=True),
slide(3, f'''  <div class="h2 disp">Průměrná firma<br><em>odpoví za</em></div>
  <div class="big disp">42<span> h</span></div>
  <div class="lead">A <b class="k">23 % firem</b> neodpoví vůbec. Klient mezitím obvolá další tři.</div>
  <div class="src">Zdroj: Harvard Business Review, The Short Life of Online Sales Leads (2011)</div>''', glow=True),
slide(4, f'''  <div class="h2 disp">Jak to vypadá<br><em>dnes:</em></div>
  <div class="steps">
    <div class="step"><b>Po</b>Přijde poptávka z webu</div>
    <div class="step"><b>Út</b>Čeká, až se k ní dostanete</div>
    <div class="step"><b>St</b>Hledáte starou nabídku</div>
    <div class="step"><b>Čt</b>Ověřujete ceny materiálu</div>
    <div class="step"><b>Pá</b>Konečně odešlete nabídku</div>
  </div>
  <div class="card"><small>Výsledek</small><p>Klient už ve středu podepsal jinde.</p></div>'''),
slide(5, f'''  <div class="h2 disp">Přitom všechno<br><em>už máte.</em></div>
  <div class="lead">Ceník práce, minulé nabídky, dodavatele materiálu. Jen to trvá dny dát dohromady.</div>
  <div class="ex">{LOOP}<p>Každá nová nabídka je <b>skoro stejná</b> jako ta loňská. Počítá se pořád znovu.</p></div>'''),
slide(6, f'''  <div class="h3 disp">Kalkulační agent<br><em>počítá jako vy.</em></div>
  <div class="mail"><div class="hd"><small>Nová poptávka · web</small><b>21:47</b></div>
    <div class="bd" style="font-weight:600">Rodinný dům, Brno-Líšeň. Zateplení fasády, cca 180 m², polystyren 16 cm. Realizace na jaře.</div></div>
  <div class="lbl">Bere v úvahu</div>
  <div class="chips"><span><i></i>Vaše minulé nabídky</span><span><i></i>Váš ceník práce</span><span><i></i>Aktuální ceny materiálu</span><span><i></i>Volné kapacity part</span></div>'''),
slide(7, f'''  <div class="h2 disp">A vy máte<br><em>kontrolu.</em></div>
  <div class="lead">Nabídku před odesláním schválíte jedním klepnutím v telefonu. Nebo ji upravíte.</div>
  <div class="ex">{SHIELD}<p>Klient dostane <b>orientační cenu</b>. Přesnou až po obhlídce. Žádné závazky naslepo.</p></div>'''),
slide(8, f'''  <span class="timer"><svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/></svg>Odesláno za 4 minuty</span>
  <div class="mail"><div class="hd"><small>Orientační cenová nabídka</small><b>21:51</b></div>
    <div class="bd">
      <div class="kv"><span>Materiál (EPS 160 mm, lepidlo, síťka, omítka)</span><b>196 000 Kč</b></div>
      <div class="kv"><span>Práce, 180 m²</span><b>214 000 Kč</b></div>
      <div class="kv"><span>Lešení a doprava</span><b>58 000 Kč</b></div>
      <div class="kv sum"><span>Celkem bez DPH</span><b>468 000 Kč</b></div>
      <div class="note">Přesná cena po obhlídce na místě.</div></div></div>
  <div class="tag">Ilustrativní ukázka</div>''', dark=True, glow=True),
slide(9, f'''  <div class="h2 disp">A rovnou<br><em>domluví obhlídku.</em></div>
  <div class="bubble agent">Rád bych vám to ukázal přímo na domě. Hodí se čtvrtek v 16:00, nebo sobota v 9:00?</div>
  <div class="who r">Kalkulační agent</div>
  <div class="bubble client">Čtvrtek v 16:00 je ideální.</div>
  <div class="who">Klient</div>
  <div class="done"><span>{CHECK}</span>Obhlídka v kalendáři · čt 16:00</div>''', dark=True),
cta(10, 'Ukázka agenta', 'Kalkulační agent', ['Nabídka do 5 minut', 'Počítá podle vašich cen', 'Rovnou domluví obhlídku']),
]

for name, slides in [('poptavkovy-agent-v2', A), ('google-review-agent-v2', B), ('kalkulacni-agent-v2', C)]:
    d = f'{ROOT}/{name}'; os.makedirs(d, exist_ok=True)
    open(f'{d}/index.html', 'w').write(page(slides))
print('built')
