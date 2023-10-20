export interface IUser {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

export type UserRegister = IUser;
export type UserLogin = Omit<IUser, 'firstname' | 'lastname'>;
