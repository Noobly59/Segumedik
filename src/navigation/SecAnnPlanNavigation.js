import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SecurityAnnualPlan from "../screens/SecurityAnnualPlan";
import SecAnnPlanDetail from "../screens/SecAnnPlanDetail";
import SecAnnPlanProcessActivities from "../screens/SecAnnPlanProcessActivities";

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
        name="SecAnnPlanProcessActivities"
        component={SecAnnPlanProcessActivities}
        options={{ title: "", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
