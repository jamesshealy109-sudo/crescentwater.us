# Crescent Water Landscaping

A standalone rebuild of crescentwater.us that keeps the original artwork, logo, fonts, and black/green/blue identity. Desktop navigation and layout have been cleaned up; mobile retains the full portrait hero and prominent call/quote actions.

## Run locally

Node.js 22 or newer. No package installation is needed.

```powershell
npm run build
npm run check
npm run preview
```

Open http://127.0.0.1:4173. The build writes the complete static website to `dist/`; upload that directory to a static host. All site images and fonts are served locally, without Squarespace scripts or asset requests.

## Edit

- `src/build.mjs`: shared HTML and public pages.
- `src/content.mjs`: contact details, service lists, and existing external destinations.
- `src/styles.css`: responsive styles.
- `src/site.js`: accessible mobile menu.
- `assets/provenance.json`: original image/font source URLs and processing notes.
- `scripts/check-site.mjs`: public-route, link, asset, and integration-boundary checks.

## GitHub Pages preview

The review site is published from `main`, repository root, at:

https://jamesshealy109-sudo.github.io/crescentwater.us/

After changing source, run `npm run publish:github` and commit the regenerated root HTML, styles, script, and page directories to `main`. This command builds and checks all links with the `/crescentwater.us/` project prefix. `.nojekyll` makes Pages serve the static files directly. `npm run build` still produces an unprefixed `dist/` for an eventual custom-domain deployment.

## Migration status

The GitHub Pages site is a review build. DNS and the live Squarespace website have not changed. Google Business Profile and reviews are not connected.

Quote requests open Crescent Water's existing public Jobber request form. No quote submission has been made during testing. The contact page also provides phone and email links.

Crew Hub remains linked to its existing protected page at `https://www.crescentwater.us/crew-hub`; private content was not accessed. **Do not switch the domain until Crew Hub is migrated to a protected destination or retained at a separate hostname.** At cutover, replace the Crew Hub destination in `src/content.mjs`. It cannot keep pointing to the same domain after that domain serves only this static build.

The old `/home-1-1-1` route has a static alias and an optional `_redirects` rule. The sitemap and canonical links target the eventual production domain, not a temporary preview host.
