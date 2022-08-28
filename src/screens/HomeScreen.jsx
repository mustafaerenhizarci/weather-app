import { useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Text,
  ImageBackground,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEllipsisV,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import Current from "../components/Current";
import { WeatherContext } from "../context/WeatherContext";
import {useFonts}  from "expo-font";



export default function HomeScreen({ navigation }) {
  const { fetchCurrentWeather } = useContext(WeatherContext);
  
  
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    if (await fetchCurrentWeather()) {
      setRefreshing(false);
    }
  };

  const getLastUpdate = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "December",
    ];

    const today = new Date();

    const day = days[today.getDay()];
    const date = today.getDate();
    const month = months[today.getMonth()];

    const clock = today.toLocaleTimeString();

    return `${day}, ${date} ${month} ${clock}`;
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="h-full bg-gray-900"
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
        <View className="w-[90%] mt-5 mb-1 flex flex-row justify-between items-center h-max">
          <TouchableOpacity className="w-16 py-1 flex justify-center items-center  rounded-md">
            <FontAwesomeIcon size={23} color="#eee" icon={faEllipsisV} />
          </TouchableOpacity>

          <Text className="text-gray-400 text-xs">
            Updated: {getLastUpdate()}
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Location");
            }}
            className="w-16 py-1 flex justify-center items-center  rounded-md"
          >
            <FontAwesomeIcon size={23} color="#eee" icon={faLocationArrow} />
          </TouchableOpacity>
        </View>
        <Current />
      </ImageBackground>
    </ScrollView>
  );
}
