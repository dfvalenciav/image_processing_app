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