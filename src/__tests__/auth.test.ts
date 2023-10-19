import supertest, { type SuperTest } from 'supertest';
import { app, server } from '../index';

const api: SuperTest<supertest.Test> = supertest(app);

describe('Register endpoint', () => {
  it('should receive user info as json', async () => {
    await api
      .post('/api/auth/register')
      .expect('Content-Type', /application\/json/);
  });

  it('should return user info as json', async () => {
    await api
      .post('/api/auth/register')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('Login endpoint', () => {
  it('should receive user info as json', async () => {
    await api
      .post('/api/auth/register')
      .expect('Content-Type', /application\/json/);
  });

  it('should return user info as json', async () => {
    await api
      .post('/api/auth/login')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  server.close();
});
