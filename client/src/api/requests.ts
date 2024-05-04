import { UserLoginData, UserRegisterData } from "../Interfaces/User.interface";
import * as api from "./api";

const endpoints = {
  //auth
  register: "auth/register",
  login: "auth/login",

  //products
  products: (sellerId: string | null) => sellerId ?  `products?seller=${sellerId}` :"products"
};

// --AUTH--
export const register = (body: UserRegisterData) => {
  return api.post(endpoints.register, body);
};

export const login = (body: UserLoginData) => {
  return api.post(endpoints.login, body);
};

// --PRODUCTS--

export const getAllProducts = () => {
  return api.get(endpoints.products(null))
}

export const getProductsBySeller = (sellerId: string) => {
  console.log('here');
  
  return api.get(endpoints.products(sellerId))
}

