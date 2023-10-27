import User from '@models/users.model';
import { type Request, type Response } from 'express';
import joi from 'joi';
import createToken from '../helpers/tokenHandler';
import { comparePassword } from 'src/helpers/passwordChecker';

const registerSchema = joi.object({
  user_name: joi.string().required(),
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  password: joi.string().required()
});

const loginSchema = joi.object({
  user_name: joi.string().required(),
  password: joi.string().required()
});

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error, value } = registerSchema.validate(req.body);

  if (error != null) {
    return res.status(400).json({ msg: 'Invalid User Data' });
  }

  const user = await User.findOne({ user_name: value.user_name });
  if (user !== null) {
    return res.status(400).json({ msg: 'This user already exists' });
  }

  const newUser = new User(value);
  const response = await newUser.save();

  const token: string = createToken({
    user_name: response.user_name,
    first_name: response.first_name,
    last_name: response.last_name
  });

  return res.status(201).json({
    msg: 'User Created!',
    user: {
      user_name: response.user_name,
      first_name: response.first_name,
      last_name: response.last_name
    },
    token
  });
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error, value } = loginSchema.validate(req.body);

  if (error != null) {
    return res.status(400).json({ msg: 'Invalid User Data' });
  }

  const user = await User.findOne({ user_name: value.user_name });
  if (user === null) {
    return res.status(400).json({ msg: 'This user does not exists' });
  }

  const samePassword = await comparePassword(value.password, user.password);
  if (!samePassword) {
    return res.status(400).json({ msg: 'Wrong password' });
  }

  const token: string = createToken({
    user_name: user.user_name,
    first_name: user.first_name,
    last_name: user.last_name
  });

  return res.status(200).json({
    user: {
      user_name: user.user_name,
      first_name: user.first_name,
      last_name: user.last_name
    },
    token
  });
};
