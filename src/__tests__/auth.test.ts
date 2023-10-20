import supertest, { type SuperTest } from 'supertest';
import bcrypt from 'bcrypt';

import { app, server } from '../index';
import { type IUser, type UserLogin, type UserRegister } from 'src/@types/User';
import User from '@models/users.model';
import mongoose from 'mongoose';

const api: SuperTest<supertest.Test> = supertest(app);

jest.mock('bcrypt');

const initialUsers: IUser[] = [
  {
    user_name: 'Juanito123',
    first_name: 'Juan',
    last_name: 'Nito',
    password: 'juanitooooooo123'
  },
  {
    user_name: 'Rafaelito',
    first_name: 'Rafa',
    last_name: 'Lito',
    password: 'rafalitooooooo123'
  }
];

beforeEach(async () => {
  await User.deleteMany({});

  for (const user of initialUsers) {
    const userObj = new User(user);
    await userObj.save();
  }
  jest.clearAllMocks();
});

describe('Register endpoint', () => {
  const newUser: UserRegister = {
    user_name: 'donatobm',
    first_name: 'Donato',
    last_name: 'Bevilacqua',
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
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });

  it('should add a user to database if input is of type UserRegister', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

    await api
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send(newUser)
      .expect(201);

    const users = await User.find({});

    expect(users).toHaveLength(initialUsers.length + 1);

    const addedUser = users.find(
      (user) => user.user_name === newUser.user_name
    );

    expect(addedUser).toBeDefined();
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
  });

  it('should not add something to database if input is not of type UserRegister', async () => {
    const response = await api
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ msg: 'Invalid User Data' });

    const users = await User.find({}).select('-_id -password');
    const copyInitialUsers: Array<{
      user_name: string;
      first_name: string;
      last_name: string;
    }> = initialUsers.map((user) => {
      const { password, ...data } = user;
      return data;
    });

    expect(users).toHaveLength(initialUsers.length);
    expect(users).toEqual(
      expect.arrayContaining(
        copyInitialUsers.map((user) => expect.objectContaining(user))
      )
    );
  });
});

describe.skip('Login endpoint', () => {
  const user: UserLogin = {
    user_name: 'donatobm',
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

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => {
  server.close();
  await mongoose.connection.close();
});
