import apiClient from "./client";

const apiKey = "f363d51c82e63ef80ae31f50c8ffaa27";

export const getWeatherWithLatLon = async (
  lat: number,
  lon: number,
  units?: "metric" | "imperial"
) => {
  const response = await apiClient.get("/weather", {
    params: {
      lat,
      lon,
      appId: apiKey,
      units,
    },
  });
  return response.data;
};

export const getWeatherByCity = async (q: string, units?: string) => {
  const response = await apiClient.get("weather", {
    params: {
      q,
      units,
      appId: apiKey,
    },
  });
  return response.data;
};
