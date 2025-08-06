import { useEffect, useState } from "react";
import { getFiveDayForecast } from "../api/weather";

interface FiveDayForecastEntry {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    main: string;
  };
}

export type FiveDayForecastDict = {
  [key: number]: FiveDayForecastEntry;
};

export const useFiveDayWeatherForecast = () => {
  const [weather, setWeather] = useState<FiveDayForecastDict | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFiveDayForecast()
      .then((apiResponse) => {
        const weatherDict: FiveDayForecastDict = {};
        apiResponse.list.forEach((entry: FiveDayForecastEntry) => {
          weatherDict[entry.dt] = entry;
        });
        setWeather(weatherDict);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { weather, loading, error };
};
