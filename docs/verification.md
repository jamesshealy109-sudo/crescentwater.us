# Verification — 2026-11-04

- `npm run build`: passed; five public pages, legacy home alias, sitemap, locally served assets.
- `npm run check`: passed; six routes and 116 local references, no Squarespace runtime asset dependencies, preserved contact/private-hub boundaries.
- `node --check src/site.js`: passed.
- `git diff --check`: passed.
- Impeccable mechanical scan of source: no findings.
- Browser: all public pages at 1440×1000 and 390×844 had one h1, no horizontal overflow, and no broken loaded images.
- Home additionally checked at 320px, 768px, and 1024px: no horizontal overflow; compact header stays one row.
- Mobile menu: opens, navigates to contact, closes with Escape, and restores button focus.
- Public Jobber quote destination: rendered Crescent Water’s request form. No fields filled or form submitted.
- Independent source review: corrected partner descriptions against original artwork. No other shipping findings.

## Remaining migration boundary
This preview has not replaced the live site. Before moving the domain, choose hosting and resolve the protected Crew Hub destination. Review integration is deferred per the user.

Screenshots in `docs/previews/` show the final desktop and mobile homepages.
