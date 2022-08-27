import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useFonts } from "expo-font";
import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWind, faDroplet } from "@fortawesome/free-solid-svg-icons";
import WeatherImage from "./WeatherImage";

function upperFirst(str) {
  return str
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1, word.length);
    })
    .join(" ");
}

export default function Current() {
  const { weatherData } = useContext(WeatherContext);

  const [fontsLoaded] = useFonts({
    MontserratBlack: require("../../assets/fonts/Montserrat/Montserrat-Black.ttf"),
    MontserratBold: require("../../assets/fonts/Montserrat/Montserrat-Bold.ttf"),
    MontserratLight: require("../../assets/fonts/Montserrat/Montserrat-Light.ttf"),
    DosisRegular: require("../../assets/fonts/Dosis/Dosis-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (Object.keys(weatherData).length === 0) {
    return (
      <View className="w-[90%] h-24 flex justify-center items-center my-4 bg-gray-800 rounded-lg">
        <ActivityIndicator size="large" color="#fbbf24" />
      </View>
    );
  }

  console.log(weatherData.weather[0].icon);

  return (
    <View className="w-[90%] h-max my-4  rounded-lg">
      <View className="flex flex-row justify-around items-center w-full h-24">
        <View  className="w-[35%] p-2 bg-white mb-1 h-full rounded-xl">
          <Image
            className="w-full h-full"
            resizeMode="center"
            source={require("../../assets/lime.png")}
          />
        </View>
        <View style={{borderWidth:1,borderColor:"#475569"}} className="w-[60%] flex justify-center items-center bg-gray-800 h-full mb-1 rounded-xl">
          <Text
            style={{ fontFamily: "DosisRegular" }}
            className="text-center text-4xl text-white"
          >
            {weatherData.name}
          </Text>
          <Text
            style={{ fontFamily: "DosisRegular" }}
            className=" text-center text-base text-white/40"
          >
            {weatherData.sys.country}
          </Text>
        </View>
      </View>
      <View className="w-full my-2 h-60 rounded-xl">
        <ImageBackground
          imageStyle={{
            borderWidth: 1,
            borderColor: "#475569",
            borderRadius: 10,
          }}
          resizeMode="stretch"
          source={require("../../assets/sky/sky-dark.jpg")}
        >
          <View className="w-full flex flex-row justify-around items-center h-[60%]">
            <WeatherImage id={weatherData.weather[0].icon} />
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
          <View className=" h-[40%] flex flex-row justify-around items-center">
            <View className=" flex flex-row justify-around gap-4 items-center">
              <FontAwesomeIcon icon={faWind} size={30} color="#fde68a" />
              <Text
                style={{ fontFamily: "MontserratLight" }}
                className="text-2xl text-white"
              >
                {Math.floor(weatherData.wind.speed)} km/h
              </Text>
            </View>

            <View className=" flex flex-row justify-around gap-4 items-center">
              <FontAwesomeIcon icon={faDroplet} size={30} color="#60a5fa" />
              <Text
                style={{ fontFamily: "MontserratLight" }}
                className="text-2xl text-white"
              >
                {weatherData.main.humidity} %
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}
