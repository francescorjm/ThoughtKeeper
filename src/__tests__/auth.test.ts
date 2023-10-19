import supertest, { type SuperTest } from 'supertest';
import { app, server } from '../index';
// import type User from '../@types/User';

const api: SuperTest<supertest.Test> = supertest(app);

// const initialUsers: User[] = [
//   {
//     username: 'Vanilthas',
//     firstname: 'Daniel',
//     lastname: 'Leon',
//     password: 'LogicalThoughts199'
//   },
//   {
//     username: 'LadronDeOxigeno',
//     firstname: 'Carlos',
//     lastname: 'Portillo',
//     password: 'LogicalThoughts198'
//   }
// ];

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
