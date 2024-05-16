import { createContext, useEffect, useState } from "react";

import { ICart } from "../Interfaces/Cart.interface";
import { IProduct } from "../Interfaces/Product.interface";

interface ICartContext {
  cart: ICart[] | null;
  addToCart: (product: IProduct, quantity: number) => void;
  removeFromCart: (product: IProduct) => void;
  editQuantity: (product: IProduct, quantity: number) => void;
  clearCart: () => void;
  totalCp: number;
}

export const CartContext = createContext<ICartContext>({} as ICartContext);

export function CartProvider(props: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ICart[]>([]);
  const [totalCp, setTotalCp] = useState<number>(0);

  useEffect(() => {
    // Load cart from local storage on component mount
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to local storage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));

    const total = cart?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    setTotalCp(total);
  }, [cart]);

  const addToCart = (product: IProduct, quantity: number) => {
    // Check if the product is already in the cart
    const existingItemIndex = cart?.findIndex(
      (item) => item.product._id === product._id
    );

    if (existingItemIndex !== undefined && existingItemIndex !== -1) {
      // If the product is already in the cart, update the quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // If the product is not in the cart, add it
      setCart((prevCart) => [...(prevCart || []), { product, quantity }]);
    }
  };

  const removeFromCart = (product: IProduct) => {
    if (!cart) return;
    const updatedCart = cart.filter((item) => item.product._id !== product._id);
    setCart(updatedCart);
  };

  const editQuantity = (product: IProduct, quantity: number) => {
    if (!cart) return;
    const updatedCart = cart.map((item) => {
      if (item.product._id === product._id) {
        return { ...item, quantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartContextValues: ICartContext = {
    cart,
    totalCp,
    addToCart,
    removeFromCart,
    editQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValues}>
      {props.children}
    </CartContext.Provider>
  );
}
