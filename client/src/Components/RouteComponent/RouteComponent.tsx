import "leaflet-routing-machine";

import { DeliveriesContext } from "../../contexts/DeliveriesContext";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import { useContext } from "react";

const createRoutineMachineLayer = () => {
  const { delivererLocation, assignedOrder } = useContext(DeliveriesContext);

  if(!delivererLocation.latitude || !delivererLocation.longitude){
    return;
  }

  const instance = L.Routing.control({
    waypoints: [
      L.latLng(delivererLocation.latitude, delivererLocation.longitude),
      L.latLng(
        assignedOrder!.deliveryAddress.latitude,
        assignedOrder!.deliveryAddress.longitude
      ),
    ],
    show: true,
    addWaypoints: false,
    routeWhileDragging: true,
    fitSelectedRoutes: true,
    autoRoute: true,
    
  });

  return instance;
};

export const RoutingMachine = createControlComponent(createRoutineMachineLayer);
