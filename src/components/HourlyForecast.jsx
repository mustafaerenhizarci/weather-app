import { useContext } from "react";
import {WeatherContext} from '../context/WeatherContext';
import { ScrollView, Text, View } from "react-native";
import { useFonts } from "expo-font/build/FontHooks";
import Loading from '../components/shared/Loading'

export default function HourlyForecast({ activeDay }) {

  const {isHourlyReady,setIsHourlyReady} = useContext(WeatherContext);

  const [isLoaded] = useFonts({
    MontserratSemiBold: require("../../assets/fonts/Montserrat/Montserrat-SemiBold.ttf"),
    MontserratLight: require("../../assets/fonts/Montserrat/Montserrat-Light.ttf"),
    DosisRegular:require("../../assets/fonts/Dosis/Dosis-Regular.ttf"),
  });

  if (!isLoaded || !isHourlyReady) {
    return <Loading/>;
  }
  
  return <>
  <Text style={{fontFamily:"DosisRegular"}} className="text-white text-md text-center">{activeDay.length > 0 && activeDay[0].day}</Text>
  <ScrollView
      horizontal={true}
      className="my-2 w-[90%] border-[1px] rounded-sm bg-black/30 border-white/20 py-1"
    >
      {activeDay.map((data) => {
        return (
          <View className="px-3 py-1 h-full mx-1">
            <Text
              style={{ fontFamily: "MontserratLight" }}
              className="my-1 text-white text-center text-xs"
            >
              {data.time}
            </Text>
            <Text
              style={{ fontFamily: "MontserratSemiBold" }}
              className="my-1 text-white text-center text-md"
            >
              {data.temperature} °C
            </Text>
            <Text
              style={{ fontFamily: "MontserratLight" }}
              className="my-1 text-white text-center text-xs"
            >
              {data.description}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  
  </>
}
