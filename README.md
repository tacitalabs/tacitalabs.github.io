# Tacita Labs public site deployment repo

This repository is a **public deployment target** for the Tacita Labs website.

## Hard rules

- Public repo - assume everything pushed here is world-readable.
- Site output only - HTML, CSS, JS, images, favicon, CNAME, and other safe public web assets.
- Do **not** put source code for private projects here.
- Do **not** put internal notes, planning docs, drafts, or operational details here.
- Do **not** put credentials, tokens, keys, exports, backups, databases, or anything confidential here.
- Do **not** use this repo as general storage just because it already exists.

## Intended contents

Allowed content should stay narrow:

- `index.html`
- `styles.css`
- `assets/` public images and static site assets
- `CNAME`
- small public-facing support files like `robots.txt`, `sitemap.xml`, and favicon assets

## Publishing posture

Treat this repo like a sterile release surface, not a working project repo.

If something would be embarrassing, sensitive, or useful to an attacker, it does **not** belong here.

## Domain

Primary public domain:

- `https://www.tacitalabs.com`

GitHub Pages repo:

- `https://github.com/tacitalabs/tacitalabs.github.io`
