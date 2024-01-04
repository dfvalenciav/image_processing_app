import sharp from 'sharp';

const path = require('path');
// In-memory cache to store resized images
const imageCache: { [key: string]: Buffer } = {};

async function resizeImage(filename: string, width: string, height: string): Promise<Buffer> {
  try {
    // Parse width and height as integers
    const parsedWidth: number = parseInt(width, 10);
    const parsedHeight: number = parseInt(height, 10);

    // Validate width and height
    if (isNaN(parsedWidth) || isNaN(parsedHeight) || parsedWidth <= 0 || parsedHeight <= 0) {
      throw new Error('Invalid width or height');
    }

    // Create a cache key based on filename, width, and height
    const cacheKey: string = `${filename}_${parsedWidth}_${parsedHeight}`;

    // Check if the resized image is already in the cache
    if (imageCache[cacheKey]) {
      return imageCache[cacheKey];
    }

    // Replacing 'utilities/images' with the correct path to your images folder
    const imagePath: string = path.join('src', 'utilities', 'images', `${filename}.jpg`);

    // Reading the image
    const imageBuffer: Buffer | null = await sharp(imagePath).resize(parsedWidth, parsedHeight).toBuffer();

    // Check if the imageBuffer is null
    if (imageBuffer === null) {
      throw new Error('Error resizing image');
    }

    // Cache the resized image
    imageCache[cacheKey] = imageBuffer;

    return imageBuffer;
  } catch (error) {
    console.error(error);
    throw new Error('Error resizing image');
  }
}

export default resizeImage;
