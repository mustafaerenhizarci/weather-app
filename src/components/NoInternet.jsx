import { View, Text, StatusBar } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import * as Animatable from "react-native-animatable";

export default function NoInternet() {
  return (
    <TailwindProvider>
      <StatusBar barStyle={"default"} backgroundColor="#100118" />
      <View className="w-full h-full flex justify-evenly items-center bg-[#100118]">
        <View className="w-32 h-32 bg-white flex justify-center items-center rounded-lg">
          <Animatable.View
            animation="swing"
            iterationDelay={1000}
            iterationCount="infinite"
          >
            <FontAwesomeIcon icon={faEarthAmericas} size={100} color="red" />
          </Animatable.View>
        </View>

        <Text className="text-white text-2xl">No Internet Connection :(</Text>
      </View>
    </TailwindProvider>
  );
}
