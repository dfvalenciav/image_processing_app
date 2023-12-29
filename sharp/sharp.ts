import sharp from 'sharp';


const path = require('path');

async function resizeImage(filename: string, width: string, height:string) {
  try {
    // Replacing 'utilities/images' with the correct path to your images folder
    const imagePath = path.join(__dirname, 'utilities', 'images', `${filename}.jpg`);

    // Reading the image
    const imageBuffer = await sharp(imagePath)
      .resize(parseInt(width), parseInt(height))
      .toBuffer();

    return imageBuffer;
  } catch (error) {
    console.error(error);
    throw new Error('Error resizing image');
  }
}

export default resizeImage;