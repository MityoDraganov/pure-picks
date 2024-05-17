import * as dotenv from "dotenv";

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

import { AuthContext } from "./AuthContext";
import { IOrder } from "../Interfaces/Order.interface";
import Pusher from "pusher-js";

interface IDeliveriesContext {
  channel: any;
  assignedOrder: IOrder,
  setAssignedOrder: Dispatch<SetStateAction<IOrder>>
}

dotenv.config();

export const DeliveriesContext = createContext<IDeliveriesContext>(
  {} as IDeliveriesContext
);
export function DeliveriesProvider(props: any) {
  const { user } = useContext(AuthContext);
  const [assignedOrder, setAssignedOrder] = useState<IOrder>({} as IOrder)

  const pusher = new Pusher(process.env.PUSHER_KEY || "", {
    cluster: process.env.PUSHER_CLUSTER || "",
  });

  const channel = pusher.subscribe(user?._id!);

  const DeliveriesContextValues: IDeliveriesContext = {
    channel,
    assignedOrder,
    setAssignedOrder
  };

  return (
    <DeliveriesContext.Provider value={DeliveriesContextValues}>
      {props.children}
    </DeliveriesContext.Provider>
  );
}
