import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


export default function LocationScreen({navigation}) {
  return <View className="h-full bg-gray-900">
    <TouchableOpacity  onPress={()=> {navigation.navigate('Home')}} className="w-12 h-12 flex justify-center items-center bg-gray-800 rounded-lg ring-2 absolute top-5 left-5">
        <FontAwesomeIcon icon={faArrowLeft} size={20} color="#fff"/>
    </TouchableOpacity>
  </View>;
}
