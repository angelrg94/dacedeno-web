import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist/angular-site/browser');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.json': 'application/json',
};
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      let path = resolve(root, '.' + decodeURIComponent(url.pathname));
      if (path !== root && !path.startsWith(root + sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      let status = 200;
      try {
        if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
        await stat(path);
      } catch (error) {
        if (!['ENOENT', 'ENOTDIR'].includes(error.code)) throw error;
        path = resolve(root, '404/index.html');
        status = 404;
      }
      const body = await readFile(path);
      res.writeHead(status, {
        'Content-Type': mime[extname(path)] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      });
      res.end(body);
    } catch (error) {
      console.error(error);
      res.writeHead(500);
      res.end('Unable to serve page');
    }
  })
  .listen(4173, '127.0.0.1', () => console.log('Static preview: http://127.0.0.1:4173'));
