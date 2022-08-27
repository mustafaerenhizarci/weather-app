import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

// Screens
import HomeScreen from "./screens/HomeScreen";
import LocationScreen from "./screens/LocationScreen";

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        presentation: "transparentModal",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter}} name="Location" component={LocationScreen} />
    </Stack.Navigator>
  );
}
