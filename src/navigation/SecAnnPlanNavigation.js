import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SecurityAnnualPlan from "../screens/SecurityAnnualPlan";
import SecAnnPlanDetail from "../screens/SecAnnPlanDetail";
import ProcessActivityNavigation from "./ProcessActivityNavigation";

const Stack = createNativeStackNavigator();

export default function SecAnnPlanNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SecurityAnnualPlan"
        component={SecurityAnnualPlan}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="SecAnnPlanDetail"
        component={SecAnnPlanDetail}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="ProcessActivityNavigation"
        component={ProcessActivityNavigation}
        options={{ title: "", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
