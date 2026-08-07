# Hiring page & Team page — design

## Context

nexivoai.cz / nexivoagency.eu (repo `my-site-app`) needed two new static marketing
pages: a hiring page and a company team page. No build system — standalone HTML,
shared `colors_and_type.css` + `nexivo_marketing.css`.

## Pages

### `/kariera` (`kariera.html`)

- Hero: short intro — company is hiring, who we are in one line.
- Two open-position cards: **Sales Representative** and **Navolávač**. Each has a
  short description (náplň práce, koho hledáme, co nabízíme) written in the site's
  editorial tone, no hard numbers (salary/commission left for Roman to add later).
  Each card has a "Mám zájem" button that scrolls to the form and preselects the
  role in the form's position `<select>`.
- Application form: Jméno, Příjmení, E-mail, Telefon, Pozice (select), CV upload
  (`<input type="file" accept=".pdf,.doc,.docx">`). Client-side validation +
  "Děkujeme" thank-you state on submit, following the exact pattern already used in
  `nexivo_inquiry.html`. **No backend** — submission is cosmetic only for now (user
  decision: wire up real delivery later).
- `<meta name="robots" content="index, follow">` — public page, should be indexed.
- Reuses nav + footer + hamburger JS unchanged from `index.html`.

### `/tym` (`tym.html`)

- Two co-founder cards:
  - **Roman Richter** — Co-Founder & Head of Sales
  - **Nicolas Richter** — Co-Founder & CTO
  - Each with a 1–2 sentence bio about their focus area.
- No photos — geometric avatar (initials or the existing `nexivo-mark.svg`) in the
  lime accent color, matching the no-rounded-corners/no-emoji editorial design
  language already established.
- `<meta name="robots" content="index, follow">`.
- Reuses nav + footer + hamburger JS unchanged from `index.html`.

## Navigation

Only `index.html`'s footer gets two new links under the "Firma" column: "Kariéra"
(`/kariera`) and "Tým" (`/tym`). Main nav (`.nav__links`) is unchanged. The two new
pages also carry the same footer (with the new links) so navigation is consistent
site-wide. `nexivo_inquiry.html` and `klient/*` have no footer today and are out of
scope.

## Out of scope

- Real form submission / email delivery for `/kariera` (explicit user decision to
  defer).
- Founder photos (explicit user decision — geometric style instead).
- Salary/commission specifics, remote/office details (Roman to fill in later).
