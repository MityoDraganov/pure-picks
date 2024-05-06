import * as api from "./api";

import { OrderDto } from "../Interfaces/Order.interface";
import { ProductMutableData } from "../Interfaces/Product.interface";
import { UserLoginData, UserRegisterData } from "../Interfaces/User.interface";
import { ICart } from "../Interfaces/Cart.interface";

const endpoints = {
  //auth
  register: "auth/register",
  login: "auth/login",

  //products
  products: (sellerId: string | null) => sellerId ?  `products?seller=${sellerId}` :"products",

  //orders
  orders: "orders"
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
  return api.get(endpoints.products(sellerId))
}

export const createProduct = (data: ProductMutableData) => {
  return api.post(endpoints.products(null), data, "formData")
}

// --ORDERS--

export const getOrdersForBuyer = () => {
  return api.get(endpoints.orders)
}

export const putOrder = (data: ICart[] | null) => {
  console.log(data);
  
  return api.post(endpoints.orders, {orderedItems: data})
}