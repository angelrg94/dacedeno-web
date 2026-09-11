import sharp from 'sharp';
import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
const source = process.argv[2];
if (!source)
  throw new Error(
    'Pass the local mock directory containing index.html and assets/. Originals stay outside the web repository.',
  );
await Promise.all(
  ['images', 'brand', 'fonts'].map((folder) => mkdir(`public/${folder}`, { recursive: true })),
);
for (const [name, widths, quality] of [
  ['retrato', [480, 900], 80],
  ['parque', [640, 1200, 1493], 92],
]) {
  for (const width of widths)
    await sharp(join(source, `assets/daniela-entrenamiento-${name}.jpg`))
      .resize({ width })
      .webp({ quality })
      .toFile(`public/images/daniela-${name}-${width}.webp`);
}
await sharp(join(source, 'assets/firma-daniela-source.png'))
  .resize({ width: 1000 })
  .webp({ lossless: true })
  .toFile('public/brand/firma-source.webp');
const signatureData = (await readFile('public/brand/firma-source.webp')).toString('base64');
const mock = await readFile(join(source, 'index.html'), 'utf8');
const signature = mock.match(/<div class="daniela-signature">\s*(<svg[\s\S]*?<\/svg>)/)[1];
await writeFile(
  'public/brand/firma-daniela.svg',
  signature
    .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')
    .replace('assets/firma-daniela-source.png', `data:image/webp;base64,${signatureData}`),
);
for (const family of ['bricolage-grotesque', 'manrope']) {
  await copyFile(
    `node_modules/@fontsource-variable/${family}/files/${family}-latin-wght-normal.woff2`,
    `public/fonts/${family}-latin-wght-normal.woff2`,
  );
  await copyFile(
    `node_modules/@fontsource-variable/${family}/LICENSE`,
    `public/fonts/${family}-LICENSE.txt`,
  );
}
