import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../Components/ui/drawer";
import { useContext, useEffect } from "react";

import { Button } from "../../Components/ui/button";
import { DeliveriesContext } from "../../contexts/DeliveriesContext";
import { IOrder } from "../../Interfaces/Order.interface";

export const Delivery = () => {
  const { channel, setAssignedOrder, assignedOrder } = useContext(DeliveriesContext);

  useEffect(() => {
    if (!channel) {
      console.warn("Pusher channel is not available");
      return;
    }

    const handleAssignOrder = (order: IOrder) => {
      setAssignedOrder(order);
    };

    const handleUnAssignOrder = () => {
      setAssignedOrder(null);
    };

    channel.bind("order-assigned", handleAssignOrder);
    channel.bind("order-unassigned", handleUnAssignOrder);

    // Unbind the events when the component unmounts
    return () => {
      channel.unbind("order-assigned", handleAssignOrder);
      channel.unbind("order-unassigned", handleUnAssignOrder);
    };
  }, [channel, setAssignedOrder]);

  return (
    <Drawer open={assignedOrder !== null}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
