# POA & Affidavit Resource Desk

Static educational microsite for the iRemoteNotary FeedWalls **Power of Attorney & Affidavit Resources** pilot.

Working folder:

`C:\Users\frank\Desktop\power-of-attorney-affidavit-resources`

This property is published and operated by iRemoteNotary. It is not a government website, law firm, or recipient organization. The main website remains [https://www.iremotenotary.com](https://www.iremotenotary.com).

## Purpose

Help visitors understand powers of attorney, affidavits, acknowledgments, jurats, oaths, affirmations, and overseas-execution considerations, then use a mixed public-plus-iRemoteNotary resource list before confirming requirements or booking an eligible online-notary session.

## Temporary production origin

Canonical, Open Graph, Twitter, JSON-LD, `robots.txt`, and `sitemap.xml` currently use this placeholder:

`https://TEMP-POA-AFFIDAVIT-PILOT-ORIGIN.invalid`

**Do not deploy while this placeholder remains.**

Before the first public deploy:

1. Choose a hosting platform and final production origin.
2. Replace every occurrence of the temporary origin.
3. Re-validate canonicals, Open Graph/Twitter URLs, JSON-LD, `robots.txt`, and `sitemap.xml`.
4. Only then connect hosting and deploy.

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

`privacy.html`, `contact.html`, and `404.html` are `noindex,follow` and are omitted from `sitemap.xml`.

## Local preview

From this folder, using an already-installed runtime and no package install:

```bash
node preview-server.mjs
```

`preview-server.mjs` (and optional `preview-server.py`) are local tooling only. They serve branded `404.html` for unknown paths and block README, Git, env, and similar sensitive paths. Do not upload README, `.git`, environment files, editor files, backup files, preview servers, or source maps when a host is selected later.

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

## Future hosting protections

When a host is chosen, configure at least:

- custom `404.html` for unknown paths
- block public access to `.git`, `.env*`, README, editor folders, backups, and source maps
- HTTPS redirects
- sensible cache headers for static assets
- tested Content-Security-Policy only after FeedWalls embed behavior is verified on that host

Do not add provider-specific config files until the platform is selected.

## Content safeguards

- Educational information only; not legal advice.
- A notary verifies identity and performs the requested notarial act; the notary does not draft documents, choose a POA type, interpret agent authority, or determine legal sufficiency.
- Witness, certificate, electronic-signature, recording, and recipient-acceptance requirements vary.
- Some declarations under penalty of perjury may not require notarization.
- Users should confirm requirements with the receiving organization or a qualified attorney.

