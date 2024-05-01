export interface IUser {
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
  user: {
    username: string;
    email: string;
    type: string;
    _id: string;
    __v: number;
  };
  token: string;
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
