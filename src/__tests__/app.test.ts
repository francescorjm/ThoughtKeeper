import request from 'supertest';
import app from '../server';

describe('Testing if this shit works', () => {
  it('should return a "qlq" message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('qlq');
  });
});
