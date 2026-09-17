import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const logoPath = 'public/brand/logo-aprobado.png';
const background = { r: 250, g: 243, b: 222, alpha: 1 };

const mark = await sharp(logoPath)
  .extract({ left: 0, top: 0, width: 300, height: 360 })
  .trim()
  .png()
  .toBuffer();

async function renderIcon(size) {
  const inset = Math.round(size * 0.84);
  return sharp(mark)
    .resize(inset, inset, { fit: 'contain', background })
    .extend({
      top: Math.floor((size - inset) / 2),
      bottom: Math.ceil((size - inset) / 2),
      left: Math.floor((size - inset) / 2),
      right: Math.ceil((size - inset) / 2),
      background,
    })
    .flatten({ background })
    .png()
    .toBuffer();
}

function createIco(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = header.length;
  for (const [index, { size, data }] of images.entries()) {
    const entry = 6 + index * 16;
    header.writeUInt8(size === 256 ? 0 : size, entry);
    header.writeUInt8(size === 256 ? 0 : size, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  }

  return Buffer.concat([header, ...images.map(({ data }) => data)]);
}

const icoImages = await Promise.all(
  [16, 32, 48].map(async (size) => ({ size, data: await renderIcon(size) })),
);

await Promise.all([
  writeFile('public/favicon.ico', createIco(icoImages)),
  renderIcon(32).then((data) => writeFile('public/favicon-32x32.png', data)),
  renderIcon(180).then((data) => writeFile('public/apple-touch-icon.png', data)),
]);

console.log('Generated branded favicon.ico, favicon-32x32.png, and apple-touch-icon.png');
