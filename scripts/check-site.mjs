import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const root = resolve('dist');
assert.ok(existsSync(root), 'Build must produce dist/');
const routes = ['index.html', 'services/index.html', 'residential-commercial/index.html', 'contact/index.html', 'trusted-p/index.html', 'home-1-1-1/index.html'];
let links = 0;
for (const route of routes) {
  const file = resolve(root, route);
  assert.ok(existsSync(file), `Missing public route: ${route}`);
  const html = readFileSync(file, 'utf8');
  assert.match(html, /<h1[\s>]/, `Missing primary heading: ${route}`);
  assert.match(html, /name="viewport"/);
  assert.doesNotMatch(html, /(?:src|href)="https?:\/\/[^"\s]*squarespace/i, 'Runtime assets must not depend on Squarespace');
  assert.doesNotMatch(html, /<form\b/, 'Do not ship a contact form without a delivery backend');
  for (const [, target] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|#)/.test(target)) continue;
    const path = target.split('#')[0].split('?')[0];
    let local = target.startsWith('/') ? resolve(root, '.' + path) : resolve(dirname(file), path);
    if (existsSync(local) && statSync(local).isDirectory()) local = resolve(local, 'index.html');
    assert.ok(local.startsWith(root), `Link escaped build: ${target}`);
    assert.ok(existsSync(local), `Broken local link in ${route}: ${target}`);
    links++;
  }
}
const css = readFileSync(resolve(root, 'styles.css'), 'utf8');
for (const [, target] of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) {
  assert.ok(!/^https?:/.test(target), `External CSS asset: ${target}`);
  assert.ok(existsSync(resolve(root, target)), `Missing CSS asset: ${target}`);
}
const home = readFileSync(resolve(root, 'index.html'), 'utf8');
for (const content of ['Lawn Maintenance', 'Installations', 'Irrigation', '(803) 553-6500', 'david@crescentwater.us']) assert.ok(home.includes(content), `Lost core content: ${content}`);
assert.ok(home.includes('https://www.crescentwater.us/crew-hub'), 'Private Crew Hub must stay on its existing host');
assert.ok(!home.includes('Google Reviews'), 'Review integration was deferred');
assert.ok(readdirSync(resolve(root, 'assets')).length > 10);
console.log(`PASS: ${routes.length} routes, ${links} local references, self-hosted assets, contact and private-hub boundaries.`);
