export interface IUser {
  user_name: string;
  first_name: string;
  last_name: string;
  password: string;
}

export type UserRegister = IUser;
export type UserLogin = Omit<IUser, 'first_name' | 'last_name'>;
