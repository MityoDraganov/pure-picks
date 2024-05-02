export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  rePassword: string;
  type: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface IUserDto {
  username: string;
  email: string;
  type: string;
  _id: string;
  __v: number;
}

export interface AuthenticationResponse {
  user: {
    username: string;
    email: string;
    type: string;
    _id: string;
    __v: number;
  };
  token: string;
}
