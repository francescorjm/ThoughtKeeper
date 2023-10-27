import bcrypt from 'bcrypt';

export const comparePassword = async (
  password: string,
  oldPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, oldPassword);
};
