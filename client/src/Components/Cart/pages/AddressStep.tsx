import { Dispatch, SetStateAction } from "react";

import { ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";
import { FormDataChangeEvent } from "../../../hooks/useForm";
import { MapComponent } from "../../MapComponent/MapComponent";
import { Textarea } from "../../ui/textarea";

// Import the type

interface AddressStepProps {
  handleSetLocation: (location: {
    latitude: number;
    longitude: number;
  }) => void;
  setCheckoutData: (e: FormDataChangeEvent) => void; // Update the type
  setCheckoutStep: Dispatch<SetStateAction<number>>;
  location: { latitude: number; longitude: number };
}

export const AddressStep = ({
  location,
  handleSetLocation,
  setCheckoutStep,
  setCheckoutData, // Include setCheckoutData in the destructuring
}: AddressStepProps) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-medium">Pick address for delivery</h2>
          <MapComponent
            handleSetLocation={handleSetLocation}
            location={location}
          />
        </div>
        <div>
          <h2 className="text-lg font-medium">Delivery instructions</h2>
          <Textarea
            className="resize-y h-auto w-full"
            onChange={setCheckoutData}
            id="deliveryNote"
          />
        </div>
      </div>
      <Button
        className="flex items-center justify-center gap-2 w-fit mx-auto px-10"
        onClick={() => setCheckoutStep((prevState) => prevState + 1)}
      >
        <p>Continue</p>
        <ArrowRight />
      </Button>
    </div>
  );
};
