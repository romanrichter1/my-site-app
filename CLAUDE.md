# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a collection of standalone HTML files — no build system, no dependencies, no package manager. Each file is fully self-contained (styles and scripts inline).

## File Descriptions

| File | Purpose |
|------|---------|
| `maestro_barbershop.html` | Landing page for a Czech barbershop (Maestro Barbershop Praha). Dark luxury aesthetic, Czech language. |
| `nexivo_coldemail.html` | Cold outreach email template for nexivo (AI receptionist product). Czech language, Mailchimp-compatible table layout. |
| `nexivo_email_mailchimp_penziony.html` | Mailchimp email template targeting penziony (guesthouses). Czech language, same nexivo branding. |
| `tictactoe.html` | Standalone Tic Tac Toe game. English, minimalist design. |

## Conventions

**CSS tokens:** All pages use CSS custom properties (`--ink`, `--gold`, `--sans`, etc.) defined in `:root` for theming. Follow this pattern when adding styles.

**Email templates** (`nexivo_*.html`): Use table-based layouts for email client compatibility. Inline critical styles with `!important`. Include MSO conditionals for Outlook. Max width 620px. Responsive breakpoint at `max-width: 620px`.

**Landing pages** (`maestro_barbershop.html`): Use CSS Grid/Flexbox, CSS animations, and `IntersectionObserver` for scroll effects. No JS frameworks.

**Language:** `maestro_barbershop.html` and both nexivo files are in Czech (`lang="cs"`). Keep copy in Czech when editing those files.

## Previewing

Open any `.html` file directly in a browser — no server needed. For email templates, test rendering in an email client or tool like Litmus/Email on Acid, as web browser rendering differs from email clients.
