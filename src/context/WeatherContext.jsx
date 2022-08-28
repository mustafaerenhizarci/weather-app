import { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";

export const WeatherContext = createContext();

export default function WeatherProvider({ children }) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const API_KEY = "bdaf867dfce9dd5890c6936c19cbae38";
  const [location, setLocation] = useState("Ankara");
  const [storedLocations, setStoredLocations] = useState([]);
  const [lang, setLang] = useState("tr");

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&lang=${lang}&units=metric`;
  const FORECAST_API_URL = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&lang=${lang}&units=metric`;
  const [weatherData, setWeatherData] = useState({});
  const [forecast, setForecast] = useState({});

  const [searchLocation, setSearchLocation] = useState("");
  const [isCurrentReady, setIsCurrentReady] = useState(false);
  const [isDailyReady, setIsDailyReady] = useState(false);

  async function fetchCurrentWeather() {
    const data = await fetch(API_URL).then((res) => res.json());
    setWeatherData(data);
    if (data.cod === 200) {
      setIsCurrentReady(true);
      return true;
    } else {
      return false;
    }
  }

  async function fetchForecastWeather() {
    const data = await fetch(FORECAST_API_URL).then((res) => res.json());

    const dataConfigured = data.list.map((item) => {
      let date = item.dt_txt.split(" ");
      return {
        day: days[new Date(date[0]).getDay()],
        time: date[1].slice(0, 5),
        temperature: Math.round(item.main.temp),
        description: upperFirst(item.weather[0].description),
        icon: item.weather[0].icon,
        wind: Math.round(item.wind.speed),
        humidity: item.main.humidity,
      };
    });

    const dailyData = {
      monday: dataConfigured.filter((item) => item.day === "Monday"),
      tuesday: dataConfigured.filter((item) => item.day === "Tuesday"),
      wednesday: dataConfigured.filter((item) => item.day === "Wednesday"),
      thursday: dataConfigured.filter((item) => item.day === "Thursday"),
      friday: dataConfigured.filter((item) => item.day === "Friday"),
      saturday: dataConfigured.filter((item) => item.day === "Saturday"),
      sunday: dataConfigured.filter((item) => item.day === "Sunday"),
    };

    setForecast(dailyData);
    setIsDailyReady(true);

    return 1
  }

  async function setGPS() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const gps = await Location.getCurrentPositionAsync({});

    setClientLocation(gps.coords.latitude, gps.coords.longitude);
  }

  async function setClientLocation(lat, lon) {
    const clientLocationName = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`
    ).then((res) => res.json());

    if (clientLocationName.length > 0) {
      setLocation(clientLocationName[0].name);
      setIsCurrentReady(true);
      setIsDailyReady(true);
    }
  }

  useEffect(() => {
    setGPS();
  }, []);

  useEffect(() => {
    fetchCurrentWeather();
    fetchForecastWeather();
  }, [location]);

  function upperFirst(str) {
    return str
      .split(" ")
      .map((word) => {
        return word[0].toUpperCase() + word.slice(1, word.length);
      })
      .join(" ");
  }

  return (
    <WeatherContext.Provider
      value={{
        API_KEY,
        lang,
        fetchCurrentWeather,
        fetchForecastWeather,
        weatherData,
        forecast,
        searchLocation,
        setSearchLocation,
        storedLocations,
        setStoredLocations,
        setGPS,
        location,
        setLocation,
        isCurrentReady,
        setIsCurrentReady,
        isDailyReady,
        setIsDailyReady,
        upperFirst,
        days,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
