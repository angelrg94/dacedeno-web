import sharp from 'sharp';
import { join } from 'node:path';

const source = process.argv[2];
if (!source) {
  throw new Error('Pass the approved logo PNG path or its containing directory.');
}

const sourceFile = source.endsWith('.png')
  ? source
  : join(source, 'daniela-cedeno-referencia-maestra.png');
const crop = { left: 200, top: 100, width: 1500, height: 470 };
const background = [246, 246, 246];
const sourceColors = [
  [30, 36, 31],
  [93, 99, 69],
];

async function createLogo(output, targetColors) {
  const cropped = await sharp(sourceFile).extract(crop).png().toBuffer();
  const { data, info } = await sharp(cropped)
    .trim({ background: { r: 246, g: 246, b: 246, alpha: 1 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const outputData = Buffer.alloc(data.length);

  for (let index = 0; index < data.length; index += 4) {
    const pixel = [data[index], data[index + 1], data[index + 2]];
    const backgroundDistance = pixel.reduce(
      (sum, value, channel) => sum + (value - background[channel]) ** 2,
      0,
    );
    if (backgroundDistance < 36) {
      outputData[index + 3] = 0;
      continue;
    }

    let best = { error: Number.POSITIVE_INFINITY, alpha: 0, color: sourceColors[0] };
    for (const [colorIndex, sourceColor] of sourceColors.entries()) {
      const vector = sourceColor.map((value, channel) => value - background[channel]);
      const denominator = vector.reduce((sum, value) => sum + value ** 2, 0);
      const alpha = Math.max(
        0,
        Math.min(
          1,
          pixel.reduce(
            (sum, value, channel) => sum + (value - background[channel]) * vector[channel],
            0,
          ) / denominator,
        ),
      );
      const error = pixel.reduce((sum, value, channel) => {
        const blended = background[channel] + alpha * vector[channel];
        return sum + (value - blended) ** 2;
      }, 0);
      if (error < best.error) best = { error, alpha, color: sourceColor };
      if (colorIndex === sourceColors.length - 1 && best.alpha < 0.02) best.alpha = 0;
    }

    const target = targetColors[sourceColors.indexOf(best.color)];
    outputData[index] = target[0];
    outputData[index + 1] = target[1];
    outputData[index + 2] = target[2];
    outputData[index + 3] = Math.round(best.alpha * 255);
  }

  await sharp(outputData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(output);
  console.log(`${output} (${info.width}x${info.height})`);
}

await createLogo('public/brand/logo-aprobado.png', [
  [30, 36, 31],
  [93, 99, 69],
]);
await createLogo('public/brand/logo-aprobado-light.png', [
  [255, 254, 255],
  [174, 186, 156],
]);
