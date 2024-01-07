import sharp from 'sharp';
import fs from 'fs';

const path = require('path');

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

async function resizeImage(
  filename: string,
  width: string,
  height: string,
): Promise<Buffer> {
  try {
    // Validate filename
    if (!filename || !/^[a-zA-Z0-9]+$/.test(filename)) {
      throw new Error(
        'Invalid filename. Please provide a valid alphanumeric filename.',
      );
    }

    // Parse width and height as integers
    const parsedWidth: number = parseInt(width, 10);
    const parsedHeight: number = parseInt(height, 10);

    // Validate width and height
    if (
      isNaN(parsedWidth) ||
      isNaN(parsedHeight) ||
      parsedWidth <= 0 ||
      parsedHeight <= 0
    ) {
      throw new Error(
        'Invalid width or height. Please provide valid positive numeric values.',
      );
    }

    // Replacing 'utilities/images' with the correct path to your images folder
    const imagePath: string = path.join(
      'src',
      'utilities',
      'images',
      `${filename}.jpg`,
    );

    const cachedImagePath : string = path.join (
      'src',
      'utilities',
      'cache',
      `${filename}-${width}-${height}.jpg`,
    )

      // Check if the cached image exists
      if (await fileExists(cachedImagePath)) {
        // If cached image exists, serve it
        console.log(`Serving cached image: ${cachedImagePath}`);
        return await fs.promises.readFile(cachedImagePath);
      }

    // Reading the image
    const imageBuffer: Buffer | null = await sharp(imagePath)
      .resize(parsedWidth, parsedHeight)
      .toBuffer();

    // Check if the imageBuffer is null
    if (imageBuffer === null) {
      throw new Error('Error resizing image');
    }

    await fs.promises.writeFile(cachedImagePath, imageBuffer);
    console.log(`Saved and served resized image: ${cachedImagePath}`);

    return imageBuffer;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

export default resizeImage;


