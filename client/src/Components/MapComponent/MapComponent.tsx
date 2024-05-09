import { useEffect } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from "react-leaflet";

interface MapComponentProps {
    setPosition: React.Dispatch<
        React.SetStateAction<{
            latitude: number;
            longitude: number;
        }>
    >;
    sellerLocation: {
        latitude: number;
        longitude: number;
    };
}

export const MapComponent: React.FC<MapComponentProps> = ({
    setPosition,
    sellerLocation,
}) => {
    const handleMapClick = (e: any) => {
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

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    });
                },
                (error) => {
                    console.error(
                        "Error getting current position:",
                        error.message
                    );
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, [setPosition, navigator.geolocation]);

    return (
        <>
            <MapContainer
                center={[sellerLocation.latitude, sellerLocation.longitude]}
                zoom={5}
                style={{ height: "400px", width: "100%" }}
            >
                <SetViewOnClick />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {sellerLocation.latitude && sellerLocation.longitude && (
                    <Marker
                        position={[
                            sellerLocation.latitude,
                            sellerLocation.longitude,
                        ]}
                    >
                        <Popup>
                            Latitude: {sellerLocation.latitude}
                            <br />
                            Longitude: {sellerLocation.longitude}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </>
    );
};
