import { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { WeatherContext } from "../context/WeatherContext";
import WeatherImage from "./WeatherImage";
import { useFonts } from "expo-font/build/FontHooks";
import Loading from "./shared/Loading";
import { icon } from "@fortawesome/fontawesome-svg-core";

export default function DailyForecast() {
  const { forecast, isDailyReady } = useContext(WeatherContext);

  const [isLoaded] = useFonts({
    MontserratSemiBold: require("../../assets/fonts/Montserrat/Montserrat-SemiBold.ttf"),
    MontserratLight: require("../../assets/fonts/Montserrat/Montserrat-Light.ttf"),
  });

  if (!isLoaded) {
    return null;
  }

  const weatherConditions = {
    "01": "Açık",
    "02": "Az Bulutlu",
    "03": "Az Bulutlu",
    "04": "Parçalı Bulutlu",
    "09": "Hafif Yağmurlu",
    10: "Yağmurlu",
    11: "Gök Gürültülü Sağanak",
    13: "Kar Yağışlı",
    50: "Sisli",
  };

  function getMinMaxTemp(day) {
    const temps = day.map((info) => info.temperature);
    return `${Math.max(...temps)}°  /  ${Math.min(...temps)}°`;
  }

  function getAverageIcon(day) {
    const icons = day.map((info) => info.icon);
    let frequency = [];

    icons.forEach((icon) => {
      const count = icons.filter((item) => item === icon).length;
      frequency.push(count);
    });

    const frequent =
      icons[frequency.indexOf(Math.min(...frequency))].slice(0, 2) + "d";

    if (icons.includes("09d") || icons.includes("09n")) {
      return "09d";
    } else if (icons.includes("10d") || icons.includes("10n")) {
      return "10d";
    } else if (icons.includes("13d") || icons.includes("13n")) {
      return "13d";
    }

    return frequent;
  }

  if (!isDailyReady) {
    return <Loading />;
  }

  return (
    <ScrollView horizontal={true}>
      {Object.values(forecast).map((day, index) => {
        if (day.length > 0 && day[0].day !== "Bugün") {
          return (
            <View
              key={index}
              className="mx-2 w-24 h-44 flex justify-center items-center bg-gray-500/20 rounded-md"
            >
              <Text
                style={{ fontFamily: "MontserratSemiBold" }}
                className="text-white text-md"
              >
                {day[0].day}
              </Text>
              <Text className="text-white/70 text-xs text-center mt-1">
                {
                  weatherConditions[
                    getAverageIcon(Object.values(forecast)[index]).slice(0, 2)
                  ]
                }
              </Text>
              <WeatherImage
                w={60} h ={60}
                id={getAverageIcon(Object.values(forecast)[index])}
              />
              <Text
                style={{ fontFamily: "MontserratLight" }}
                className="text-white text-md"
              >
                {getMinMaxTemp(Object.values(forecast)[index])}
              </Text>
            </View>
          );
        }
      })}
    </ScrollView>
  );
}
