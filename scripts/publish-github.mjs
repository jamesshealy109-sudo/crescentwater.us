import { cpSync, copyFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// GitHub Pages publishes main at the repository root. Keep its generated
// entrypoints tracked there; original assets already live in assets/.
process.env.CRESCENT_BASE_PATH = '/crescentwater.us';
await import('../src/build.mjs');
await import('./check-site.mjs');
for (const file of ['index.html', '404.html', 'styles.css', 'site.js', 'sitemap.xml', 'robots.txt']) {
  copyFileSync(resolve('dist', file), resolve(file));
}
for (const directory of ['services', 'residential-commercial', 'trusted-p', 'contact', 'home-1-1-1']) {
  cpSync(resolve('dist', directory), resolve(directory), { recursive: true });
}
writeFileSync('.nojekyll', '');
console.log('Prepared main branch root for https://jamesshealy109-sudo.github.io/crescentwater.us/');
