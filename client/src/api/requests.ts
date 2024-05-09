import * as api from "./api";

import { OrderDto } from "../Interfaces/Order.interface";
import { ProductMutableData } from "../Interfaces/Product.interface";
import { IMarketplaceSettings, RequestVerification, UserLoginData, UserRegisterData } from "../Interfaces/User.interface";
import { ICart } from "../Interfaces/Cart.interface";

const endpoints = {
    //auth
    auth: (path: string | undefined) => `auth/${path}`,

    //products
    products: (sellerId: string | null) =>
        sellerId ? `products?seller=${sellerId}` : "products",

    //orders
    orders: "orders",
};

// --AUTH--
export const register = (body: UserRegisterData) => {
    return api.post(endpoints.auth("register"), body);
};

export const login = (body: UserLoginData) => {
    return api.post(endpoints.auth("login"), body);
};

export const getProfileData = (userId: string | undefined) => {
    return api.get(endpoints.auth(userId))
};

export const requestVerification = (body: RequestVerification) => {
    return api.post(endpoints.auth("verification/request"), body, "formData")
}

// --PRODUCTS--

export const getAllProducts = () => {
    return api.get(endpoints.products(null));
};

export const getProductsBySeller = (sellerId: string) => {
    return api.get(endpoints.products(sellerId));
};

export const createProduct = (data: ProductMutableData) => {
    return api.post(endpoints.products(null), data, "formData");
};

// --ORDERS--

export const getOrdersForBuyer = () => {
    return api.get(endpoints.orders);
};

export const putOrder = (data: ICart[] | null) => {
    return api.post(endpoints.orders, { orderedItems: data });
};
