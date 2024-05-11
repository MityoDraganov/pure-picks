import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

interface MapComponentProps {
  handleSetLocation: (location: {
    latitude: number;
    longitude: number;
  }) => void;
  location: {
    latitude: number;
    longitude: number;
  };
}

export const MapComponent: React.FC<MapComponentProps> = ({
  handleSetLocation,
  location,
}) => {
    const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);
    const mapRef = useRef<any>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          handleSetLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });

          setMapCenter([pos.coords.latitude, pos.coords.longitude])
          mapRef.current.setView([location.latitude, location.longitude]);
        },
        (error) => {
          console.error("Error getting current position:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [setMapCenter, navigator.geolocation]);



  const handleMapClick = (e: any) => {
    handleSetLocation({
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
      <MapContainer
        center={mapCenter}
        zoom={2}
        style={{ width: "100%", aspectRatio: 2 / 1 }}
        ref={mapRef}
      >
        <SetViewOnClick />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location.latitude !== 0 && location.longitude !== 0 && (
          <Marker
            position={[location.latitude, location.longitude]}
          >
            <Popup>
              Latitude: {location.latitude}
              <br />
              Longitude: {location.longitude}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};
