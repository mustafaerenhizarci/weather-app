import { StatusBar } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from 'expo-splash-screen';

// Importing Components
import WeatherContext from "./src/context/WeatherContext";
import Navigator from "./src/Navigator";

function App() {
  SplashScreen.hideAsync();
  return (
    <TailwindProvider>
      <StatusBar barStyle={"light-content"} backgroundColor="#0f172a" />
      <WeatherContext>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </WeatherContext>
    </TailwindProvider>
  );
}

export default App;
