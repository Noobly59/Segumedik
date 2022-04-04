import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SubstandarCondition from "../screens/SubstandarCondition";
import AddSubstandarCondition from "../screens/AddSubstandarCondition";
import AddSubConTakePicture from "../screens/AddSubConTakePicture";
import SubConDetail from "../screens/SubConDetail";

const Stack = createNativeStackNavigator();

export default function SubConNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SubstandarCondition"
        component={SubstandarCondition}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="AddSubstandarCondition"
        component={AddSubstandarCondition}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="AddSubConTakePicture"
        component={AddSubConTakePicture}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="SubConDetail"
        component={SubConDetail}
        options={{ title: "", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
