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
  delivererLocation: {
    latitude: number | null;
    longitude: number | null;
  };
  setDelivererLocation: Dispatch<
    SetStateAction<{
      latitude: number | null;
      longitude: number | null;
    }>
  >;
}

export const DeliveriesContext = createContext<IDeliveriesContext>(
  {} as IDeliveriesContext
);

export function DeliveriesProvider(props: any) {
  const { user } = useContext(AuthContext);
  const [assignedOrder, setAssignedOrder] = useState<IOrder | null>(null);
  const [isOrderAccepted, setIsOrderAccepted] = useState<boolean>(false);
  const [channel, setChannel] = useState<any>(null);

  const [delivererLocation, setDelivererLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

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

  useEffect(() => {
    let watcher: number | null = null;

    if (navigator.geolocation) {
      watcher = navigator.geolocation.watchPosition(
        (pos) => {
          if (assignedOrder && isOrderAccepted) {
            setDelivererLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          }
        },
        (error) => {
          console.error("Error getting current position:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    return () => {
      if (watcher) {
        navigator.geolocation.clearWatch(watcher);
      }
    };
  }, [assignedOrder, isOrderAccepted, user]);

  const DeliveriesContextValues: IDeliveriesContext = {
    channel,
    assignedOrder,
    setAssignedOrder,
    isOrderAccepted,
    setIsOrderAccepted,
    delivererLocation,
    setDelivererLocation,
  };

  return (
    <DeliveriesContext.Provider value={DeliveriesContextValues}>
      {props.children}
    </DeliveriesContext.Provider>
  );
}
