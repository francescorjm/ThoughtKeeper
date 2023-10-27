import jwt from 'jsonwebtoken';
import { type UserResponse } from 'src/@types/User';

const createToken = (user: UserResponse): string => {
  return jwt.sign(
    { user_name: user.user_name },
    process.env.JWT_SECRET ?? 'secret',
    {
      expiresIn: '7h'
    }
  );
};

export default createToken;
