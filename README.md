# Image Processing API

This is a Node.js and Express API for resizing images using the Sharp library. The API provides an endpoint to resize images based on user-specified parameters and includes caching functionality to optimize performance.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Example](#example)
- [Configuration](#configuration)
- [Testing](#testing)
- [Linting and Formatting](#linting-and-formatting)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js installed on your machine

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dfvalenciav/image_processing_app.git


## Usage

### API Endpoints

- To load images and resize them you can use the following endpoint http://localhost:3000/api/images?filename=filename&width=500&height=500
-- filename is the name of the image that you want to load, those preloaded images are located on utilities/images folder
-- width and height are the corresponding values taht you want to use to resize images

### Example
     http://localhost:3000/api/images?filename=palmtunnel&width=500&height=500


## Configuration

Use script npm run start to start express server

## Testing

Use script npm run test to evaluate the set of test designed to evaluate this project 

## linting-and-formatting
Use script npm run formant and lint to format code

## Contributing

Feel free to do contributions to the project all ideas are welcome!

## License

MIT License