import { Dispatch, SetStateAction, useContext } from "react";
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
import { CircleCheckBig } from "lucide-react";
import { MapComponent } from "../../MapComponent/MapComponent";
import { OrderDto } from "../../../Interfaces/Order.interface";
import { Textarea } from "../../ui/textarea";

export const CheckoutStep = ({
  checkoutData,
  handleCheckout,
  setCheckoutStep,
}: {
  checkoutData: OrderDto;
  handleCheckout: () => void;
  setCheckoutStep: Dispatch<SetStateAction<number>>;
}) => {
  const { cart, totalCp } = useContext(CartContext);
  return (
    <div className="h-full flex flex-col justify-between select-none">
      <div className="flex flex-col gap-4 text-muted-foreground">
        <h1 className="text-center text-xl font-semibold uppercase tracking-widest text-black">
          Checkout
        </h1>

        <div>
          <div>
            <Table className="w-full h-full text-center">
              <TableHeader>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>

                <TableHead>Total price</TableHead>
              </TableHeader>

              <TableBody>
                {cart?.map((x) => (
                  <TableRow>
                    <TableCell className="w-[20%] opacity-60">
                      <img src={x.product.contentUrls[0]} draggable={false} />
                    </TableCell>
                    <TableCell>
                      <p>{x.product.name}</p>
                    </TableCell>
                    <TableCell>
                      <p>{x.quantity}</p>
                    </TableCell>
                    <TableCell>
                      <p>{(x.product.price * x.quantity).toFixed(2)}$</p>
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
              </TableFooter>
            </Table>
          </div>
        </div>

        <div>
          <div>
            <h2 className="text-lg font-medium">Delivery instructions</h2>
            <Textarea
              className="resize-y h-auto  w-full"
              readOnly
              disabled
              value={checkoutData.deliveryNote}
            />
          </div>
        </div>
        <MapComponent
          location={checkoutData.deliveryAddress}
          mapCenterValues={[
            checkoutData.deliveryAddress.latitude,
            checkoutData.deliveryAddress.longitude,
          ]}
          zoom={15}
          disabled
        />
      </div>

      <Button
        className="flex items-center justify-center gap-2 w-fit mx-auto px-10"
        onClick={() => {
          setCheckoutStep((prevState) => prevState + 1);
          handleCheckout()
        }}
      >
        <p>Complete order</p>
        <CircleCheckBig />
      </Button>
    </div>
  );
};
