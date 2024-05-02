import { IUser } from "./User.interface";

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
  contentUrls: string[];
  seller: IUser;
  ratings: number[];
}
