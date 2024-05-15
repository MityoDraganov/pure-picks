import { useContext, useState } from "react";

import { CartContext } from "../../contexts/CartContext";
import { Button } from "../ui/button";
import { ArrowLeft, Receipt, X } from "lucide-react";
import { DialogContent } from "../ui/dialog";
import { putOrder } from "../../api/requests";
import { toast } from "../ui/Toast/use-toast";

//step pages
import { AddressStep } from "./pages/AddressStep";
import { CheckoutDto } from "../../Interfaces/Checkout.interface";
import useFormData from "../../hooks/useForm";
import { InitialStep } from "./pages/InitialStep";
import { Progress } from "../ui/progress";

export const Cart = ({ closeCart }: { closeCart: () => void }) => {
  const [checkoutData, setCheckoutData] = useFormData<CheckoutDto>({
    buyerLocation: {
      latitude: 0,
      longitude: 0,
    },
  });

  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const [checkoutStep, setCheckoutStep] = useState<number>(0);

  const handleCheckout = async () => {
    await putOrder(cart);
    clearCart();
    closeCart();

    toast({ title: "Order successfully put!" });
  };

  const handleSetLocation = (location: {
    latitude: number;
    longitude: number;
  }) => {
    console.log("her");

    setCheckoutData({
      id: "buyerLocation",
      value: location,
    });
  };

  const checkoutStepsComponents = [
    <InitialStep setCheckoutStep={setCheckoutStep} />,
    <AddressStep
      handleSetLocation={handleSetLocation}
      location={checkoutData.buyerLocation}
    />,
  ];

  return (
    <DialogContent
      className={`${
        cart && cart?.length > 0 ? "h-full" : "h-fit"
      } p-6 overflow-hidden`}
    >
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
          value={(checkoutStep / checkoutStepsComponents.length) * 100}
          className="w-[70%]"
        />
      </div>
      {checkoutStepsComponents.map(
        (StepComponent, index) => checkoutStep === index && StepComponent
      )}
    </DialogContent>
  );
};
