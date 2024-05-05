import { IProduct } from "./Product.interface";
import { IUser } from "./User.interface";

export interface OrderDto {
    products: {
        product: IProduct;
        quantity: number;
    }[];
}

export interface IOrder {
    buyer: IUser;
    orderedItems: {
        product: IProduct;
        quantity: number;
    };
    putDate: Date
    status: string
    __v: number;
    _id: string;
}
