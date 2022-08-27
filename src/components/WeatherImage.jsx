import { useSyncExternalStore } from "react";
import { Image } from "react-native";

const Images = {
  "01d": require("../../assets/weather-icons/01d.png"),
  "01n": require("../../assets/weather-icons/01n.png"),
  "02d": require("../../assets/weather-icons/02d.png"),
  "02n": require("../../assets/weather-icons/02n.png"),
  "03d": require("../../assets/weather-icons/03d.png"),
  "03n": require("../../assets/weather-icons/03n.png"),
  "04d": require("../../assets/weather-icons/04d.png"),
  "04n": require("../../assets/weather-icons/04n.png"),
  "09d": require("../../assets/weather-icons/09d.png"),
  "09n": require("../../assets/weather-icons/09n.png"),
  "10d": require("../../assets/weather-icons/10d.png"),
  "10n": require("../../assets/weather-icons/10n.png"),
  "11d": require("../../assets/weather-icons/11d.png"),
  "11n": require("../../assets/weather-icons/11n.png"),
  "13d": require("../../assets/weather-icons/13d.png"),
  "13n": require("../../assets/weather-icons/13n.png"),
  "50d": require("../../assets/weather-icons/50d.png"),
  "50n": require("../../assets/weather-icons/50n.png"),
};

export default function WeatherImage({ id }) {
  return (
    <Image
      style={{transform:[{scale:3}]}}
      source={Images[id]}
      className="w-[40%] h-full"
      resizeMode="center"
    />
  );
}
