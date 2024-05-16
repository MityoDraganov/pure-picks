import { Dispatch, SetStateAction, useContext } from "react";
import { Receipt, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { Button } from "../../ui/button";
import { CartContext } from "../../../contexts/CartContext";

interface InitialStepProps {
  setCheckoutStep: Dispatch<SetStateAction<number>>;
}

export const InitialStep = ({ setCheckoutStep }: InitialStepProps) => {
  const { cart, totalCp, removeFromCart } = useContext(CartContext);

  return (
    <div
      className={`${
        cart && cart?.length > 0 ? "h-full" : "h-fit"
      } p-6 overflow-hidden`}
    >
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
                      {totalCp?.toFixed(2)}$
                    </span>
                  </p>
                </TableCell>
              </TableRow>
              <TableRow className="w-full">
                <TableCell colSpan={6}>
                  <div className="w-full flex justify-end">
                    <Button onClick={() => setCheckoutStep(1)}>
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
    </div>
  );
};
