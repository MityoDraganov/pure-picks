import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { PowerOff, Truck } from "lucide-react";
import { makeAvaliable, makeUnAvaliable } from "../../../api/requests";

import { AuthContext } from "../../../contexts/AuthContext";
import { Button } from "../../ui/button";
import { useContext } from "react";

export const DeliveryTrigger = () => {
  const { user, setAdditionalData } = useContext(AuthContext);

  const handleMakeAvaliableForDeliveries = async () => {
    await makeAvaliable();
    setAdditionalData("availableForDelivery", true);
  };

  const handleMakeUnAvaliableForDeliveries = async () => {
    await makeUnAvaliable();
    setAdditionalData("availableForDelivery", false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-[15%]">
        {!user?.availableForDelivery ? (
          <Button
            variant="blue"
            size="icon"
            className="w-full flex gap-2 items-center justify-center"
          >
            Go avaliable <Truck />
          </Button>
        ) : (
          <Button
            variant="destructive"
            size="icon"
            className="w-full flex gap-2 items-center justify-center"
          >
            Go un-avaliable <PowerOff />
          </Button>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {!user?.availableForDelivery ? (
              <p>Are you sure that you want to go avaliable for deliveries?</p>
            ) : (
              <p>
                Are you sure that you want to go Un-Avaliable for deliveries?
              </p>
            )}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          {!user?.availableForDelivery ? (
            <AlertDialogAction onClick={handleMakeAvaliableForDeliveries}>
              <p>Go avaliable</p>
            </AlertDialogAction>
          ) : (
            <AlertDialogAction onClick={handleMakeUnAvaliableForDeliveries} className="bg-destructive">
              <p>Go Un-Avaliable</p>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
