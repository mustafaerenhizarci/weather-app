import { useState, useContext } from "react";
import {
  ScrollView,
  RefreshControl,
  ImageBackground,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import Current from "../components/Current";
import { WeatherContext } from "../context/WeatherContext";

import HomeTop from "../components/HomeTop";
import DailyForecast from "../components/DailyForecast";

export default function HomeScreen({ navigation }) {
  const { fetchCurrentWeather, fetchForecastWeather } =
    useContext(WeatherContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    if ((await fetchCurrentWeather()) && (await fetchForecastWeather())) {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="bg-gray-900 min-h-full"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageBackground
          source={require("../../assets/sky/2.jpg")}
          className="w-full h-full flex justify-start items-center"
        >
          <HomeTop navigation={navigation} />
          <Current />

          <DailyForecast />
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
