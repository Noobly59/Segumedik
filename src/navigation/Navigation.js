import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SubConNavigation from "./SubConNavigation";
import Home from "../screens/Home";
import SecAnnPlanNavigation from "./SecAnnPlanNavigation";

const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ title: "Inicio" }}
      />
      <Drawer.Screen
        name="SubConNavigation"
        component={SubConNavigation}
        options={{ title: "Condiciones Subestándar" }}
      />
      <Drawer.Screen
        name="SecAnnPlanNavigation"
        component={SecAnnPlanNavigation}
        options={{ title: "Plan de vigilancia" }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
}
