import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { CartContext } from "../contexts/CartContext";
import { Button } from "./ui/button";
import { Receipt, X } from "lucide-react";

export const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  return (
    <>
      {cart && cart?.length > 0 ? (
        <Table className="w-full h-full text-center">
          <TableHeader>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price per unit</TableHead>
            <TableHead>Total price</TableHead>
            <TableHead>Action</TableHead>
          </TableHeader>

          <TableBody>
            {cart?.map((x) => (
              <TableRow>
                <TableCell>
                  <img src={x.product.contentUrls[0]} />
                </TableCell>
                <TableCell>
                  <p>{x.product.name}</p>
                </TableCell>
                <TableCell>
                  <p>{x.quantity}</p>
                </TableCell>
                <TableCell>
                  <p>{x.product.price}</p>
                </TableCell>
                <TableCell>
                  <p>{(x.product.price * x.quantity).toFixed(2)}$</p>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size={"icon"}
                    onClick={() => removeFromCart(x.product)}
                  >
                    <X />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="w-full">
            <TableRow className="w-full">
              <TableCell colSpan={6}>
                <p className="flex justify-between w-full">
                  <span>Total price:</span>{" "}
                  <span className="font-semibold text-lg">
                    {total?.toFixed(2)}$
                  </span>
                </p>
              </TableCell>
            </TableRow>
            <TableRow className="w-full">
              <TableCell colSpan={6}>
                <div className="w-full flex justify-end">
                  <Button asChild>
                    <div className="flex gap-2">
                      <p>Checkout</p>
                      <Receipt />
                    </div>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <p>No added products in cart yet!</p>
      )}
    </>
  );
};
