import { View,Text, ActivityIndicator } from "react-native";

export default function Loading() {
  return (
    <View className="w-[90%] h-max flex justify-center items-center my-4  rounded-lg">
      <ActivityIndicator className="my-4" size="large" color="#fbbf24" />
      <Text className="text-amber-50 text-xs my-2">Getting Weather Data...</Text>
    </View>
  );
}
