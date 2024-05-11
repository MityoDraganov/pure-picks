import { ArrowRight } from "lucide-react";
import { MapComponent } from "../../MapComponent/MapComponent";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";

interface AddressStepProps {
  handleSetLocation: (location: {
    latitude: number;
    longitude: number;
  }) => void;
  location: {
    latitude: number;
    longitude: number;
  };
}

export const AddressStep = ({
  location,
  handleSetLocation,
}: AddressStepProps) => {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-medium">Pick address for delivery</h2>
          <MapComponent
            handleSetLocation={handleSetLocation} // Pass the handleSetLocation function
            location={location}
          />
        </div>

        <div>
          <h2 className="text-lg font-medium">Delivery instructions</h2>
          <Textarea className="resize-y h-auto  w-full" />
        </div>
      </div>

      <Button className="flex items-center justify-center gap-2 w-fit mx-auto px-10">
        <p>Continue</p>
        <ArrowRight />
        </Button>
    </div>
  );
};
