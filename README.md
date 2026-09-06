# POA & Affidavit Resource Desk

Static educational microsite for the iRemoteNotary FeedWalls **Power of Attorney & Affidavit Resources** pilot.

Working folder:

`C:\Users\frank\Desktop\power-of-attorney-affidavit-resources`

This property is published and operated by iRemoteNotary. It is not a government website, law firm, or recipient organization. The main website remains [https://www.iremotenotary.com](https://www.iremotenotary.com).

## Purpose

Help visitors understand powers of attorney, affidavits, acknowledgments, jurats, oaths, affirmations, and overseas-execution considerations, then use a mixed public-plus-iRemoteNotary resource list before confirming requirements or booking an eligible online-notary session.

## Production origin

Intended Render production origin:

`https://power-of-attorney-affidavit-resources.onrender.com`

Canonical, Open Graph, Twitter, JSON-LD, `robots.txt`, and `sitemap.xml` use that origin.

Canonical page URLs:

- `https://power-of-attorney-affidavit-resources.onrender.com/`
- `https://power-of-attorney-affidavit-resources.onrender.com/privacy.html`
- `https://power-of-attorney-affidavit-resources.onrender.com/contact.html`

## Render static deployment

This repository is prepared for a Render static site that publishes **only** the allowlisted `dist` directory.

- Blueprint: `render.yaml`
- Build command: `node build-render.mjs`
- Publish path: `./dist`
- Auto-deploy: commits to `main`
- Plan: free static site
- No environment variables, secrets, or custom domain in the blueprint

`build-render.mjs` recreates `dist` and copies only:

`index.html`, `privacy.html`, `contact.html`, `404.html`, `styles.css`, `site.js`, `favicon.svg`, `og-image.png`, `robots.txt`, `sitemap.xml`

These repository files must not become public deployment artifacts:

`README.md`, `.gitignore`, `render.yaml`, `build-render.mjs`, `preview-server.mjs`, `preview-server.py`, `.git/*`, `.env*`, source maps, and backups.

Security headers are declared in `render.yaml` (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY`, and HSTS). No Content-Security-Policy is set yet because it has not been proven against the FeedWalls iframe on this host.

Connecting the GitHub repository to Render and triggering the first deploy are separate steps outside this local finalize/push workflow.

## FeedWalls

This site only consumes an existing widget. Do not change FeedWalls from this folder.

- Topic: Power of Attorney & Affidavit Resources
- Group ID: `95969468`
- Feed ID: `633`
- Custom feed: `30`
- Widget ID: `177`
- Widget type: Titles with Description
- Skin: Card
- Display items: `15`
- Accent: `#2563EB`
- Dark: Auto
- Radius: `8`
- Compact: `0`
- Expected mix: 5 authority resources + 10 iRemoteNotary resources
- Expected uniqueness: 15 unique destination URLs

Exact embed:

```
https://feedwalls.online/app/titles_description.php?groupID=95969468&displayItems=15&skin=card&accent=%232563EB&dark=auto&radius=8&compact=0
```

Do not change this URL or raise `displayItems`.

Height-message listener accepts `feedwalls:height` only when:

- `event.origin === "https://feedwalls.online"`
- `event.source === iframe.contentWindow`
- `h` is a finite number
- height is clamped between 360 and 5000 pixels

The iframe starts at 400px and uses `referrerpolicy="strict-origin-when-cross-origin"`.

## Files

- `index.html`
- `privacy.html`
- `contact.html`
- `404.html`
- `styles.css`
- `site.js`
- `favicon.svg`
- `og-image.png`
- `robots.txt`
- `sitemap.xml`
- `.gitignore`
- `README.md`
- `build-render.mjs`
- `render.yaml`
- `preview-server.mjs`
- `preview-server.py`

`privacy.html`, `contact.html`, and `404.html` are `noindex,follow` and are omitted from `sitemap.xml`. `/dist/` is gitignored build output.

## Local preview

From this folder, using an already-installed runtime and no package install:

```bash
node preview-server.mjs
```

To validate the allowlisted publish output:

```bash
node build-render.mjs
node preview-server.mjs
```

Point a second local check at `dist` (for example by temporarily serving that folder) and confirm only the ten public files are present. Preview helpers remain in the repository but must not enter `dist`.

Then open:

- http://127.0.0.1:4190/
- http://127.0.0.1:4190/index.html
- http://127.0.0.1:4190/privacy.html
- http://127.0.0.1:4190/contact.html
- http://127.0.0.1:4190/404.html
- http://127.0.0.1:4190/styles.css
- http://127.0.0.1:4190/site.js
- http://127.0.0.1:4190/favicon.svg
- http://127.0.0.1:4190/og-image.png
- http://127.0.0.1:4190/robots.txt
- http://127.0.0.1:4190/sitemap.xml

## Hosting notes

Render Blueprint headers already cover the baseline security headers. After the first live deploy, confirm branded 404 behavior for unknown paths on the Render host, then decide whether a tested Content-Security-Policy can be added without breaking FeedWalls.

## Content safeguards

- Educational information only; not legal advice.
- A notary verifies identity and performs the requested notarial act; the notary does not draft documents, choose a POA type, interpret agent authority, or determine legal sufficiency.
- Witness, certificate, electronic-signature, recording, and recipient-acceptance requirements vary.
- Some declarations under penalty of perjury may not require notarization.
- Users should confirm requirements with the receiving organization or a qualified attorney.

