import { IUser, UserLoginData } from "../Interfaces/User.interface";
import * as api from "./api";

const endpoints = {
  //auth
  register: "auth/register",
  login: "auth/login",
};

// --AUTH--
export const register = (body: IUser) => {
  return api.post(endpoints.register, body);
};

export const login = (body: UserLoginData) => {
  return api.post(endpoints.login, body);
};
