import { mkdirSync, copyFileSync, cpSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { business as b, services } from './content.mjs';

const out = resolve('dist');
const basePath = (process.env.CRESCENT_BASE_PATH || '').replace(/\/$/, '');
if (basePath && !/^\/[a-zA-Z0-9._-]+$/.test(basePath)) throw new Error('Use one project path for CRESCENT_BASE_PATH.');
const withBasePath = html => basePath ? html.replace(/((?:href|src)=")\/(?!\/)/g, `$1${basePath}/`) : html;
mkdirSync(out, { recursive: true });
cpSync('assets', resolve(out, 'assets'), { recursive: true });
for (const name of ['styles.css', 'site.js']) copyFileSync(resolve('src', name), resolve(out, name));
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const chevron = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="2"/></svg>';
const phone = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 3 3 5-2 2c1.4 2.7 3.3 4.6 6 6l2-2 5 3c0 3-1.5 4-4 4C10 21 3 14 3 7c0-2.5 1-4 4-4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
const quoteButton = (label = 'Get a free quote') => `<a class="button" href="/contact/">${label}${chevron}</a>`;
const image = (name, alt, width, height, extra = '') => `<img src="/assets/${name}.webp" alt="${escape(alt)}" width="${width}" height="${height}" ${extra}>`;
const serviceLists = () => `<div class="service-grid">${services.map((s, i) => `<section class="service-list" aria-labelledby="service-${i}"><h3 id="service-${i}">${s.title}</h3><ul>${s.items.map(item => `<li>${escape(item)}</li>`).join('')}</ul></section>`).join('')}</div>`;
const navItems = [['/', 'Home'], ['/residential-commercial/', 'Residential & Commercial'], ['/services/', 'Services'], ['/trusted-p/', 'Trusted Partners'], ['/contact/', 'Contact Us']];

function header(active) {
  return `<header class="site-header"><div class="header-inner">
    <a class="brand" href="/" aria-label="Crescent Water Landscaping home">${image('logo', b.name, 1000, 333, 'fetchpriority="high"')}</a>
    <button class="menu-toggle" type="button" aria-controls="main-nav" aria-expanded="false" aria-label="Open navigation"><span></span><span></span><span></span></button>
    <nav id="main-nav" class="main-nav" aria-label="Main navigation">${navItems.map(([href, label]) => `<a href="${href}"${active === href ? ' aria-current="page"' : ''}>${escape(label)}</a>`).join('')}<a class="mobile-crew" href="${b.crew}">Crew Hub</a></nav>
    <a class="button header-quote" href="/contact/">Request quote</a>
  </div></header>`;
}
function footer() {
  return `<footer class="site-footer"><div class="container footer-grid">
    <div class="footer-brand"><a href="/">${image('logo', b.name, 1000, 333, 'loading="lazy"')}</a><p>The difference is night and day.</p><p class="muted">Locally owned & operated<br>Lexington, South Carolina</p></div>
    <div><h2>Get in touch</h2><a class="footer-phone" href="tel:${b.tel}">${b.phone}</a><a href="mailto:${b.email}">${b.email}</a><div class="social-links"><a href="${b.facebook}" rel="noopener noreferrer" target="_blank">Facebook<span class="sr-only"> (opens in a new tab)</span></a><a href="${b.instagram}" rel="noopener noreferrer" target="_blank">Instagram<span class="sr-only"> (opens in a new tab)</span></a></div></div>
    <div><h2>Our service areas</h2><p class="muted">${b.areas.map(escape).join(' · ')}<br>South Carolina</p><a href="${b.crew}">Crew Hub ${chevron}</a></div>
  </div><div class="container footer-bottom"><small>© ${new Date().getFullYear()} ${b.name}. All rights reserved.</small><a href="/contact/">Request a quote</a></div></footer>`;
}
function cta() {
  return `<section class="contact-strip container"><div><h2>Your next outdoor project starts here.</h2><p>Tell us what you have in mind. We’ll provide a personalized estimate for your property.</p></div>${quoteButton()}</section>`;
}
function layout({ title, description, path, body }) {
  return withBasePath(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#050605"><title>${escape(title)} | Crescent Water Landscaping</title><meta name="description" content="${escape(description)}"><link rel="canonical" href="https://www.crescentwater.us${path}"><link rel="icon" href="/assets/logo.webp" type="image/webp"><link rel="preload" href="/assets/oswald-700.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/styles.css"><script src="/site.js" defer></script></head>
<body><a class="skip-link" href="#main">Skip to content</a>${header(path)}<main id="main">${body}</main>${footer()}</body></html>`);
}

const home = `<section class="hero container" aria-label="Crescent Water Landscaping">
  <div class="hero-art">${image('night-and-day', 'The difference is night and day! Crescent Water residential and commercial landscaping in Lexington, SC and surrounding areas.', 1086, 1276, 'fetchpriority="high"')}</div>
  <div class="hero-content"><div class="hero-copy"><h1>Professional lawn care & landscaping in <span>Lexington, SC.</span></h1><p>Dependable residential and commercial lawn care, landscape maintenance, and professional landscaping services.</p></div>
  <a class="call-link" href="tel:${b.tel}">${phone}<span>Call us today <strong>${b.phone}</strong></span></a>
  ${quoteButton()}<p class="hero-areas">Lexington · West Columbia · Columbia · Irmo · Chapin · Gilbert</p></div>
</section>
<section class="services-section container"><div class="section-heading"><h2>Our landscaping services</h2><a class="text-link" href="/services/">Explore services ${chevron}</a></div>${serviceLists()}</section>
<section class="property-section container"><div class="property-art">${image('lawn-care', 'Lawn care professionals for residential properties, commercial properties, and homeowners associations.', 1141, 1378, 'loading="lazy"')}</div><div class="property-copy"><h2>Residential.<br>Commercial.<br><span>Always cared for.</span></h2><p>Crescent Water Landscaping is a locally owned and operated landscaping company proudly serving Lexington, South Carolina, and surrounding communities.</p><p>From routine lawn mowing and hedge trimming to mulch installation, pine straw, sod installation, irrigation services, weed control, and seasonal property cleanups, our team is committed to keeping your property looking its best year-round.</p><a class="text-link" href="/residential-commercial/">Residential & commercial ${chevron}</a></div></section>
<section class="work-section container"><h2>Landscape care, from the ground up.</h2><div class="work-images">${image('residential-properties', 'Crescent Water artwork featuring maintained residential lawns and landscaped properties.', 1672, 941, 'loading="lazy"')}${image('landscape-work', 'Examples of trimmed landscape beds, red mulch, and lawn maintenance from the existing Crescent Water website.', 1320, 544, 'loading="lazy"')}</div></section>
${cta()}`;

const residential = `<div class="container page-intro"><h1>Residential & commercial</h1><p>Professional lawn care, landscape maintenance, and landscaping services for homes, businesses, and homeowners associations.</p></div><section class="container poster-gallery" aria-label="Property services">${image('property-types', 'Three areas, one commitment: residential, commercial, and homeowners association landscaping services.', 1024, 1536)}${image('residential', 'Residential landscaping, including lawn maintenance, landscape design and installation, mulch and pine straw, irrigation and fertilization, and seasonal cleanups.', 941, 1672, 'loading="lazy"')}${image('hoa', 'Homeowners association landscaping and community maintenance.', 941, 1672, 'loading="lazy"')}</section>${cta()}`;
const servicePage = `<div class="container page-intro"><h1>Complete landscaping solutions</h1><p>From weekly lawn maintenance to new installations and irrigation repairs. Residential, commercial, and HOA property care.</p></div><section class="container services-detail"><div class="service-poster">${image('services-guide', 'Original Crescent Water complete landscaping solutions service guide.', 887, 1774)}</div><div>${serviceLists()}</div></section>${cta()}`;
const partners = `<div class="container page-intro"><h1>Trusted local partners</h1><p>Local partners. Local commitment.</p></div><section class="container poster-gallery partner-gallery" aria-label="Local partner information">${image('local-partners', 'Trusted local partners: A–Z Outdoor Equipment, 803-957-1011, a-zoutdoor.com; Barthelemy Landscape Supply, 803-200-1051, barthelemylandscapesupply.com; Erica Woolwine at PrimeLending, 803-556-2570, localladylender.com.', 1145, 1373)}${image('farrell-insurance', 'Farrell Insurance Agency. Phone 803-399-0200. Visit farrellinsagency.com.', 640, 960, 'loading="lazy"')}${image('my-optical', 'My Optical, your family optical. Phone 803-756-3460. Visit myopticallexington.com.', 1145, 1374, 'loading="lazy"')}</section>${cta()}`;
const contact = `<section class="contact-page container"><div class="contact-heading"><h1>Contact us</h1><h2>Your next outdoor project starts here.</h2><p>Tell us what you have in mind, and we’ll provide a personalized estimate for your property.</p><div class="contact-details"><a href="tel:${b.tel}">${phone}${b.phone}</a><a href="mailto:${b.email}">${b.email}</a></div></div><div class="quote-panel"><h2>Get a free quote</h2><p>Request an estimate for your lawn care, landscaping, or irrigation project.</p><a class="button" href="${b.quote}" target="_blank" rel="noopener noreferrer">Request a quote online ${chevron}<span class="sr-only"> (opens in a new tab)</span></a><p class="muted quote-note">Opens Crescent Water’s secure request form with Jobber.</p><div class="contact-service-areas"><h3>Our service areas</h3><p>${b.areas.join(' · ')}, SC</p></div></div></section>`;

const pages = [
  {path: '/', title: 'Lexington SC Lawn Care & Landscaping', description: 'Residential and commercial lawn care, landscaping, and irrigation services in Lexington, SC and surrounding communities. Call (803) 553-6500.', body: home},
  {path: '/residential-commercial/', title: 'Residential & Commercial', description: 'Landscape maintenance for residential, commercial, and HOA properties in Lexington, South Carolina.', body: residential},
  {path: '/services/', title: 'Landscaping Services', description: 'Lawn maintenance, landscape installations, and irrigation services from Crescent Water Landscaping.', body: servicePage},
  {path: '/trusted-p/', title: 'Trusted Local Partners', description: 'Meet Crescent Water Landscaping’s trusted local partners.', body: partners},
  {path: '/contact/', title: 'Contact Us', description: 'Request a personalized landscaping estimate. Contact Crescent Water Landscaping at (803) 553-6500 or david@crescentwater.us.', body: contact}
];
for (const page of pages) {
  const directory = resolve(out, '.' + page.path);
  mkdirSync(directory, {recursive: true});
  writeFileSync(resolve(directory, 'index.html'), layout(page));
}
mkdirSync(resolve(out, 'home-1-1-1'), {recursive: true});
writeFileSync(resolve(out, 'home-1-1-1/index.html'), layout(pages[0]));
writeFileSync(resolve(out, '404.html'), layout({path: '/404/', title: 'Page not found', description: 'Find your way back to Crescent Water Landscaping.', body: `<section class="page-intro container not-found"><h1>Page not found</h1><p>Let’s get you back to the right place.</p><a class="button" href="/">Back to home ${chevron}</a></section>`}));
writeFileSync(resolve(out, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://www.crescentwater.us/sitemap.xml\n');
writeFileSync(resolve(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p => `<url><loc>https://www.crescentwater.us${p.path}</loc></url>`).join('')}</urlset>`);
writeFileSync(resolve(out, '_redirects'), '/home-1-1-1 / 301\n');
console.log(`Built ${pages.length} pages, legacy home alias, sitemap, and local assets in dist/.`);
