import { Avatar, AvatarImage } from "../../Components/ui/avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../../Components/ui/drawer";
import { useContext, useEffect } from "react";

import { Button } from "../../Components/ui/button";
import { DeliveriesContext } from "../../contexts/DeliveriesContext";
import { IOrder } from "../../Interfaces/Order.interface";
import { Label } from "../../Components/ui/label";
import { Textarea } from "../../Components/ui/textarea";
import useGeocoding from "../../hooks/useGeocoding";

export const Delivery = () => {
  const { channel, setAssignedOrder, assignedOrder } =
    useContext(DeliveriesContext);

  const { reversedLocation } = useGeocoding(
    assignedOrder?.deliveryAddress.latitude || 0,
    assignedOrder?.deliveryAddress.longitude || 0
  );

  useEffect(() => {
    if (!channel) {
      console.warn("Pusher channel is not available");
      return;
    }

    const handleAssignOrder = (order: { chunk: string }) => {
      const parsedOrder = JSON.parse(order.chunk);
      console.log(parsedOrder);

      parsedOrder.deliveryAddress.locationName = "Unknown location name";
      setAssignedOrder(parsedOrder);
    };

    const handleUnAssignOrder = () => {
      setAssignedOrder(null);
    };

    channel.bind("order-assigned", handleAssignOrder);
    channel.bind("order-unassigned", handleUnAssignOrder);

    return () => {
      channel.unbind("order-assigned", handleAssignOrder);
      channel.unbind("order-unassigned", handleUnAssignOrder);
    };
  }, [channel, setAssignedOrder]);

  useEffect(() => {
    if (!assignedOrder || !reversedLocation) {
      console.error("assignedOrder or reversedLocation undefined!");
      return; // If assignedOrder is null or undefined, do nothing
    }

    const updatedOrder = assignedOrder
      ? {
          ...assignedOrder,
          deliveryAddress: {
            ...assignedOrder.deliveryAddress,
            locationName: reversedLocation || "Unknown location name",
          },
        }
      : null;

    if (updatedOrder) {
      setAssignedOrder(updatedOrder);
    }

    console.log(reversedLocation);
  }, [reversedLocation]);

  return (
    <Drawer open={assignedOrder !== null}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex gap-4 items-center">
            <p>Delivery for:</p>
            <div className="flex gap-1 items-center">
              <p>{assignedOrder?.buyer.username}</p>
              <Avatar>
                {" "}
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${assignedOrder?.buyer.username}&radius=50&backgroundColor=a3a3a3&fontSize=35&bold=true`}
                  alt="User avatar"
                />
              </Avatar>{" "}
            </div>
          </DrawerTitle>
          <DrawerDescription className="flex flex-col gap-2">
            <p className="text-lg">
              {assignedOrder?.deliveryAddress.locationName}
            </p>

            {assignedOrder && assignedOrder?.deliveryNote && (
              <div>
                <Label>Delivery note:</Label>
                <Textarea readOnly value={assignedOrder.deliveryNote} />
              </div>
            )}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Accept delivery</Button>
          <DrawerClose asChild>
            <Button variant="outline">Deny</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
