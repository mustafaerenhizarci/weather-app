import { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";

export const WeatherContext = createContext();

export default function WeatherProvider({ children }) {
  const API_KEY = "bdaf867dfce9dd5890c6936c19cbae38";
  const [location, setLocation] = useState("Ankara");
  const [lang, setLang] = useState("tr");

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&lang=${lang}&units=metric`;
  const [weatherData, setWeatherData] = useState({});

  async function fetchCurrentWeather() {
    const data = await fetch(API_URL).then((res) => res.json());
    setWeatherData(data);
    if (data.cod === 200) {
      return 1;
    } else {
      return 0;
    }
  }

  async function setClientLocation(lat, lon) {
    const clientLocationName = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`
    ).then((res) => res.json());
    
    console.log(clientLocationName)

    if (clientLocationName.length > 0) {
      setLocation(clientLocationName[0].name);
    }
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const gps = await Location.getCurrentPositionAsync({});

      setClientLocation(gps.coords.latitude, gps.coords.longitude);
    })();
  }, []);

  useEffect(() => {
    fetchCurrentWeather();
  }, [location]);

  return (
    <WeatherContext.Provider value={{ fetchCurrentWeather, weatherData }}>
      {children}
    </WeatherContext.Provider>
  );
}
