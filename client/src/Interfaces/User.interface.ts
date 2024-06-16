import { IOrder } from "./Order.interface";
import { IProduct } from "./Product.interface";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  rePassword?: string;
  type: 'buyer' | 'farmer' | 'deliverer' | 'admin';
  products?: IProduct[];
  VerifiedStatus?: 'Verified' | 'Pending' | 'Non-verified';
  marketplaceSettings?: IMarketplaceSettings;
  orders?: string[]; // Assuming orders are represented by their IDs
  savedProducts?: string[];
  availableForDelivery?: boolean;
  assignedDeliveries?: string[];
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
  _id: string;
  username: string;
  email: string;
  token: string;
  password?: string;
  rePassword?: string;
  type: 'buyer' | 'farmer' | 'deliverer' | 'admin';

  
  VerifiedStatus?: 'Verified' | 'Pending' | 'Non-verified';
  
  //seller
  products?: IProduct[];
  marketplaceSettings?: IMarketplaceSettings;
  
  //buyer
  orders?: IOrder[]; // Assuming orders are represented by their IDs
  savedProducts?: string[];

  //deliverer
  availableForDelivery?: boolean;
  assignedDeliveries?: string[];
}

// export interface AuthenticationResponse {
//   _id: string;
//   username: string;
//   email: string;
//   type: 'buyer' | 'farmer' | 'deliverer' | 'admin';
//   products?: IProduct[];
//   VerifiedStatus?: 'Verified' | 'Pending' | 'Non-verified';
//   marketplaceSettings?: IMarketplaceSettings;
//   orders?: string[]; // Assuming orders are represented by their IDs
//   savedProducts?: string[];
//   availableForDelivery?: boolean;
//   assignedDeliveries?: string[];
// }


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
