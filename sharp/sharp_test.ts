import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGES_FOLDER = path.join(__dirname, 'utilities', 'images');
const CACHE_FOLDER = path.join(__dirname, 'utilities', 'cache');

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

async function resizeImage(filename: string, width: string, height: string): Promise<Buffer> {
  try {
    const numericWidth: number = parseInt(width, 10);
    const numericHeight: number = parseInt(height, 10);

    if (isNaN(numericWidth) || isNaN(numericHeight) || numericWidth <= 0 || numericHeight <= 0) {
      throw new Error('Invalid width or height. Please provide valid positive numeric values.');
    }

    const imagePath = path.join(IMAGES_FOLDER, `${filename}.jpg`);
    const cachedImagePath = path.join(CACHE_FOLDER, `${filename}-${width}-${height}.jpg`);

    // Check if the cached image exists
    if (await fileExists(cachedImagePath)) {
      // If cached image exists, serve it
      console.log(`Serving cached image: ${cachedImagePath}`);
      return await fs.promises.readFile(cachedImagePath);
    }

    // If cached image does not exist, resize the original image
    const imageBuffer: Buffer = await sharp(imagePath)
      .resize(numericWidth, numericHeight)
      .toBuffer();

    // Save the resized image to the cache folder
    await fs.promises.writeFile(cachedImagePath, imageBuffer);
    console.log(`Saved and served resized image: ${cachedImagePath}`);

    return imageBuffer;
  } catch (error) {
    console.error(error.message);
    throw new Error('Error processing image');
  }
}

export default resizeImage;
