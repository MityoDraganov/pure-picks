import { ArrowLeft, ShoppingCart } from "lucide-react";
import { DialogContent, DialogTrigger } from "../ui/dialog";
import { useContext, useState } from "react";

import { AddressStep } from "./pages/AddressStep";
import { Button } from "../ui/button";
import { CartContext } from "../../contexts/CartContext";
import { CheckoutStep } from "./pages/CheckoutStep";
import { CompletedOrder } from "./pages/CompletedOrder";
import { Dialog } from "@radix-ui/react-dialog";
import { IOrderSlim } from "../../Interfaces/Order.interface";
import { InitialStep } from "./pages/InitialStep";
import { Progress } from "../ui/progress";
import { putOrder } from "../../api/requests";
import { toast } from "../ui/Toast/use-toast";
import useFormData from "../../hooks/useForm";

export const Cart = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const [checkoutData, setCheckoutData] = useFormData<IOrderSlim>({
    deliveryAddress: {
      latitude: 0,
      longitude: 0,
      locationName: "",
    },
    deliveryNote: "",
  });

  const [checkoutStep, setCheckoutStep] = useState<number>(0);

  const handleCheckout = async () => {
    await putOrder({ orderedItems: cart, ...checkoutData });
    clearCart();

    toast({ title: "Order successfully put!" });
  };

  const handleSetLocation = (location: {
    latitude: number;
    longitude: number;
  }) => {
    setCheckoutData({
      id: "deliveryAddress",
      value: location,
    });
  };

  const checkoutStepsComponents = [
    <InitialStep setCheckoutStep={setCheckoutStep} key="InitialStep" />,
    <AddressStep
      setCheckoutStep={setCheckoutStep}
      handleSetLocation={handleSetLocation}
      location={checkoutData.deliveryAddress}
      setCheckoutData={setCheckoutData}
      key="AddressStep"
    />,
    <CheckoutStep
      checkoutData={{ ...checkoutData, orderedItems: cart }}
      handleCheckout={handleCheckout}
      setCheckoutStep={setCheckoutStep}
      key="CheckoutStep"
    />,
    <CompletedOrder key="CompletedOrder" />,
  ];



  return (
    <Dialog
      open={isCartOpen}
      onOpenChange={() => {
        setIsCartOpen(!isCartOpen);
        setCheckoutStep(0);
      }}
    >
      <DialogTrigger>
        <Button size="icon" variant="secondary" className="relative">
          <ShoppingCart />

          <span className="absolute -right-1 -top-1 bg-red-400 rounded-full text-slate-100 flex items-center justify-center w-5 h-5    text-xs">
            {cart?.length}
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className={`${
          cart && cart?.length > 0 ? "h-[95%]" : "h-fit"
        } p-6 overflow-hidden flex flex-col gap-10`}
      >
        {checkoutStep !== checkoutStepsComponents.length - 1 && (
          <div className="flex h-fit items-center relative">
            <div className="flex w-[20%] justify-start pl-2 items-center">
              <ArrowLeft
                onClick={() => setCheckoutStep(checkoutStep - 1)}
                className={`hover:cursor-pointer ${
                  checkoutStep > 0 ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            <Progress
              value={
                ((checkoutStep + 1) / checkoutStepsComponents.length) * 100
              }
              className="w-[70%]"
            />
          </div>
        )}

        {checkoutStepsComponents.map(
          (StepComponent, index) => checkoutStep === index && StepComponent
        )}
      </DialogContent>
    </Dialog>
  );
};
