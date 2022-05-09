import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SecAnnPlanProcessActivities from "../screens/SecAnnPlanProcessActivities";
import ProcessTalk from "../screens/ProcessTalk";
import TalkTakePicture from "../screens/TalkTakePicture";

const Stack = createNativeStackNavigator();

export default function ProcessActivityNavigation(props) {
  const {
    route: { params },
  } = props;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SecAnnPlanProcessActivities"
        component={SecAnnPlanProcessActivities}
        options={{ title: "", headerShown: false }}
        initialParams={{
          planId: params.planId,
          month: params.month,
          reportId: params.reportId,
        }}
      />
      <Stack.Screen
        name="ProcessTalk"
        component={ProcessTalk}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="TalkTakePicture"
        component={TalkTakePicture}
        options={{ title: "", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
