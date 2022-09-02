import { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import Constants from "expo-constants";

export const WeatherContext = createContext();

export default function WeatherProvider({ children }) {
  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];

  const API_KEY = Constants.manifest.extra.environment["API_KEY"];
  const [location, setLocation] = useState(0);
  const [storedLocations, setStoredLocations] = useState([]);
  const [lang, setLang] = useState("tr");

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&lang=${lang}&units=metric`;
  const FORECAST_API_URL = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&lang=${lang}&units=metric`;
  const [weatherData, setWeatherData] = useState({});
  const [forecast, setForecast] = useState([]);
  const [activeDay, setActiveDay] = useState([]);

  const [searchLocation, setSearchLocation] = useState("");
  const [isCurrentReady, setIsCurrentReady] = useState(false);
  const [isDailyReady, setIsDailyReady] = useState(false);
  const [isHourlyReady, setIsHourlyReady] = useState(false);
  const [isLocationsReady, setIsLocationsReady] = useState(true);

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
        date:new Date(item.dt * 1000).toLocaleDateString().slice(0,5),
        time: date[1].slice(0, 5),
        dt: item.dt,
        temperature: Math.round(item.main.temp),
        description: upperFirst(item.weather[0].description),
        icon: item.weather[0].icon,
        wind: Math.round(item.wind.speed),
        humidity: item.main.humidity,
      };
    });

    const forecast = [];

    for (var i = 0; i < 6; i++) {
      const todayIndex = new Date().getDay();
      let nextDay;
      if (todayIndex + i <= 6) {
        nextDay = days[todayIndex + i];
      } else {
        nextDay = days[Math.abs(todayIndex + i - 7)];
      }

      const day = dataConfigured.filter((item) => item.day === nextDay);

      day.map((info) => {
        if (info.day === days[todayIndex]) {
          info.day = "Bugün";
        } else if (
          info.day ===
          (todayIndex + 1 <= 6
            ? days[todayIndex + 1]
            : days[Math.abs(todayIndex + 1 - 7)])
        ) {
          info.day = "Yarın";
        }
        return info;
      });

      forecast.push(day);
    }

    setForecast(forecast);
    setActiveDay(forecast[0].length > 1 ? forecast[0] : forecast[1]);

    setIsDailyReady(true);
    setIsHourlyReady(true);

    return 1;
  }

  async function fetchNearLocations(countryName) {
    const country = `${encodeURIComponent("country")}=${encodeURIComponent(
      countryName
    )}`;

    const data = await fetch(
      "https://countriesnow.space/api/v0.1/countries/population/cities/filter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        referrerPolicy: "no-referrer",
        body: country,
      }
    ).then((res) => res.json());

    const ordered = data.data
      .map((city) => {
        return {
          name: upperFirst(city.city.toLowerCase()),
          population: Math.round(+city.populationCounts[0].value),
        };
      })
      .sort((a, b) => b.population - a.population)
      .map((item) => item.name);

    setStoredLocations(ordered.slice(0, 35));
  }

  async function setGPS() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const gps = await Location.getCurrentPositionAsync({});
    const clientLocation = await getClientLocationName(
      gps.coords.latitude,
      gps.coords.longitude
    );

    if (location !== clientLocation) {
      setLocation(clientLocation);
    }

    setIsCurrentReady(true);
    setIsDailyReady(true);
    setIsHourlyReady(true);

    return gps;
  }

  async function getClientLocationName(lat, lon) {
    const clientLocationName = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`
    ).then((res) => res.json());

    if (clientLocationName.length > 0) {
      return clientLocationName[0].name;
    }
  }

  useEffect(() => {
    setGPS();
    fetchNearLocations("turkey");
  }, []);

  useEffect(() => {
    if (!location) {
      setGPS();
    }
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
        fetchNearLocations,
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
        isHourlyReady,
        setIsHourlyReady,
        isLocationsReady,
        setIsLocationsReady,
        upperFirst,
        days,
        activeDay,
        setActiveDay,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
