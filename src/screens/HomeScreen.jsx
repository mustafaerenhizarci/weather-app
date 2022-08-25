import { useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEllipsisV,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import Current from "../components/Current";
import { WeatherContext } from "../context/WeatherContext";

export default function HomePage({navigation}) {
  const { fetchCurrentWeather } = useContext(WeatherContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    if (await fetchCurrentWeather()) {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="h-full bg-gray-900"
      contentContainerStyle={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View className="w-[90%] mt-5 mb-1 flex flex-row justify-between items-center h-max">
        <TouchableOpacity className="w-16 py-1 flex justify-center items-center  rounded-md">
          <FontAwesomeIcon size={23} color="#eee" icon={faEllipsisV} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {navigation.navigate('Location')}} className="w-16 py-1 flex justify-center items-center  rounded-md">
          <FontAwesomeIcon size={23} color="#eee" icon={faLocationArrow} />
        </TouchableOpacity>
      </View>
      <Current />
    </ScrollView>
  );
}
