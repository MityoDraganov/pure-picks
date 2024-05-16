import { ICart } from "./Cart.interface";
import { IProduct } from "./Product.interface";
import { IUser } from "./User.interface";

export interface OrderDto {
  orderedItems: ICart[] | null;

  deliveryAddress: {
    latitude: number;
    longitude: number;
  };
  deliveryNote: string;
}

export interface IOrderSlim {
    deliveryAddress: {
      latitude: number;
      longitude: number;
    };
    deliveryNote: string;
}

export interface IOrder {
  buyer: IUser;
  orderedItems: [
    {
      product: IProduct;
      quantity: number;
    }
  ];
  putDate: Date;
  status: string;
  __v: number;
  _id: string;
  totalCp: number;
}
