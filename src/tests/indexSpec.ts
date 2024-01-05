import request from 'supertest';
import app from '../index'; // Assuming your app.ts is in the root folder

describe('Test to verify endpoint and resize image', () => {
  it('GET /api/images should return a resized image', async () => {
    const response = await request(app)
      .get('/api/images?filename=palmtunnel&width=100&height=100')
      .expect(200);

    // Add more assertions as needed
    expect(response.headers['content-type']).toEqual('image/jpeg');
    expect(response.body).toBeDefined();
  });
});

describe('Test to manage error handling', () => {
  it('should handle error when resizing image fails', async () => {
    // Make a request with invalid parameters to trigger an error in sharpModule
    await request(app)
      .get('/api/images?filename=nonexistent&width=100&height=100')
      .expect(500, 'Internal Server Error');
  });
});

describe('Image Cache Tests', () => {
  it('should return the same cached image for identical resizing parameters', async () => {
    // Make two requests with the same resizing parameters
    const response1 = await request(app)
      .get('/api/images?filename=palmtunnel&width=200&height=300')
      .expect(200);

    const response2 = await request(app)
      .get('/api/images?filename=palmtunnel&width=200&height=300')
      .expect(200);

    // Expect that the content of both responses is the same (indicating the same cached image)
    expect(response1.body).toEqual(response2.body);
  });

  it('should return different images for different resizing parameters', async () => {
    // Make two requests with different resizing parameters
    const response1 = await request(app)
      .get('/api/images?filename=palmtunnel&width=200&height=300')
      .expect(200);

    const response2 = await request(app)
      .get('/api/images?filename=palmtunnel&width=400&height=600')
      .expect(200);

    // Expect that the content of both responses is different (indicating different images)
    expect(response1.body).not.toEqual(response2.body);
  });
});
