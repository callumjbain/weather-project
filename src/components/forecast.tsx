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
      <div className="grid grid-cols-1 md:grid-cold-5 gap-4">
        {weather.map((day, index) => (
          <div
            key={index}
            className="bg-panel/60 p-4 rounded-lg hover:bg-panel/90 shadow"
          >
            <h3 className="text-3xl font-semibold">{day.date}</h3>
            <div className="flex justify-center">
              <p className="text-primary px-2">
                <span>Low: </span>
                {Math.round(day.minTemp)}
              </p>
              <p className="text-primary px-2">
                <span>High: </span>
                {Math.round(day.maxTemp)}
              </p>
            </div>
            <p className="text-sm">{day.condition}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
