import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const WeatherContext = createContext();

export default function WeatherProvider({ children }) {
  const API_KEY = "bdaf867dfce9dd5890c6936c19cbae38";
  const [location, setLocation] = useState("Burhaniye");
  const [lang, setLang] = useState("tr");

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&lang=${lang}&units=metric`;
  const [weatherData, setWeatherData] = useState({});

  async function fetchCurrentWeather() {
    const data = await fetch(API_URL).then((res) => res.json());
    console.log(data)
    setWeatherData(data);
    if (data.cod === 200) {
      return 1;
    } else {
      return 0;
    }
  }

  useEffect(() => {
    fetchCurrentWeather();
  }, []);

  return (
    <WeatherContext.Provider value={{fetchCurrentWeather,weatherData}}>
      {children}
    </WeatherContext.Provider>
  );
}
