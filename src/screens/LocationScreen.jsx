import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useFonts } from "expo-font";



export default function LocationScreen({ navigation }) {
  const [isLoaded] = useFonts({
    MontserratLight: require("../../assets/fonts/Montserrat/Montserrat-Light.ttf"),
  });

  if (!isLoaded) {
    return null;
  }

  const searchLocation = () => {
    console.log(Cities[0])
  }


  return (
    <View className="h-full mt-4 flex justify-start items-center bg-gray-900">
      <View className="w-full flex flex-row justify-around items-start">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          className="w-12 bg-gray-800 h-12 flex justify-center items-center rounded-full "
        >
          <FontAwesomeIcon icon={faArrowLeft} size={18} color="#fff" />
        </TouchableOpacity>
        <TextInput
          onChange={searchLocation}  
          style={{ fontFamily: "MontserratLight" }}
          placeholderTextColor="#eee"
          className="w-56 bg-gray-700 rounded-md px-3 py-1 text-lg text-white h-12"
          placeholder="Enter Location"
        />
      </View>
      <View className="w-full p-5 my-10 flex flex-wrap flex-row justify-around items-center">
        <TouchableOpacity className="bg-gray-800 px-2 py-1  my-3 w-[30%] rounded-xl">
          <Text
            style={{ fontFamily: "MontserratLight" }}
            className="text-center text-base text-white "
          >
            İstanbul
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
