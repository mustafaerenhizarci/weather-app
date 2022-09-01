import { useContext, useRef, useEffect } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { ScrollView, Text, View,Animated } from "react-native";
import Loading from "../components/shared/Loading";
import * as Animatable from 'react-native-animatable'

export default function HourlyForecast({ activeDay }) {
  const { isHourlyReady,forecast } = useContext(WeatherContext);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollTo({ x: 0, y: 0 });
  }, [activeDay]);

  if (!isHourlyReady || activeDay.length < 0) {
    return <Loading />;
  }

  

  return (
    <Animatable.View animation="bounceInRight" delay={700}
    useNativeDriver={true}  className="w-full flex justify-center items-center">
      <Text
        style={{ fontFamily: "DosisRegular" }}
        className="text-white text-md text-center"
      >
        {activeDay.length > 0 && activeDay[0].day}
      </Text>
      <ScrollView
        ref={scrollRef}
        
        horizontal={true}
        className="my-2 w-[90%] border-[1px] rounded-sm bg-black/30 border-white/20 py-1"
      >
        {activeDay.map((data, index) => {
          return (
            <View key={index} className="px-3 py-1 h-full mx-1">
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
                {data.temperature} °
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
    </Animatable.View>
  );
}
