import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLocationArrow,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";


const getLastUpdate = () => {
  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const today = new Date();

  const day = days[today.getDay()];
  const date = today.getDate();
  const month = months[today.getMonth()];

  const clock = today.toLocaleTimeString().slice(0,5);

  return `${day}, ${date} ${month} ${clock}`;
};

export default function HomeTop({ navigation }) {
  return (
    <View className="w-[90%] mt-5 mb-1 flex flex-row justify-between items-center h-max">
      <TouchableOpacity className="w-16 py-1 flex justify-center items-center  rounded-md">
        <FontAwesomeIcon size={23} color="#eee" icon={faEllipsisV} />
      </TouchableOpacity>

      <Text className="text-gray-400 text-xs">Güncelleme: {getLastUpdate()}</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Location");
        }}
        className="w-16 py-1 flex justify-center items-center  rounded-md"
      >
        <FontAwesomeIcon size={23} color="#eee" icon={faLocationArrow} />
      </TouchableOpacity>
    </View>
  );
}
