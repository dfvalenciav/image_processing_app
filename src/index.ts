import express from 'express';
import resizeImage from '../sharp/sharp';

const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', (req, res) => {
  res.send('Image processing in progress ...');
});

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Defining the API endpoint to serve and resize the image
app.get('/api/images', async (req, res) => {
  try {
    // Getting query parameters with single quotes
    const filename = String(req.query.filename);
    const width = String(req.query.width);
    const height = String(req.query.height);

    // Resizing the image using sharp module / resizeImage
    const imageBuffer = await resizeImage(filename, width, height);

    // Set the content type to 'image/jpeg' (or appropriate content type)
    res.contentType('image/jpeg');
    // Sending the resized image data as the response
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

