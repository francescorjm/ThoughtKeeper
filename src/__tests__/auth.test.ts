import supertest, { type SuperTest } from 'supertest';
import { app, server } from '../index';
import type IUser from 'src/@types/User';

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
  const newUser: IUser = {
    username: 'donatobm',
    firstname: 'Donato',
    lastname: 'Bevilacqua',
    password: 'aeiou11111'
  };

  it('should receive user info as json', async () => {
    await api
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send(newUser)
      .expect('Content-Type', /application\/json/);
  });

  it('should return user info as json', async () => {
    await api
      .post('/api/auth/register')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe.skip('Login endpoint', () => {
  it('should receive user info as json', async () => {
    await api
      .post('/api/auth/login')
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
