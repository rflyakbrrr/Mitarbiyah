import sharp from 'sharp';
import { copyFile, mkdir, writeFile } from 'node:fs/promises';

await mkdir('public/images', { recursive: true });
await copyFile('GG.png', 'public/images/GG.png');
const inventory = [];
for (const name of ['1', '2', '3', '4', '5', '6', 'poto']) {
  const source = `${name}.jpeg`;
  const metadata = await sharp(source).metadata();
  const widths = [480, 960, 1280].filter((width) => width <= metadata.width);
  for (const width of widths) {
    await sharp(source)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(`public/images/${name}-${width}.webp`);
  }
  inventory.push({
    source,
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    variants: widths,
  });
}
await writeFile('src/data/image-inventory.json', JSON.stringify(inventory, null, 2));
console.log('Prepared responsive WebP variants for all 7 original photographs.');
