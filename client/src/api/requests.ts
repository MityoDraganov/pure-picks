import * as api from "./api";

import {
  IMarketplaceSettingsDto,
  UserLoginData,
  UserRegisterData,
} from "../Interfaces/User.interface";

import { OrderDto } from "../Interfaces/Order.interface";
import { ProductMutableData } from "../Interfaces/Product.interface";

const endpoints = {
  //auth
  auth: (path: string | undefined) => `auth/${path}`,

  //products
  productsBySeller: (sellerId: string) => `products?seller=${sellerId}`,
  products: (productId: string | null | undefined) =>
    productId ? `products/${productId}` : "products",

  favourite: (productId: string) => `products/favourite/${productId}`,

  //orders
  orders: "orders",

  //deliveries
  deliveries: (avaliable: boolean) =>
    "deliveries/deliverer/" + (avaliable ? "makeAvaliable" : "makeUnAvaliable"),

  acceptOrder: (orderId: string) =>
    `deliveries/deliverer/acceptOrder/${orderId}`,
};

// --AUTH--
export const register = (body: UserRegisterData) => {
  return api.post(endpoints.auth("register"), body);
};

export const login = (body: UserLoginData) => {
  return api.post(endpoints.auth("login"), body);
};

export const getProfileData = (userId: string | undefined) => {
  return api.get(endpoints.auth(userId));
};

export const requestVerification = (body: IMarketplaceSettingsDto) => {
  return api.post(endpoints.auth("verification/request"), body, "formData");
};

// --PRODUCTS--

export const getAllProducts = () => {
  return api.get(endpoints.products(null));
};

export const getProductsBySeller = (sellerId: string) => {
  return api.get(endpoints.productsBySeller(sellerId));
};

export const createProduct = (data: ProductMutableData) => {
  return api.post(endpoints.products(null), data, "formData");
};

export const editProduct = (data: ProductMutableData, productId: string | undefined) => {
  return api.patch(endpoints.products(productId), data, "formData");
};

export const deleteProduct = (productId: string  | undefined) => {
    return api.del(endpoints.products(productId));
}

export const addFavourite = (productId: string) => {
  return api.post(endpoints.favourite(productId));
};

export const removeFavourite = (productId: string) => {
  return api.del(endpoints.favourite(productId));
};

// --ORDERS--

export const getOrdersForBuyer = () => {
  return api.get(endpoints.orders);
};

export const putOrder = (data: OrderDto) => {
  return api.post(endpoints.orders, data);
};

// --DELIVERIES--
export const makeAvaliable = () => {
  return api.post(endpoints.deliveries(true));
};

export const makeUnAvaliable = () => {
  return api.post(endpoints.deliveries(false));
};

export const acceptOrder = (orderId: string) => {
  return api.post(endpoints.acceptOrder(orderId));
};
