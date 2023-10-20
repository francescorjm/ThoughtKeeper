import supertest, { type SuperTest } from 'supertest';

import { app, server } from '../index';
import { type IUser, type UserLogin, type UserRegister } from 'src/@types/User';
import User from '@models/users.model';

const api: SuperTest<supertest.Test> = supertest(app);

const initialUsers: IUser[] = [
  {
    username: 'Juanito123',
    firstname: 'Juan',
    lastname: 'Nito',
    password: 'juanitooooooo123'
  },
  {
    username: 'Rafaelito',
    firstname: 'Rafa',
    lastname: 'Lito',
    password: 'rafalitooooooo123'
  }
];

beforeEach(async () => {
  await User.deleteMany({});

  for (const user of initialUsers) {
    const userObj = new User(user);
    await userObj.save();
  }
});

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

  it('should add a user to database if input is of type UserRegister', async () => {
    await api
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send(newUser);

    const response = await api.get('/api/users');

    expect(response.body).toHaveLength(initialUsers.length + 1);
    expect(response.body).toContain(newUser);
  });

  it('should not add something to database if input is not of type UserRegister', async () => {
    await api
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({})
      .expect(400);

    const response = await api.get('/api/users');

    expect(response.body).toHaveLength(initialUsers.length);
    for (const user of initialUsers) {
      expect(response.body).toContain(user);
    }
  });
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
