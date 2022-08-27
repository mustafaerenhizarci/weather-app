import { Image, Text, View } from "react-native";
import { useFonts } from "expo-font";

export default function Logo() {
  const [isLoaded] = useFonts({
    MontserratBold: require("../../assets/fonts/Montserrat/Montserrat-Bold.ttf"),
  });

  if (!isLoaded) {
    return null;
  }

  return (
    <View className="w-[35%] p-2 bg-white mb-1 h-full rounded-lg flex justify-center items-center">
      <Image
        className="w-full h-[70%]"
        source={require("../../assets/logo.png")}
        resizeMode="center"
      />
      <Text
        style={{ fontFamily: "MontserratBold" }}
        className="text-gray-900 text-center text-md"
      >
        Weather
      </Text>
    </View>
  );
}
