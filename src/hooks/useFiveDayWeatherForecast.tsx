import { useEffect, useState } from "react";
import { getFiveDayForecast } from "../api/weather";

// LOOK INTO LODASH

interface FiveDayForecastEntry {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
  }>;
}

export type FiveDayForecastDict = {
  [key: number]: FiveDayForecastEntry;
};

interface DailyForecast {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
}

export const useFiveDayWeatherForecast = () => {
  const [weather, setWeather] = useState<DailyForecast[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFiveDayForecast()
      .then((apiResponse) => {
        const dailyForecast = processToDailyForecast(apiResponse.list);
        setWeather(dailyForecast);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  console.log(weather);
  return { weather, loading, error };
};

const processToDailyForecast = (
  entries: FiveDayForecastEntry[]
): DailyForecast[] => {
  const dailyData: { [key: string]: FiveDayForecastEntry[] } = {};

  // Group by date
  entries.forEach((entry) => {
    const date = new Date(entry.dt * 1000).toDateString();
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(entry);
  });

  return Object.entries(dailyData).map(([date, dayEntries]) => ({
    date: new Date(date).toLocaleDateString("en-GB", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
    minTemp: Math.min(...dayEntries.map((e) => e.main.temp)),
    maxTemp: Math.max(...dayEntries.map((e) => e.main.temp)),
    condition: getMostCommonCondition(dayEntries),
  }));
};

const getMostCommonCondition = (entries: FiveDayForecastEntry[]): string => {
  if (entries.length === 0) return "Unknown";

  const conditions = entries.map(
    (entry) => entry.weather[0]?.main || "Unknown"
  );
  const counts = conditions.reduce((acc, condition) => {
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const mostCommon = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );
  return mostCommon;
};
