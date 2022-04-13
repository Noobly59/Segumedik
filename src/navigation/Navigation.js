import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigation from "./HomeNavigation";
import ChooseCompany from "../screens/ChooseCompany";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="ChooseCompany">
      <Stack.Screen
        name="HomeNavigation"
        component={HomeNavigation}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="ChooseCompany"
        component={ChooseCompany}
        options={{ title: "", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
