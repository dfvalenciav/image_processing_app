import express, { Request, Response } from 'express';
import resizeImage from '../sharp/sharp';
import trafficMiddleware from './middleware/trafficMiddleware';

const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(trafficMiddleware);

app.get('/api', (req: Request, res: Response) => {
  res.send('Image processing in progress ...');
});

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Defining the API endpoint to serve and resize the image
app.get('/api/images', async (req: Request, res: Response) => {
  try {
    // Getting query parameters with single quotes
    const filename = String(req.query.filename);
    const width = String(req.query.width);
    const height = String(req.query.height);

    // Validate parameters
    if (!filename || !/^[a-zA-Z0-9]+$/.test(filename)) {
      return res.status(400).json({ error: 'Invalid filename. Please provide a valid alphanumeric filename.' });
    }

    const parsedWidth: number = parseInt(width, 10);
    const parsedHeight: number = parseInt(height, 10);

    if (isNaN(parsedWidth) || isNaN(parsedHeight) || parsedWidth <= 0 || parsedHeight <= 0) {
      return res.status(400).json({ error: 'Invalid width or height. Please provide valid positive numeric values.' });
    }

    // Resizing the image using sharp module / resizeImage
    const imageBuffer = await resizeImage(filename, width, height);

    // Seting the content type to 'image/jpeg' (or appropriate content type)
    res.contentType('image/jpeg');
    // Sending the resized image data as the response
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
