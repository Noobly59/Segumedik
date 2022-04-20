import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DetectionTab from "./DetectionTab";
import ClosureTab from "./ClosureTab";
import { Text } from "react-native-rapi-ui";
import { StyleSheet } from "react-native";

const Tab = createMaterialTopTabNavigator();

export default function SubConDetTab(props) {
  const { detectionDateAndEvidence, closingDateAndEvidence, id } = props;
  // console.log(id);
  return (
    <Tab.Navigator style={styles.tabContainer}>
      <Tab.Screen
        name="DetectionTab"
        component={DetectionTab}
        options={{
          tabBarLabel: () => <Text style={{ fontSize: 20 }}>Detección</Text>,
        }}
        initialParams={{ detectionDateAndEvidence: detectionDateAndEvidence }}
      />
      <Tab.Screen
        name="ClosureTab"
        component={ClosureTab}
        options={{
          tabBarLabel: () => <Text style={{ fontSize: 20 }}>Cierre</Text>,
        }}
        initialParams={{
          closingDateAndEvidence: closingDateAndEvidence,
          id: id,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    marginHorizontal: 5,
    borderRadius: 10,
  },
});
