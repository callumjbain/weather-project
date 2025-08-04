import "./App.css";
import Weather from "./components/weather";
import { Header } from "./components/header";

function App() {
  return (
    <>
      <Header />
      <h1>Weather App</h1>
      <Weather />
    </>
  );
}

export default App;
