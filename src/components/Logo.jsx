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
    <View className="w-[35%] mb-1 h-full rounded-lg flex justify-center items-center">
      <Image
        className="w-[100%] h-[100%]"
        source={require("../../assets/logo.png")}
        resizeMode="center"
      />
      
    </View>
  );
}
