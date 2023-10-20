import { type Request, type Response } from 'express';

export const signUp = async (_: Request, res: Response): Promise<Response> => {
  return res.json({ msg: 'qlo' });
};

export const signIn = async (_: Request, res: Response): Promise<Response> => {
  return res.json({ msg: 'qlo' });
};
