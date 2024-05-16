import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useRef, useState } from "react";

interface MapComponentProps {
  handleSetLocation?: (location: {
    latitude: number;
    longitude: number;
  }) => void;
  location: {
    latitude: number;
    longitude: number;
  };
  zoom?: number;
  mapCenterValues?: [number, number];
  disabled?: boolean;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  handleSetLocation,
  location,
  zoom,
  mapCenterValues,
  disabled,
}) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>(
    mapCenterValues ?? [0, 0]
  );
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (handleSetLocation)
            handleSetLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });

          setMapCenter([pos.coords.latitude, pos.coords.longitude]);
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
    if (handleSetLocation)
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
    <div className={`${disabled ? "opacity-60" : "opacity-100"}`}>
      <MapContainer
        center={mapCenter}
        zoom={zoom ?? 2}
        style={{ width: "100%", aspectRatio: 2 / 1 }}
        ref={mapRef}
        zoomControl={!disabled}
        dragging={!disabled}
        scrollWheelZoom={!disabled}
        touchZoom={!disabled}
        doubleClickZoom={!disabled}
      >
        <SetViewOnClick />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location.latitude !== 0 && location.longitude !== 0 && (
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>
              Latitude: {location.latitude}
              <br />
              Longitude: {location.longitude}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};
