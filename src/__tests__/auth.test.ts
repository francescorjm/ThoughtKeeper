import supertest, { type SuperTest } from 'supertest';

import { app, server } from '../index';
import { type UserLogin, type UserRegister } from 'src/@types/User';

const api: SuperTest<supertest.Test> = supertest(app);

describe('Register endpoint', () => {
  const newUser: UserRegister = {
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
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });

  it('should return user info as json', async () => {
    await api
      .post('/api/auth/register')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('should add a user to database if input is of type UserRegister', async () => {});

  it('should not add something to database if input is not of type UserRegister', async () => {});
});

describe('Login endpoint', () => {
  const user: UserLogin = {
    username: 'donatobm',
    password: 'aeiou11111'
  };

  it('should receive user info as json', async () => {
    await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send(user)
      .expect('Content-Type', /application\/json/);
  });

  it('should return user info as json', async () => {
    await api
      .post('/api/auth/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  server.close();
});
