// Aktivace klientského účtu: odešle notifikaci na Nexivo a u platby fakturou
// založí ve Fakturoidu odběratele, vystaví první fakturu a nastaví měsíční opakování.

const PRICES = {
  1: { total: 1790, label: "Balíček 1 agenta" },
  2: { total: 3490, label: "Balíček 2 agentů" },
  3: { total: 4990, label: "Balíček 3 agentů" },
  4: { total: 6690, label: "Balíček 4 agentů" },
  5: { total: 8290, label: "Balíček 5 agentů" }
};

const TYP_LABEL = { osvc: "OSVČ", majitel: "Majitel firmy", osobni: "Osobní použití" };

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "roman@nexivoai.cz";
const MAIL_FROM = process.env.MAIL_FROM || "Nexivo <aktivace@nexivoai.cz>";
const USER_AGENT = process.env.FAKTUROID_USER_AGENT || "Nexivo Web (roman@nexivoai.cz)";
const VAT_RATE = process.env.FAKTUROID_VAT_RATE ?? "21";
const DUE_DAYS = Number(process.env.FAKTUROID_DUE_DAYS || 14);

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

  const price = PRICES[data.pocet_agentu];
  const result = { ok: true, platba: data.platba };

  try {
    if (data.platba === "faktura") {
      const invoice = await createInvoice(data, price);
      result.faktura = {
        cislo: invoice.number,
        url: invoice.public_html_url,
        splatnost: invoice.due_on,
        odeslana_klientovi: invoice.emailed
      };
    }
  } catch (err) {
    // Fakturace selhala, ale poptávku nesmíme ztratit — pošleme ji mailem i tak.
    result.ok = false;
    result.faktura_chyba = String(err.message || err);
  }

  try {
    await notifyOwner(data, price, result);
  } catch (err) {
    if (result.ok) {
      return res.status(502).json({ error: "Nepodařilo se odeslat údaje.", detail: String(err.message || err) });
    }
  }

  if (!result.ok) {
    return res.status(502).json({
      error: "Údaje jsme přijali, ale fakturu se nepodařilo vystavit. Ozveme se vám.",
      detail: result.faktura_chyba
    });
  }

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
  if (!PRICES[d.pocet_agentu]) bad.push("pocet_agentu");
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

async function createInvoice(d, price) {
  const subject = await findOrCreateSubject(d);

  const invoice = await fakturoid("/invoices.json", {
    method: "POST",
    body: JSON.stringify({
      subject_id: subject.id,
      due: DUE_DAYS,
      payment_method: "bank",
      currency: "CZK",
      language: "cz",
      vat_price_mode: "from_total_with_vat",
      custom_id: `nexivo-aktivace-${d.ico}-${d.pocet_agentu}`,
      note: `Aktivace účtu Nexivo — ${TYP_LABEL[d.typ]}. Kontakt: ${d.jmeno} ${d.prijmeni}, ${d.email}, ${d.telefon}.`,
      tags: ["aktivace", "nexivo-ai"],
      lines: [{
        name: `${price.label} — měsíční předplatné`,
        quantity: "1",
        unit_name: "měsíc",
        unit_price: String(price.total),
        vat_rate: VAT_RATE
      }]
    })
  });

  let emailed = false;
  try {
    await fakturoid(`/invoices/${invoice.id}/message.json`, {
      method: "POST",
      body: JSON.stringify({ email: d.email, deliver_now: true })
    });
    emailed = true;
  } catch (err) {
    // Odesílání z Fakturoidu je jen na placeném tarifu — fallback pošleme sami.
    if (err.status !== 403) throw err;
    await sendInvoiceEmail(d, price, invoice);
    emailed = true;
  }

  await createRecurring(d, price, subject.id).catch(() => {});

  return { ...invoice, emailed };
}

async function createRecurring(d, price, subjectId) {
  const start = new Date();
  start.setMonth(start.getMonth() + 1);

  return fakturoid("/recurring_generators.json", {
    method: "POST",
    body: JSON.stringify({
      name: `Nexivo — ${price.label} — ${d.firma}`,
      subject_id: subjectId,
      start_date: start.toISOString().slice(0, 10),
      months_period: 1,
      due: DUE_DAYS,
      send_email: true,
      payment_method: "bank",
      currency: "CZK",
      language: "cz",
      vat_price_mode: "from_total_with_vat",
      lines: [{
        name: `${price.label} — měsíční předplatné`,
        quantity: "1",
        unit_name: "měsíc",
        unit_price: String(price.total),
        vat_rate: VAT_RATE
      }]
    })
  });
}

// ── Resend ───────────────────────────────────────────────────────────────────

async function sendEmail({ to, subject, html, replyTo }) {
  const key = requireEnv("RESEND_API_KEY");
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

async function sendInvoiceEmail(d, price, invoice) {
  return sendEmail({
    to: d.email,
    replyTo: NOTIFY_EMAIL,
    subject: `Faktura ${invoice.number} — Nexivo`,
    html: `
      <p>Dobrý den, ${esc(d.jmeno)},</p>
      <p>děkujeme za aktivaci účtu Nexivo. V příloze odkazu najdete fakturu
         <strong>${esc(invoice.number)}</strong> na ${esc(price.label.toLowerCase())}
         (${price.total.toLocaleString("cs-CZ")} Kč / měsíc), splatnou ${esc(invoice.due_on || "")}.</p>
      <p><a href="${esc(invoice.public_html_url)}">Zobrazit a zaplatit fakturu</a></p>
      <p>Jakmile platbu zaevidujeme, ozveme se s dalšími kroky k nastavení agentů.</p>
      <p>Roman Richter<br>Nexivo — ${esc(NOTIFY_EMAIL)}</p>
    `
  });
}

async function notifyOwner(d, price, result) {
  const rows = [
    ["Jméno", `${d.jmeno} ${d.prijmeni}`],
    ["E-mail", d.email],
    ["Telefon", d.telefon],
    ["Firma", d.firma],
    ["IČO", d.ico],
    ["Adresa", `${d.ulice}, ${d.psc} ${d.mesto}`],
    ["Typ", TYP_LABEL[d.typ]],
    ["Počet agentů", `${d.pocet_agentu} — ${price.label}`],
    ["Cena", `${price.total.toLocaleString("cs-CZ")} Kč / měsíc`],
    ["Platba", d.platba === "faktura" ? "Faktura" : "Kartou online (Stripe)"]
  ];

  if (result.faktura) {
    rows.push(["Faktura", `${result.faktura.cislo} — ${result.faktura.url}`]);
    rows.push(["Splatnost", result.faktura.splatnost || "—"]);
  }
  if (result.faktura_chyba) {
    rows.push(["CHYBA FAKTURACE", result.faktura_chyba]);
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
