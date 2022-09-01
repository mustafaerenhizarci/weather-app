import { View, Text, TouchableOpacity, Linking } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faFirefoxBrowser } from "@fortawesome/free-brands-svg-icons";


export default function DetailsScreen({ navigation }) {
  return (
    <View className="w-full h-full pt-8 bg-[#100118]">
      <View className="w-full flex flex-row justify-start items-center">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          className="px-2 mx-3 h-12 w-[20%] flex justify-around items-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} size={18} color="#fff" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "MontserratBold" }}
          className="text-xl text-white text-center w-[50%]"
        >
          Hakkında
        </Text>
      </View>

      <View className="w-full mt-5 flex justify-center items-center">
        <View className="w-[90%] py-3 my-2 rounded-lg bg-[#0f193b] flex flex-row justify-around items-center">
          <Text
            style={{ fontFamily: "MontserratSemiBold" }}
            className=" text-white "
          >
            Hava Durumu
          </Text>
        </View>

        <View className="w-[90%] py-3 my-2 rounded-lg bg-[#0f193b] flex flex-row justify-around items-center">
          <Text
            style={{ fontFamily: "MontserratSemiBold" }}
            className=" text-white "
          >
            Sürüm
          </Text>
          <Text
            style={{ fontFamily: "MontserratLight" }}
            className="text-white "
          >
            1.0.0
          </Text>
        </View>

        <TouchableOpacity className="w-[90%] py-3 px-1 my-2 rounded-lg bg-amber-400">
          <Text
            style={{ fontFamily: "MontserratBold" }}
            className=" text-black text-center"
          >
            Uygulamayı Paylaş
          </Text>
        </TouchableOpacity>

        <View className="w-[90%] py-3 mt-10 mb-2 rounded-lg bg-[#0f193b] flex flex-row justify-around items-center">
          <Text
            style={{ fontFamily: "MontserratSemiBold" }}
            className=" text-white"
          >
            Geliştirici
          </Text>
        </View>
        <View className="w-[90%] py-3 my-2 rounded-lg bg-[#0f193b] flex flex-row justify-around items-center">
          <Text
            style={{ fontFamily: "MontserratLight" }}
            className="text-white "
          >
            Mustafa Eren Hızarcı
          </Text>
        </View>

        <View className="w-[90%] py-3 my-2 rounded-lg bg-[#0f193b] flex flex-row justify-around items-center">
          <Text
            style={{ fontFamily: "MontserratSemiBold" }}
            className=" text-white "
          >
            Email
          </Text>
          <Text
            style={{ fontFamily: "MontserratLight" }}
            className="text-white "
          >
            hizarcimustafaeren@gmail.com
          </Text>
        </View>

        <View className="w-[90%] mt-4 flex flex-row justify-around items-center">
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://github.com/mustafaerenhizarci");
            }}
            className="w-[40%] h-10 py-1 px-1 flex flex-row justify-center gap-2 items-center rounded-lg bg-[#eee]"
          >
            <FontAwesomeIcon icon={faGithub} size={25} />
            <Text
              style={{ fontFamily: "MontserratBold" }}
              className=" text-black text-md text-center"
            >
              Github
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://mustafaerenhizarci.site/");
            }}
            className="w-[40%] h-10 py-1 px-1 flex flex-row justify-center gap-2 items-center rounded-lg bg-white"
          >
            <Text
              style={{ fontFamily: "MontserratBold" }}
              className=" text-black text-md text-center"
            >
              Website
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
