import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../public/images/logo.png');
const outputPath = path.join(__dirname, '../public/images/logo-transparent.png');

async function convertToTransparent() {
  try {
    // Load the image and get its metadata
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log('Original image:', metadata.width, 'x', metadata.height);

    // Extract raw pixel data
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Process pixels - make white/near-white pixels transparent
    const threshold = 240; // Pixels with R, G, B all above this become transparent

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Check if pixel is white or near-white
      if (r > threshold && g > threshold && b > threshold) {
        data[i + 3] = 0; // Set alpha to 0 (transparent)
      }
    }

    // Save the processed image
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4,
      },
    })
      .png()
      .toFile(outputPath);

    console.log('Transparent logo saved to:', outputPath);

    // Also create optimized versions for web
    await sharp(outputPath)
      .resize(200, null, { withoutEnlargement: true })
      .png({ quality: 90 })
      .toFile(path.join(__dirname, '../public/images/logo-small.png'));

    await sharp(outputPath)
      .resize(400, null, { withoutEnlargement: true })
      .png({ quality: 90 })
      .toFile(path.join(__dirname, '../public/images/logo-medium.png'));

    console.log('Created optimized versions: logo-small.png, logo-medium.png');

  } catch (error) {
    console.error('Error processing image:', error);
  }
}

convertToTransparent();
