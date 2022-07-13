import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SecAnnPlanProcessActivities from "../screens/SecAnnPlanProcessActivities";
import ProcessTalk from "../screens/ProcessTalk";
import TalkTakePicture from "../screens/TalkTakePicture";
import ProcessActivities from "../screens/ProcessActivities";
import ActivityTakePicture from "../screens/ActivityTakePicture";
import AddActivities from "../screens/AddActivities";
import AddActivity from "../screens/AddActivity";
import RescheduleActivityScreen from "../screens/RescheduleActivityScreen";
import Accidents from "../screens/Accidents";

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
          planYear: params.planYear,
          refresh: 0,
        }}
      />
      <Stack.Screen
        name="ProcessTalk"
        component={ProcessTalk}
        options={{ title: "", headerShown: false }}
        initialParams={{
          refresh: 0,
        }}
      />
      <Stack.Screen
        name="TalkTakePicture"
        component={TalkTakePicture}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="ProcessActivities"
        component={ProcessActivities}
        options={{ title: "", headerShown: false }}
        initialParams={{
          refresh: 0,
        }}
      />
      <Stack.Screen
        name="ActivityTakePicture"
        component={ActivityTakePicture}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="AddActivities"
        component={AddActivities}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="AddActivity"
        component={AddActivity}
        options={{ title: "", headerShown: false }}
        initialParams={{
          planYear: params.planYear,
          month: params.month,
          reportId: params.reportId,
        }}
      />
      <Stack.Screen
        name="RescheduleActivityScreen"
        component={RescheduleActivityScreen}
        options={{ title: "", headerShown: false }}
        initialParams={{
          planYear: params.planYear,
          reportId: params.reportId,
        }}
      />
      <Stack.Screen
        name="Accidents"
        component={Accidents}
        options={{ title: "", headerShown: false }}
        initialParams={{
          planYear: params.planYear,
          month: params.month,
          reportId: params.reportId,
          planId: params.planId,
        }}
      />
    </Stack.Navigator>
  );
}
