import { useState, useEffect } from "react";
import { getWeatherByCity } from "../api/weather";
import { MapPin, Sun } from "lucide-react";

interface WeatherData {
  name: string;
  weather: { description: string }[];
  main: { temp: number; temp_min: number; temp_max: number };
}

const locations = [
  {
    name: "london",
    unit: "metric",
  },
  { name: "edinburgh", unit: "metric" },
];

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Your Weather
      </h1>
      <div className="container grid grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto z-10 gap-8">
        {locations.map((value, key) => (
          <div
            key={key}
            className="group bg-panel rounded-3xl overflow-hidden shadow-xss"
          >
            <WeatherPanel name={value.name} unit={value.unit} />
          </div>
        ))}
      </div>
    </section>
  );
};

interface WeatherPanelProps {
  name: string;
  unit: string;
}

const WeatherPanel = ({ name, unit }: WeatherPanelProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWeatherByCity(name, unit)
      .then(setWeather)
      .catch((err) => {
        console.error(err);
        setError(`Failed to get weather:${err}`);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 ">
      <div className=" p-5">
        <div className="flex items-center gap-20">
          <div className="w-1/3 flex justify-center">
            <div className="p-3 rounded-full bg-primary/10">
              <Sun size={50} className="text-amber-300" />
            </div>
          </div>
          <div className="w-2/3 flex">
            <div>
              <h3 className="font-semibold text-2xl gap-2 flex">
                {weather?.name}
              </h3>
              <p className="text-muted-foreground">
                {weather?.main.temp} Celsius
              </p>
              <p>
                <span>Low </span>
                {weather?.main.temp_min}
              </p>
              <p>
                <span>High </span>
                {weather?.main.temp_max}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
