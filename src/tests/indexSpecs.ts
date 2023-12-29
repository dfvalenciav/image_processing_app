import request from 'supertest';
import app from '../index'; // Assuming your app.ts is in the root folder

describe('API Endpoint Tests', () => {
  it('GET /api/images should return a resized image', async () => {
    const response = await request(app)
      .get('/api/images?filename=test&width=100&height=100')
      .expect(200);

    // Add more assertions as needed
    expect(response.headers['content-type']).toEqual('image/jpeg');
    expect(response.body).toBeDefined();
  });

  // Add more test cases as needed
});