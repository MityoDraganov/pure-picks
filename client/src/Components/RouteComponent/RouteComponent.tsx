import "leaflet-routing-machine";

import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";

const createRoutineMachineLayer = () => {
  const instance = L.Routing.control({
    waypoints: [
        L.latLng(33.52001088075479, 36.26829385757446),
        L.latLng(33.50546582848033, 36.29547681726967)
      ],
      show: false,
      addWaypoints: false,
      routeWhileDragging: true,
      //fitSelectedRoutes: true,
      autoRoute: true
    });
    
  return instance;
};

export const RoutingMachine = createControlComponent(createRoutineMachineLayer);

