import "./App.css";
import { FiveDayForecast } from "./components/forecast";

import { Header } from "./components/header";

import { Home } from "./components/home";

function App() {
  return (
    <>
      <Header />
      <Home />
      <FiveDayForecast />
      {/* <h1>Weather App</h1> */}
      {/* <Weather /> */}
    </>
  );
}

export default App;
