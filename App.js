import { StatusBar } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

// Importing Components
import WeatherContext from "./src/context/WeatherContext";

import Navigator from "./src/Navigator";

function App() {
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

  return (
    <TailwindProvider>
      <StatusBar barStyle={"default"} backgroundColor="#090F23" />

      <WeatherContext>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </WeatherContext>
    </TailwindProvider>
  );
}

export default App;
