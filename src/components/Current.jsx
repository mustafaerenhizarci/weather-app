import { View, Text, Image } from "react-native";
import { useFonts } from "expo-font";
import { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWind, faDroplet } from "@fortawesome/free-solid-svg-icons";
import WeatherImage from "./WeatherImage";
import Logo from "./Logo";
import Loading from "./shared/Loading";

export default function Current() {
  const { weatherData, isCurrentReady, upperFirst } =
    useContext(WeatherContext);

  const [fontsLoaded] = useFonts({
    MontserratBlack: require("../../assets/fonts/Montserrat/Montserrat-Black.ttf"),
    MontserratBold: require("../../assets/fonts/Montserrat/Montserrat-Bold.ttf"),
    MontserratLight: require("../../assets/fonts/Montserrat/Montserrat-Light.ttf"),
    DosisRegular: require("../../assets/fonts/Dosis/Dosis-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (!isCurrentReady || weatherData.name === undefined) {
    return <Loading />;
  }

  function getSunInfo() {
    const sunrise = new Date(weatherData.sys.sunrise * 1000)
      .toLocaleTimeString()
      .slice(0, 5);
    const sunset = new Date(weatherData.sys.sunset * 1000)
      .toLocaleTimeString()
      .slice(0, 5);

    return {
      sunrise: sunrise,
      sunset: sunset,
    };
  }

  
  return (
    <View className="w-[90%] h-max my-4  rounded-lg">
      <View className="flex flex-row justify-around items-center w-full h-24">
        <Logo />
        <View
          style={{ borderWidth: 1, borderColor: "#475569" }}
          className="w-[60%] flex justify-center items-center bg-gray-800/30 h-full mb-1 rounded-md"
        >
          <Text
            style={{ fontFamily: "DosisRegular" }}
            className="text-center text-4xl text-white"
          >
            {weatherData.name.includes("Province")
              ? weatherData.name.split(" ")[0]
              : weatherData.name}
          </Text>
          <Text
            style={{ fontFamily: "DosisRegular" }}
            className=" text-center text-base text-white/40"
          >
            {weatherData.sys.country}
          </Text>
        </View>
      </View>

      <View className="w-full mt-2 mb-12 h-60 rounded-md">
        <View className="w-full flex flex-row justify-around items-center h-[60%]">
          <WeatherImage id={weatherData.weather[0].icon} w={90} h={90} />
          <View className="w-[40%] h-full flex justify-center items-center mr-4 ">
            <Text
              style={{ fontFamily: "MontserratBold" }}
              className="w-full text-4xl text-white text-center "
            >
              {Math.round(weatherData.main.temp)} °C
            </Text>
            <Text
              style={{ fontFamily: "MontserratLight" }}
              className="text-white text-center text-lg"
            >
              {upperFirst(weatherData.weather[0].description)}
            </Text>
          </View>
        </View>
        <View className="flex flex-row justify-around items-center">
          <View className="flex flex-row justify-around gap-4 items-center">
            <FontAwesomeIcon icon={faWind} size={25} color="#fde68a" />
            <Text
              style={{ fontFamily: "MontserratLight" }}
              className="text-lg text-white"
            >
              {Math.floor(weatherData.wind.speed)} km/h
            </Text>
          </View>

          <View className="flex flex-row justify-around gap-4 items-center">
            <FontAwesomeIcon icon={faDroplet} size={25} color="#60a5fa" />
            <Text
              style={{ fontFamily: "MontserratLight" }}
              className="text-lg text-white"
            >
              {weatherData.main.humidity} %
            </Text>
          </View>
        </View>
        <View className="mt-5 flex flex-row justify-around gap-x-10 items-center">
          <View className="h-16 flex justify-around  items-center">
            <Image
              className="w-10 h-10"
              source={require("../../assets/weather-icons/sunrise.png")}
              resizeMode="center"
            />
            <Text
              style={{ fontFamily: "MontserratLight" }}
              className="text-md text-white"
            >
              {getSunInfo().sunrise}
            </Text>
          </View>

          <View className="h-16 flex justify-around  items-center">
            <Image
              className="w-10 h-10"
              source={require("../../assets/weather-icons/sunset.png")}
              resizeMode="center"
            />
            <Text
              style={{ fontFamily: "MontserratLight" }}
              className="text-md text-white"
            >
              {getSunInfo().sunset}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
