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
  VerifiedStatus: string;
  marketplaceSettings: IMarketplaceSettings;
}

export interface AuthenticationResponse {
  username: string;
  email: string;
  type: string;
  _id: string;
  __v: number;
  token: string;
  products: IProduct[];
  VerifiedStatus: string;
  marketplaceSettings: IMarketplaceSettings;
}

export interface IMarketplaceSettingsDto {
  documents: File[] | null;

  latitude: number;
  longitude: number;
}

export interface IMarketplaceSettings {
  _id: string;
  documents: string[] | null;

  sellerLocation: {
    latitude: number;
    longitude: number;
  };
}
