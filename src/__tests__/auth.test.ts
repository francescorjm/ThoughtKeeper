import supertest, { type SuperTest } from 'supertest';
import { app, server } from '../index';

const api: SuperTest<supertest.Test> = supertest(app);

describe('Register', () => {
  it('should return user info as json', async () => {
    await api
      .post('/api/auth/register')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('Login', () => {
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
