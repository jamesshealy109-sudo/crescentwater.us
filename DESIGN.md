# Crescent Water visual system

## Authority
The original site at https://www.crescentwater.us/ is the visual reference. This is a restrained cleanup, not a redesign. Original logo, campaign artwork, service posters, and fonts are preserved and served locally.

## Palette and typography
- Page background: `#050605`; footer: `#0b0e0a`; panels: `#101310`.
- Primary text: `#f4f5f1`; secondary text: `#b3bcb0`.
- Brand green: `#62e30b`; supporting blue: `#63bafa`; dividers: `#293126`.
- Oswald 700 for headings; Arimo 400/700 for body and controls. Original Latin WOFF2 files are self-hosted.

## Layout
Desktop content is bounded to 1200px. Navigation is a single horizontal row at 1180px and above; smaller widths use a disclosure menu. The full original portrait hero sits beside the introduction on desktop. Services use three aligned columns. Existing poster artwork is shown in full rather than cropped.

Below 768px, the header uses the original logo plus green menu icon; the hero artwork is followed by phone and quote actions, matching the original mobile composition. Content and posters stack. The moving/clipped phone ticker is replaced by a readable phone link.

## Controls and accessibility
Green pill buttons, green active links, and visible blue keyboard focus. Menu state uses aria-expanded; Escape closes it and restores focus. Outside clicks and navigation close the menu. Dark surfaces and green accent text preserve contrast. Reduced-motion preference disables transitions and smooth scrolling. No autoplay review carousel or review connection is present.

## Verification
All five public pages checked at 1440px and 390px; home additionally checked at 320px, 768px, and 1024px. No horizontal overflow or broken images observed. One h1 on every page. Original partner names and contact details checked against supplied artwork during code review.
