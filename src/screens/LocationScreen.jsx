import { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faPenToSquare,
  faCheck,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/shared/Loading";

export default function LocationScreen({ navigation }) {
  const [editMode, setEditMode] = useState(false);
  const {
    API_KEY,
    lang,
    searchLocation,
    setSearchLocation,
    storedLocations,
    setStoredLocations,
    setGPS,
    location,
    setLocation,
    setIsCurrentReady,
    setIsDailyReady,
    isLocationsReady,
    setIsLocationsReady,
    setIsHourlyReady,
  } = useContext(WeatherContext);

  async function isLocationAvaible(location) {
    setIsLocationsReady(false);
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&lang=${lang}&units=metric`
    ).then((res) => res.json());
    if (data.cod === 200) {
      setStoredLocations((prev) => {
        if (!prev.includes(data.name)) {
          return [data.name, ...prev];
        } else {
          Alert.alert(
            "Konum zaten eklendi",
            `Sık kullanılanlarınızda zaten ${data.name} adlı konum var.`,
            [{ text: "OK", onPress: setIsLocationsReady(true) }]
          );
          return prev;
        }
      });
      setIsLocationsReady(true);
    } else {
      Alert.alert("Konum bulunamadı", `${searchLocation} adlı konum bulunamadı, lütfen konum adını doğru yazdığınızdan emin olunuz.`, [
        { text: "OK", onPress: setIsLocationsReady(true) },
      ]);
    }
  }

  const searchSubmit = () => {
    isLocationAvaible(searchLocation);
    setSearchLocation("");
  };

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const deleteStoredLocation = (location) => {
    setStoredLocations((prev) => {
      if (prev.length === 1) {
        setEditMode(false);
      }
      setIsLocationsReady(true);
      return prev.filter((item) => item !== location);
    });
  };

  return (
    <View className="h-full bg-[#100118] pt-8 flex justify-start items-center">
      <View className="w-full flex flex-row justify-around items-center">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          className="px-2 h-12 flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} size={18} color="#fff" />
        </TouchableOpacity>
        <TextInput
          onSubmitEditing={searchSubmit}
          onChangeText={(e) => setSearchLocation(e)}
          value={searchLocation}
          style={{ fontFamily: "MontserratLight" }}
          placeholderTextColor="#eee"
          className="w-[60%] bg-gray-700 rounded-md px-3 py-1 text-md text-white"
          placeholder="Konum Giriniz"
        />
        {storedLocations.length > 0 &&
          (!editMode ? (
            <TouchableOpacity
              onPress={handleEditMode}
              className="rounded-md flex justify-center items-center px-4 py-2 bg-amber-300 text-black"
            >
              <FontAwesomeIcon icon={faPenToSquare} color="black" size={18} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleEditMode}
              className="rounded-md h-12 flex justify-center items-center px-4 py-2 bg-green-500 text-black"
            >
              <FontAwesomeIcon icon={faCheck} color="white" size={18} />
            </TouchableOpacity>
          ))}
      </View>
      <Text
        style={{ fontFamily: "MontserratLight" }}
        className="text-gray-400 text-sm text-left w-full px-6 pt-3"
      >
        Sık Kullanılanlar:{" "}
      </Text>
      <View className="w-full  px-6 py-4 flex flex-wrap flex-row justify-start gap-2 items-center">
        <TouchableOpacity
          onPress={() => {
            setIsDailyReady(false);
            setIsCurrentReady(false);
            setIsHourlyReady(false);
            setGPS();
            navigation.navigate("Home");
          }}
          className={` bg-amber-400 px-3 py-2 my-3 rounded-sm flex justify-center items-center`}
        >
          <FontAwesomeIcon
            icon={faLocationCrosshairs}
            color="black"
            size={20}
          />
        </TouchableOpacity>

        {isLocationsReady ? (
          storedLocations.map((item, index) => {
            return editMode ? (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setIsLocationsReady(false);
                  setIsCurrentReady(false);
                  setIsHourlyReady(false);
                  deleteStoredLocation(item);
                  setGPS();
                }}
                className="bg-red-700 px-3 py-1 my-3 w-min rounded-sm"
              >
                <Text
                  key={Math.random() * 1000}
                  style={{ fontFamily: "DosisRegular" }}
                  className="text-center text-base text-white"
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (location !== item) {
                    setIsDailyReady(false);
                    setIsCurrentReady(false);
                    setIsHourlyReady(false);
                    setLocation(item);
                  }

                  navigation.navigate("Home");
                }}
                className={`${
                  location === item ? "bg-blue-700" : "bg-gray-800"
                } px-3 py-1  my-3 w-min rounded-sm`}
              >
                <Text
                  style={{ fontFamily: "DosisRegular" }}
                  className="text-center text-base text-white"
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <Loading />
        )}
      </View>
    </View>
  );
}
