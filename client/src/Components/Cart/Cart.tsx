import { useContext, useState } from "react";

import { AddressStep } from "./pages/AddressStep";
import { ArrowLeft } from "lucide-react";
import { CartContext } from "../../contexts/CartContext";
import { CheckoutStep } from "./pages/CheckoutStep";
import { CompletedOrder } from "./pages/CompletedOrder";
import { DialogContent } from "../ui/dialog";
import { IOrderSlim } from "../../Interfaces/Order.interface";
import { InitialStep } from "./pages/InitialStep";
import { Progress } from "../ui/progress";
import { putOrder } from "../../api/requests";
import { toast } from "../ui/Toast/use-toast";
import useFormData from "../../hooks/useForm";

export const Cart = ({ closeCart }: { closeCart: () => void }) => {
  const { cart, clearCart } = useContext(CartContext);

  const [checkoutData, setCheckoutData] = useFormData<IOrderSlim>({
    deliveryAddress: {
      latitude: 0,
      longitude: 0,
    },
    deliveryNote: "",
  });

  const [checkoutStep, setCheckoutStep] = useState<number>(0);

  const handleCheckout = async () => {
    await putOrder({orderedItems: cart, ...checkoutData});
    clearCart();
    closeCart();

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
    <InitialStep setCheckoutStep={setCheckoutStep} />,
    <AddressStep
      setCheckoutStep={setCheckoutStep}
      handleSetLocation={handleSetLocation}
      location={checkoutData.deliveryAddress}
      setCheckoutData={setCheckoutData}
    />,
    <CheckoutStep
      checkoutData={{...checkoutData, orderedItems: cart}}
      handleCheckout={handleCheckout}
      setCheckoutStep={setCheckoutStep}
    />,
    <CompletedOrder />,
  ];

  return (
    <DialogContent
      className={`${
        cart && cart?.length > 0 ? "h-full" : "h-fit"
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
            value={((checkoutStep + 1) / checkoutStepsComponents.length) * 100}
            className="w-[70%]"
          />
        </div>
      )}

      {checkoutStepsComponents.map(
        (StepComponent, index) => checkoutStep === index && StepComponent
      )}
    </DialogContent>
  );
};
