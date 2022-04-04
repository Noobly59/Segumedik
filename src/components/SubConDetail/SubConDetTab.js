import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DetectionTab from "./DetectionTab";
import ClosureTab from "./ClosureTab";
import { Text } from "react-native-rapi-ui";
import { StyleSheet } from "react-native";

const Tab = createMaterialTopTabNavigator();

export default function SubConDetTab() {
  return (
    <Tab.Navigator style={styles.tabContainer}>
      <Tab.Screen
        name="DetectionTab"
        component={DetectionTab}
        options={{ tabBarLabel: () => <Text>Detección</Text> }}
      />
      <Tab.Screen
        name="ClosureTab"
        component={ClosureTab}
        options={{
          tabBarLabel: () => <Text>Cierre</Text>,
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
