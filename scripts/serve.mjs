import http from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const port = Number(process.env.PORT || 4173);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.woff2':'font/woff2','.json':'application/json','.xml':'application/xml','.txt':'text/plain'};
http.createServer((req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(root, '.' + path);
    if (file !== root && !file.startsWith(root + sep)) {res.writeHead(403); res.end(); return;}
    if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, 'index.html');
    const found = existsSync(file) && statSync(file).isFile();
    if (!found) file = resolve(root, '404.html');
    res.writeHead(found ? 200 : 404, {'Content-Type':mime[extname(file)] || 'application/octet-stream','Cache-Control':'no-cache'});
    res.end(readFileSync(file));
  } catch { res.writeHead(400); res.end('Bad request'); }
}).listen(port, '127.0.0.1', () => console.log(`Crescent Water preview: http://127.0.0.1:${port}`));
