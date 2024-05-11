import { useContext, useState } from "react";
import { InputGroup } from "../../../Components/InputGroup";
import { MapComponent } from "../../../Components/MapComponent/MapComponent";
import { IMarketplaceSettingsDto } from "../../../Interfaces/User.interface";
import useFormData from "../../../hooks/useForm";
import { Button } from "../../../Components/ui/button";
import { requestVerification } from "../../../api/requests";
import { toast } from "../../../Components/ui/Toast/use-toast";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../Components/ui/alert";

export const MarketplaceSettings = () => {
  const { user } = useContext(AuthContext);
  const [verificationData, setVerificationData] =
    useFormData<IMarketplaceSettingsDto>({
      documents: null,

      latitude: 0,
      longitude: 0,
    });

  const [isResending, setIsResending] = useState<boolean>(false);

  const handleSetLocation = (location: {
    latitude: number;
    longitude: number;
  }) => {
    setVerificationData({
      id: "sellerLocation",
      value: location,
    });
  };

  const handleSubmit = async () => {
    if (!verificationData || !verificationData.documents) {
      toast({ title: "Needed information missing!" });
      return;
    }

    const result = await requestVerification(verificationData);
  };

  return (
    <div className="relative">
      {user?.VerifiedStatus === "Pending" && !isResending && (
        <Alert className="absolute z-50 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
          <AlertTitle className="text-lg">
            Request currently awaiting review
          </AlertTitle>
          <AlertDescription className="w-full flex flex-col gap-3">
            <p className="text-lg">
              Sending another request will reset the wait time!
            </p>
            <Button className="w-1/2 mx-auto flex" variant="destructive" onClick={() => setIsResending(true)}>
              Send another request
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div
        className={`flex flex-col gap-4 ${
          user?.VerifiedStatus === "Pending" && !isResending
            ? "blur-sm pointer-events-none select-none"
            : ""
        }`}
      >
        <InputGroup
          label="Documents"
          placeHolder=""
          onChange={setVerificationData}
          id="documents"
          type="file"
          multiple
        />

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">Choose pickup location:</h2>
          <MapComponent
            handleSetLocation={handleSetLocation} // Pass the handleSetLocation function
            location={{
              longitude: verificationData.longitude,
              latitude: verificationData.latitude,
            }}
          />
        </div>

        <Button className="py-6 text-md" onClick={handleSubmit}>
          Submit review
        </Button>
      </div>
    </div>
  );
};
