import sharp from 'sharp';

const path = require('path');

async function resizeImage(filename: string, width: string, height: string): Promise<Buffer> {
  try {
    // Validate filename
    if (!filename || !/^[a-zA-Z0-9]+$/.test(filename)) {
      throw new Error('Invalid filename. Please provide a valid alphanumeric filename.');
    }

    // Parse width and height as integers
    const parsedWidth: number = parseInt(width, 10);
    const parsedHeight: number = parseInt(height, 10);

    // Validate width and height
    if (isNaN(parsedWidth) || isNaN(parsedHeight) || parsedWidth <= 0 || parsedHeight <= 0) {
      throw new Error('Invalid width or height. Please provide valid positive numeric values.');
    }

    // Replacing 'utilities/images' with the correct path to your images folder
    const imagePath: string = path.join('src', 'utilities', 'images', `${filename}.jpg`);

    // Reading the image
    const imageBuffer: Buffer | null = await sharp(imagePath)
      .resize(parsedWidth, parsedHeight)
      .toBuffer();

    // Check if the imageBuffer is null
    if (imageBuffer === null) {
      throw new Error('Error resizing image');
    }

    return imageBuffer;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

export default resizeImage;
