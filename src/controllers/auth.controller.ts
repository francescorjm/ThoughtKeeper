import User from '@models/users.model';
import { type Request, type Response } from 'express';
import joi from 'joi';

const schema = joi.object({
  user_name: joi.string().required(),
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  password: joi.string().required()
});

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error, value } = schema.validate(req.body);

  if (error != null) {
    return res.status(400).json({ msg: 'Invalid User Data' });
  }

  const user = await User.findOne({ user_name: value.user_name });
  console.log(user);
  if (user !== null) {
    return res.status(400).json({ msg: 'This user already exists' });
  }

  const newUser = new User(value);
  await newUser.save();

  return res.status(201).json({ msg: 'User Created!', user: newUser });
};

export const signIn = async (_: Request, res: Response): Promise<Response> => {
  return res.json({ msg: 'qlo' });
};
