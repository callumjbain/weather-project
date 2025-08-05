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
      <div className="p-6">
        <div className="flex justify-evenly items-center space-x-4">
          {/* Icon Sction */}
          <div className="flex-shrink-0">
            <div className="w-26 h-26 rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center">
              <Sun size={80} className="text-amber-300" />
            </div>
          </div>
          {/* Content Section */}

          <div className="grid grid-cols-1 items-center min-w-0">
            {/* Location Icon */}
            <div className="flex items-center gap-1 mb-1">
              <MapPin size={14} className="text-muted-foreground" />
              <h3 className="font-semibold text-lg capitalize truncate">
                {weather?.name}
              </h3>
            </div>
            {/* Temp hero element */}
            <div className="mb-2">
              <span className="text-3xl font-bold">
                {Math.round(weather?.main.temp) || 0}°
              </span>
              <span className="text-sm text-muted-foreground ml-1">C</span>
            </div>
            {/* Weather Description */}
            <p className="text-sm text-muted-foreground capitalize mb-2">
              {weather?.weather[0]?.description}
            </p>
            {/* High / Low */}
            <div className="flex gap-4 text-sm">
              <span className="text-muted-foreground">
                H:{" "}
                <span className="front-medium">
                  {Math.round(weather?.main.temp_max)}°
                </span>
              </span>
              <span className="text-muted-foreground">
                L:{" "}
                <span className="front-medium">
                  {Math.round(weather?.main.temp_min)}°
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
