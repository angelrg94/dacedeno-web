import { mkdir, writeFile } from 'node:fs/promises';
const origin = process.env['PUBLIC_ORIGIN']?.replace(/\/$/, '');
if (!origin || !/^https:\/\/[^/]+$/.test(origin))
  throw new Error('Set PUBLIC_ORIGIN to the final HTTPS domain before generating sitemap.xml.');
const urls = ['', '/privacidad'];
await mkdir('public', { recursive: true });
await writeFile(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join('\n')}\n</urlset>\n`,
);
console.log(`Generated public/sitemap.xml for ${origin}`);
