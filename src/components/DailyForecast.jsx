import { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { WeatherContext } from "../context/WeatherContext";
import WeatherImage from "./WeatherImage";
import { useFonts } from "expo-font/build/FontHooks";
import Loading from "./shared/Loading";

export default function DailyForecast() {
  const { forecast,isDailyReady } = useContext(WeatherContext);

  const [isLoaded] = useFonts({
    MontserratSemiBold: require("../../assets/fonts/Montserrat/Montserrat-SemiBold.ttf"),
    MontserratLight: require("../../assets/fonts/Montserrat/Montserrat-Light.ttf"),
  });

  if (!isLoaded) {
    return null;
  }

  function getMinMaxTemp(day) {
    const temps = day.map((info) => info.temperature);
    return `${Math.max(...temps)}° / ${Math.min(...temps)}°`
  }

  function getAverageIcon(day) {
    const icons = day.map((info) => info.icon);
    let frequency = [];

    icons.forEach((icon) => {
      const count = icons.filter((item) => item === icon).length;
      frequency.push(count);
    });

    const frequent =
      icons[frequency.indexOf(Math.max(...frequency))].slice(0, 2) + "d";

    return frequent;
  }

  if (!isDailyReady) {
    return <Loading/>
  }

  return (
    <ScrollView horizontal={true}>
      {Object.values(forecast).map((day, index) => {
        if (day.length > 0) {
          return (
            <View
              key={index}
              className="mx-2 w-24 h-40 flex justify-center items-center bg-gray-600/20 rounded-md"
            >
              <Text
                style={{ fontFamily: "MontserratSemiBold" }}
                className="text-white text-md"
              >
                {day[0].day}
              </Text>
              <WeatherImage scale={2.5} id={getAverageIcon(Object.values(forecast)[index])} />
              <Text
                style={{ fontFamily: "MontserratLight" }}
                className="text-white text-md "
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
