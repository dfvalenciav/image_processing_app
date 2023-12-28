import express from 'express';



const app = express();
const port = 3000;
const path = require('path');
const sharp = require('sharp');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', (req, res) =>{
    res.send('Image processing in progress ...');
})

app.use(express.static(path.join(__dirname, 'public')));

// Defining the API endpoint to serve and resize the image
app.get('/api/images', async (req, res) => {
  try {
    // Getting query parameters with single quotes
    const filename = String(req.query.filename);
    const width = String(req.query.width);
    const height = String(req.query.height);

    // Replacing 'utilities/images' with the correct path of the images folder
    const imagePath = path.join(__dirname, 'utilities', 'images', `${filename}.jpg`);

    // Reading the image
    const imageBuffer = await sharp(imagePath)
      .resize(parseInt(width), parseInt(height))
      .toBuffer();

    // Setting the content type to 'image/jpeg' 
    res.contentType('image/jpeg');
    // Sending the resized image data as the response
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, ()=> {
    console.log(`server started at localhost:${port}`)
});

console.log("hello world");