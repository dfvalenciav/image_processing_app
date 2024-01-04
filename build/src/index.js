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
const express_1 = __importDefault(require('express'));
const sharp_1 = __importDefault(require('../sharp/sharp'));
const trafficMiddleware_1 = __importDefault(require('./middleware/trafficMiddleware'));
const app = (0, express_1.default)();
const port = 3000;
const path = require('path');
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.use(trafficMiddleware_1.default);
app.get('/api', (req, res) => {
  res.send('Image processing in progress ...');
});
// Serve static files from the 'public' folder
app.use(express_1.default.static('public'));
// Defining the API endpoint to serve and resize the image
app.get('/api/images', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      // Getting query parameters with single quotes
      const filename = String(req.query.filename);
      const width = String(req.query.width);
      const height = String(req.query.height);
      // Resizing the image using sharp module / resizeImage
      const imageBuffer = yield (0, sharp_1.default)(filename, width, height);
      // Seting the content type to 'image/jpeg' (or appropriate content type)
      res.contentType('image/jpeg');
      // Sending the resized image data as the response
      res.send(imageBuffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }),
);
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
exports.default = app;
