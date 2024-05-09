import { IProduct } from "./Product.interface";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  rePassword: string;
  type: string;
  products: IProduct[];
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData {
  username: string;
  email: string;
  password: string;
  rePassword: string;
  type: string;
}

export interface IUserDto {
  username: string;
  email: string;
  type: string;
  _id: string;
  __v: number;
  password?: string;
  rePassword?: string;
}

export interface AuthenticationResponse {
  username: string;
  email: string;
  type: string;
  _id: string;
  __v: number;
  token: string;
}

export interface IMarketplaceSettings {
  documents: File[] | null;
}

export interface RequestVerification {
  documents: File[] | null;
  sellerLocation: {
    latitude: number;
    longitude: number;
  }
}