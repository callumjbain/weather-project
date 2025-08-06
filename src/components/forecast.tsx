import { useFiveDayWeatherForecast } from "../hooks/useFiveDayWeatherForecast";

export const FiveDayForecast = () => {
  //   const [weather, setWeather] = useState<FiveDayForecastData | null>(null);
  const { weather, loading, error } = useFiveDayWeatherForecast();

  //   useEffect(() => {
  //     getFiveDayForecast()
  //       .then(setWeather)
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  if (!weather) {
    return <section>No Forecast Available!!!!</section>;
  }
  if (loading) return <section>Loading....</section>;
  if (error) return <section>Error getting forecast: {error}</section>;

  return (
    <section id="forecast" className="py-24 px-4 relative">
      <h2 className="text-4xl pb-10">Five Day Summary</h2>
      {Object.entries(weather)
        // .slice(0, 8)
        .map(([dt, entry]) => (
          <p key={dt} className="flex justify-center">
            Time: {new Date(parseInt(dt) * 1000).toLocaleString()}
            {Math.round(entry.main.temp)} Degrees
          </p>
        ))}
    </section>
  );
};
