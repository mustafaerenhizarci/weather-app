import { Image, View } from "react-native";

export default function Logo() {
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
