import { useEffect, useState } from "react";

import axios from "axios";

const useGeocoding = (lat: number, lon: number) => {
  const [reversedLocation, setReversedLocation] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${
            import.meta.env.VITE_OPEN_WEATHER_KEY
          }`
        );
        setReversedLocation(response.data[0].name);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [lat, lon]);

  return { reversedLocation };
};

export default useGeocoding;
