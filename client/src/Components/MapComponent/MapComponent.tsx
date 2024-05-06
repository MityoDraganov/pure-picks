import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

interface MapComponentProps {
  setPosition: React.Dispatch<React.SetStateAction<{ latitude: number; longitude: number } | null>>;
}

export const MapComponent: React.FC<MapComponentProps> = ({ setPosition }) => {
  const [position, setPositionState] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPositionState({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current position:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [setPosition]);

  const handleMapClick = (e: any) => {
    setPositionState({
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
    });
    setPosition({
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
    });
  };

  const SetViewOnClick = () => {
    const map = useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  return (
    <>
      {position && (
        <MapContainer
          center={position ? [position.latitude, position.longitude] : [0, 0]} // Use user's location if available, otherwise use [0, 0]
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <SetViewOnClick />
          {position && (
            <Marker position={[position.latitude, position.longitude]}>
              <Popup>
                Latitude: {position.latitude}
                <br />
                Longitude: {position.longitude}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
      
    </>
  );
};