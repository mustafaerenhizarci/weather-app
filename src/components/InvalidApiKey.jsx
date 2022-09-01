import { View, Text, StatusBar } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import * as Animatable from "react-native-animatable";
import { REACT_NATIVE_API_KEY_ENV } from "@env";

export default function InvalidApiKey() {
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
            <FontAwesomeIcon icon={faKey} size={100} color="red" />
          </Animatable.View>
        </View>

        <Text className="text-white text-2xl">Invalid API key</Text>
        <Text className="text-white text-xl">{REACT_NATIVE_API_KEY_ENV}</Text>
      </View>
    </TailwindProvider>
  );
}
