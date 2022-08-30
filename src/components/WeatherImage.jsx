import { View } from "react-native";

import Svg01d from "../../assets/weather-icons/icon01d.svg";
import Svg01n from "../../assets/weather-icons/icon01n.svg";
import Svg02d from "../../assets/weather-icons/icon02d.svg";
import Svg02n from "../../assets/weather-icons/icon02n.svg";
import Svg03d from "../../assets/weather-icons/icon03d.svg";
import Svg03n from "../../assets/weather-icons/icon03n.svg";
import Svg04d from "../../assets/weather-icons/icon04d.svg";
import Svg04n from "../../assets/weather-icons/icon04n.svg";
import Svg09d from "../../assets/weather-icons/icon09d.svg";
import Svg09n from "../../assets/weather-icons/icon09n.svg";
import Svg10d from "../../assets/weather-icons/icon10d.svg";
import Svg10n from "../../assets/weather-icons/icon10n.svg";
import Svg11d from "../../assets/weather-icons/icon11d.svg";
import Svg11n from "../../assets/weather-icons/icon11n.svg";
import Svg13d from "../../assets/weather-icons/icon13d.svg";
import Svg13n from "../../assets/weather-icons/icon13n.svg";
import Svg50d from "../../assets/weather-icons/icon50d.svg";
import Svg50n from "../../assets/weather-icons/icon50n.svg";

export default function WeatherImage({ id = "01d", w = 100, h = 100 }) {
  const svgs = {
    "01d": <Svg01d width={w} height={h} />,
    "01n": <Svg01n width={w} height={h} />,
    "02d": <Svg02d width={w} height={h} />,
    "02n": <Svg02n width={w} height={h} />,
    "03d": <Svg03d width={w} height={h} />,
    "03n": <Svg03n width={w} height={h} />,
    "04d": <Svg04d width={w} height={h} />,
    "04n": <Svg04n width={w} height={h} />,
    "09d": <Svg09d width={w} height={h} />,
    "09n": <Svg09n width={w} height={h} />,
    "10d": <Svg10d width={w} height={h} />,
    "10n": <Svg10n width={w} height={h} />,
    "11d": <Svg11d width={w} height={h} />,
    "11n": <Svg11n width={w} height={h} />,
    "13d": <Svg13d width={w} height={h} />,
    "13n": <Svg13n width={w} height={h} />,
    "50d": <Svg50d width={w} height={h} />,
    "50n": <Svg50n width={w} height={h} />,
  };

  return <View className="my-3">
    {svgs[id]}
  </View>;
}

