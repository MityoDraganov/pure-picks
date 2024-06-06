import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthContext } from "./AuthContext";
import { IOrder } from "../Interfaces/Order.interface";
import Pusher from "pusher-js";

interface IDeliveriesContext {
  channel: any;
  assignedOrder: IOrder | null;
  setAssignedOrder: Dispatch<SetStateAction<IOrder | null>>;
  isOrderAccepted: boolean;
  setIsOrderAccepted: Dispatch<SetStateAction<boolean>>;
}

export const DeliveriesContext = createContext<IDeliveriesContext>(
  {} as IDeliveriesContext
);

export function DeliveriesProvider(props: any) {
  const { user } = useContext(AuthContext);
  const [assignedOrder, setAssignedOrder] = useState<IOrder | null>(null);
  const [isOrderAccepted, setIsOrderAccepted] = useState<boolean>(false);
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      console.error("User is not defined, cannot subscribe to Pusher channel");
      return;
    }

    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    });

    const userChannel = pusher.subscribe(user._id!);
    setChannel(userChannel);

    return () => {
      userChannel.unbind_all();
      userChannel.unsubscribe();
    };
  }, [user]);

  const DeliveriesContextValues: IDeliveriesContext = {
    channel,
    assignedOrder,
    setAssignedOrder,
    isOrderAccepted,
    setIsOrderAccepted,
  };

  return (
    <DeliveriesContext.Provider value={DeliveriesContextValues}>
      {props.children}
    </DeliveriesContext.Provider>
  );
}
