'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const sharp_1 = __importDefault(require('sharp'));
const path = require('path');
// In-memory cache to store resized images
const imageCache = {};
function resizeImage(filename, width, height) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      // Parse width and height as integers
      const parsedWidth = parseInt(width, 10);
      const parsedHeight = parseInt(height, 10);
      // Validate width and height
      if (isNaN(parsedWidth) || isNaN(parsedHeight) || parsedWidth <= 0 || parsedHeight <= 0) {
        throw new Error('Invalid width or height');
      }
      // Create a cache key based on filename, width, and height
      const cacheKey = `${filename}_${parsedWidth}_${parsedHeight}`;
      // Check if the resized image is already in the cache
      if (imageCache[cacheKey]) {
        return imageCache[cacheKey];
      }
      // Replacing 'utilities/images' with the correct path to your images folder
      const imagePath = path.join('src', 'utilities', 'images', `${filename}.jpg`);
      // Reading the image
      const imageBuffer = yield (0, sharp_1.default)(imagePath).resize(parsedWidth, parsedHeight).toBuffer();
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
  });
}
exports.default = resizeImage;
