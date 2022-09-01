import { StatusBar } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useNetInfo } from "@react-native-community/netinfo";
import Constants from 'expo-constants';

// Importing Components
import WeatherContext from "./src/context/WeatherContext";

import Navigator from "./src/Navigator";
import NoInternet from "./src/components/NoInternet";
import InvalidApiKey from "./src/components/InvalidApiKey";

function App() {
  
  
  const [isApiValid, setIsApiValid] = useState(true);

  useEffect(() => {
    testApiKey();
  }, []);

  async function testApiKey() {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${"ankara"}&appid=${
      Constants.manifest.extra.environment["API_KEY"]
    }&lang=${"tr"}&units=metric`;
    const data = await fetch(API_URL).then((res) => res.json());
    const code = data.cod;

    if (code !== 200) {
      setIsApiValid(false);
    } else {
      setIsApiValid(true);
    }
  }

  const fonts = {
    DosisRegular: require("./assets/fonts/Dosis/Dosis-Regular.ttf"),
    MontserratBlack: require("./assets/fonts/Montserrat/Montserrat-Black.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat/Montserrat-Bold.ttf"),
    MontserratSemiBold: require("./assets/fonts/Montserrat/Montserrat-SemiBold.ttf"),
    MontserratLight: require("./assets/fonts/Montserrat/Montserrat-Light.ttf"),
  };

  const [isFontsReady] = useFonts(fonts);

  if (isFontsReady) {
    SplashScreen.hideAsync();
  }

  if (!useNetInfo().isConnected) {
    return <NoInternet />;
  }

  if (!isApiValid) {
    return <InvalidApiKey />;
  }

  return (
    <TailwindProvider>
      <StatusBar barStyle={"default"} backgroundColor="#100118" />

      <WeatherContext>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </WeatherContext>
    </TailwindProvider>
  );
}



export default App;
