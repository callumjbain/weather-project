import { useEffect, useState } from "react";
import { getWeather, getWeatherByCity } from "../api/weather";

interface WeatherData {
  name: string;
  weather: { description: string }[];
  main: { temp: number };
}

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWeatherByCity("london", "metric")
      .then(setWeather)
      .catch((err) => {
        console.error(err);
        setError(`Failed to get weather:${err}`);
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!weather) return <p>Loading...</p>;

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>{weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp}</p>
    </div>
  );
}
