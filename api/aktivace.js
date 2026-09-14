// Aktivace klientského účtu: odešle notifikaci na Nexivo a u platby fakturou
// založí ve Fakturoidu odběratele a vystaví jednorázovou aktivační fakturu.

const PRODUCT_NAME = "Konzultační a implementační služby v oblasti automatizace procesů";
const UNIT_PRICE = 19900;
const MAX_AGENTS = 5;

// Množstevní sleva z aktivačního poplatku: 20 % u dvou agentů, 40 % od tří výš.
function discountRate(count) {
  if (count >= 3) return 0.4;
  if (count === 2) return 0.2;
  return 0;
}

function agentWord(count) {
  return count === 1 ? "agenta" : "agentů";
}

function priceFor(count) {
  const subtotal = UNIT_PRICE * count;
  const rate = discountRate(count);
  const discount = Math.round(subtotal * rate);
  return {
    count,
    unitPrice: UNIT_PRICE,
    subtotal,
    rate,
    discount,
    total: subtotal - discount,
    label: `Aktivace ${count} ${agentWord(count)}`
  };
}

// Kód "nexivoNN" u platby fakturou vystaví jen zálohu NN % z konečné (už slevněné) ceny.
const DEPOSIT_CODE_RE = /^nexivo(\d{1,2})$/i;

function parseDepositCode(kod) {
  const match = DEPOSIT_CODE_RE.exec(String(kod || "").trim());
  if (!match) return null;
  const pct = Number(match[1]);
  if (pct <= 0 || pct >= 100) return null;
  return pct;
}

function depositFor(price, pct) {
  return { pct, amount: Math.round((price.total * pct) / 100) };
}

const TYP_LABEL = { osvc: "OSVČ", majitel: "Majitel firmy", osobni: "Osobní použití" };

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "roman@nexivoai.cz";
const MAIL_FROM = process.env.MAIL_FROM || "Nexivo <aktivace@nexivoai.cz>";
const USER_AGENT = process.env.FAKTUROID_USER_AGENT || "Nexivo Web (roman@nexivoai.cz)";
const VAT_RATE = process.env.FAKTUROID_VAT_RATE ?? "21";
// Splatnost 0 = faktura je splatná v den vystavení; klient ji rovnou zaplatí přes odkaz.
const DUE_DAYS = Number(process.env.FAKTUROID_DUE_DAYS ?? 0);

const ALLOWED_ORIGINS = [
  "https://nexivoai.cz",
  "https://www.nexivoai.cz",
  "https://my-site-app.vercel.app"
];

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.includes(origin) && !origin.endsWith(".vercel.app")) {
    return res.status(403).json({ error: "Forbidden origin" });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body;
  if (!body) return res.status(400).json({ error: "Neplatný požadavek." });

  // honeypot — roboti vyplní skryté pole, lidé ne
  if (body.website) return res.status(200).json({ ok: true });

  const data = normalize(body);
  const problems = validate(data);
  if (problems.length) {
    return res.status(400).json({ error: "Neplatné údaje.", fields: problems });
  }

  const price = priceFor(data.pocet_agentu);
  const depositPct = data.platba === "faktura" ? parseDepositCode(data.kod) : null;
  const deposit = depositPct ? depositFor(price, depositPct) : null;
  const result = { ok: true, platba: data.platba };

  try {
    // Odběratele zakládáme vždy, i u platby kartou — jinak by se kontakt nikde neuložil.
    const subject = await findOrCreateSubject(data);
    result.odberatel_id = subject.id;

    if (data.platba === "faktura") {
      const invoice = await createInvoice(data, price, subject, deposit);
      result.faktura = {
        cislo: invoice.number,
        url: invoice.public_html_url,
        splatnost: invoice.due_on,
        odeslana_klientovi: invoice.emailed
      };
    }
  } catch (err) {
    return res.status(502).json({
      error: data.platba === "faktura"
        ? "Údaje se nepodařilo uložit a fakturu vystavit. Zkuste to prosím znovu."
        : "Údaje se nepodařilo uložit. Zkuste to prosím znovu.",
      detail: String(err.message || err)
    });
  }

  // Notifikace je bonus navíc — když není Resend nastavený nebo selže,
  // data už bezpečně leží ve Fakturoidu, takže požadavek nezhazujeme.
  await notifyOwner(data, price, result, deposit).catch((err) => {
    result.notifikace_chyba = String(err.message || err);
  });

  return res.status(200).json(result);
};

function safeParse(s) {
  try { return JSON.parse(s); } catch { return null; }
}

function normalize(b) {
  const str = (v) => String(v == null ? "" : v).trim();
  return {
    jmeno: str(b.jmeno),
    prijmeni: str(b.prijmeni),
    email: str(b.email).toLowerCase(),
    telefon: str(b.telefon),
    ico: str(b.ico).replace(/\s/g, ""),
    firma: str(b.firma),
    ulice: str(b.ulice),
    mesto: str(b.mesto),
    psc: str(b.psc).replace(/\s/g, ""),
    platba: str(b.platba),
    kod: str(b.kod),
    typ: str(b.typ),
    consent: b.consent === true || b.consent === "on" || b.consent === "true",
    pocet_agentu: Number(b.pocet_agentu)
  };
}

function validate(d) {
  const bad = [];
  if (d.jmeno.length < 2) bad.push("jmeno");
  if (d.prijmeni.length < 2) bad.push("prijmeni");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) bad.push("email");
  if (d.telefon.replace(/[\s+\-()]/g, "").length < 9) bad.push("telefon");
  if (!/^\d{8}$/.test(d.ico)) bad.push("ico");
  if (d.firma.length < 2) bad.push("firma");
  if (d.ulice.length < 3) bad.push("ulice");
  if (d.mesto.length < 2) bad.push("mesto");
  if (!/^\d{5}$/.test(d.psc)) bad.push("psc");
  if (!["faktura", "karta"].includes(d.platba)) bad.push("platba");
  if (!TYP_LABEL[d.typ]) bad.push("typ");
  if (!d.consent) bad.push("consent");
  if (!Number.isInteger(d.pocet_agentu) || d.pocet_agentu < 1 || d.pocet_agentu > MAX_AGENTS) bad.push("pocet_agentu");
  return bad;
}

// ── Fakturoid ────────────────────────────────────────────────────────────────

let cachedToken = null;

async function fakturoidToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60000) return cachedToken.value;

  const id = requireEnv("FAKTUROID_CLIENT_ID");
  const secret = requireEnv("FAKTUROID_CLIENT_SECRET");
  const basic = Buffer.from(`${id}:${secret}`).toString("base64");

  const res = await fetch("https://app.fakturoid.cz/api/v3/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "User-Agent": USER_AGENT,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ grant_type: "client_credentials" })
  });
  if (!res.ok) throw new Error(`Fakturoid auth ${res.status}: ${await res.text()}`);

  const json = await res.json();
  cachedToken = { value: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
  return cachedToken.value;
}

async function fakturoid(path, options = {}) {
  const slug = requireEnv("FAKTUROID_SLUG");
  const token = await fakturoidToken();
  const res = await fetch(`https://app.fakturoid.cz/api/v3/accounts/${slug}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": USER_AGENT,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    const detail = await res.text();
    const err = new Error(`Fakturoid ${options.method || "GET"} ${path} → ${res.status}: ${detail}`);
    err.status = res.status;
    throw err;
  }
  return res.status === 204 ? null : res.json();
}

async function findOrCreateSubject(d) {
  const found = await fakturoid(`/subjects/search.json?query=${encodeURIComponent(d.ico)}`);
  const match = Array.isArray(found) && found.find((s) => String(s.registration_no || "").replace(/\s/g, "") === d.ico);
  if (match) return match;

  return fakturoid("/subjects.json", {
    method: "POST",
    body: JSON.stringify({
      name: d.firma,
      registration_no: d.ico,
      street: d.ulice,
      city: d.mesto,
      zip: d.psc,
      country: "CZ",
      email: d.email,
      phone: d.telefon,
      full_name: `${d.jmeno} ${d.prijmeni}`
    })
  });
}

async function createInvoice(d, price, subject, deposit) {
  const invoice = await fakturoid("/invoices.json", {
    method: "POST",
    body: JSON.stringify({
      subject_id: subject.id,
      due: DUE_DAYS,
      payment_method: "bank",
      currency: "CZK",
      language: "cz",
      vat_price_mode: "from_total_with_vat",
      custom_id: `nexivo-aktivace-${d.ico}-${d.pocet_agentu}${deposit ? `-zaloha${deposit.pct}` : ""}`,
      note: `Jednorázová aktivace účtu Nexivo — ${TYP_LABEL[d.typ]}. Kontakt: ${d.jmeno} ${d.prijmeni}, ${d.email}, ${d.telefon}.` +
        (deposit ? ` Záloha ${deposit.pct} % z celkové ceny ${price.total.toLocaleString("cs-CZ")} Kč.` : ""),
      tags: deposit ? ["aktivace", "nexivo-ai", "zaloha"] : ["aktivace", "nexivo-ai"],
      lines: invoiceLines(price, deposit)
    })
  });

  // Odesílání mailem umí Fakturoid jen na placeném tarifu (jinak 403). Na free tarifu
  // zkusíme Resend, a když ani ten není nastavený, klient dostane odkaz na obrazovce.
  let emailed = false;
  try {
    await fakturoid(`/invoices/${invoice.id}/message.json`, {
      method: "POST",
      body: JSON.stringify({ email: d.email, deliver_now: true })
    });
    emailed = true;
  } catch (err) {
    if (err.status !== 403) throw err;
    emailed = await sendInvoiceEmail(d, price, invoice, deposit).then(() => true).catch(() => false);
  }

  return { ...invoice, emailed };
}

// Aktivace se normálně fakturuje na dva řádky: plná cena za agenty a pod ní množstevní
// sleva. Se zálohovým kódem (nexivoNN) se místo toho vystaví jediná položka na NN %
// z konečné (už slevněné) ceny, s názvem předsazeným "Záloha za ...".
function invoiceLines(price, deposit) {
  const baseName = `${PRODUCT_NAME} — aktivace ${price.count} ${agentWord(price.count)}`;

  if (deposit) {
    return [{
      name: `Záloha za ${baseName}`,
      quantity: "1",
      unit_name: "",
      unit_price: String(deposit.amount),
      vat_rate: VAT_RATE
    }];
  }

  const lines = [{
    name: baseName,
    quantity: String(price.count),
    unit_name: "agent",
    unit_price: String(price.unitPrice),
    vat_rate: VAT_RATE
  }];

  if (price.discount > 0) {
    lines.push({
      name: `Množstevní sleva ${Math.round(price.rate * 100)} % při aktivaci ${price.count} ${agentWord(price.count)}`,
      quantity: "1",
      unit_name: "",
      unit_price: String(-price.discount),
      vat_rate: VAT_RATE
    });
  }

  return lines;
}

// ── Resend ───────────────────────────────────────────────────────────────────

async function sendEmail({ to, subject, html, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Resend není nastavený (chybí RESEND_API_KEY).");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {})
    })
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return res.json();
}

async function sendInvoiceEmail(d, price, invoice, deposit) {
  const amount = deposit ? deposit.amount : price.total;
  const popis = deposit ? `zálohovou fakturu (${deposit.pct} %)` : "jednorázovou fakturu";
  return sendEmail({
    to: d.email,
    replyTo: NOTIFY_EMAIL,
    subject: `Faktura ${invoice.number} — Nexivo`,
    html: `
      <p>Dobrý den, ${esc(d.jmeno)},</p>
      <p>děkujeme za aktivaci účtu Nexivo. V příloze odkazu najdete ${popis}
         <strong>${esc(invoice.number)}</strong> za aktivaci ${price.count} ${esc(agentWord(price.count))}
         (${amount.toLocaleString("cs-CZ")} Kč), splatnou ${esc(invoice.due_on || "")}.</p>
      <p><a href="${esc(invoice.public_html_url)}">Zobrazit a zaplatit fakturu</a></p>
      <p>Jakmile platbu zaevidujeme, ozveme se s dalšími kroky k nastavení agentů.</p>
      <p>Roman Richter<br>Nexivo — ${esc(NOTIFY_EMAIL)}</p>
    `
  });
}

async function notifyOwner(d, price, result, deposit) {
  const rows = [
    ["Jméno", `${d.jmeno} ${d.prijmeni}`],
    ["E-mail", d.email],
    ["Telefon", d.telefon],
    ["Firma", d.firma],
    ["IČO", d.ico],
    ["Adresa", `${d.ulice}, ${d.psc} ${d.mesto}`],
    ["Typ", TYP_LABEL[d.typ]],
    ["Počet agentů", `${d.pocet_agentu} — ${price.label}`],
    ["Cena před slevou", `${price.subtotal.toLocaleString("cs-CZ")} Kč`],
    ["Sleva", price.discount > 0 ? `${Math.round(price.rate * 100)} % — ${price.discount.toLocaleString("cs-CZ")} Kč` : "—"],
    ["Cena celkem", `${price.total.toLocaleString("cs-CZ")} Kč jednorázově`],
    ["Platba", d.platba === "faktura" ? "Faktura" : "Kartou online (Stripe)"]
  ];

  if (deposit) {
    rows.push(["Kód", d.kod]);
    rows.push(["Záloha", `${deposit.pct} % = ${deposit.amount.toLocaleString("cs-CZ")} Kč (zbytek ${(price.total - deposit.amount).toLocaleString("cs-CZ")} Kč doplatit)`]);
  }

  if (result.faktura) {
    rows.push(["Faktura", `${result.faktura.cislo} — ${result.faktura.url}`]);
    rows.push(["Splatnost", result.faktura.splatnost || "—"]);
    rows.push(["Odeslána klientovi", result.faktura.odeslana_klientovi ? "Ano" : "Ne — pošlete ji ručně"]);
  }

  const html = `
    <h2 style="font-family:system-ui">Nová aktivace účtu — Nexivo</h2>
    <table cellpadding="6" style="font-family:system-ui;border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="border:1px solid #ddd"><b>${esc(k)}</b></td><td style="border:1px solid #ddd">${esc(v)}</td></tr>`).join("")}
    </table>
  `;

  return sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: d.email,
    subject: `Nová aktivace — ${d.firma} (${d.pocet_agentu} agentů, ${d.platba})`,
    html
  });
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Chybí proměnná prostředí ${name}.`);
  return v;
}
