import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-rapi-ui";
import HomeMenuItem from "./HomeMenuItem";

export default function HomeMenuItemContainer() {
  const navigation = useNavigation();

  const goToSecAnnPlan = () => {
    navigation.navigate("SecAnnPlanNavigation");
  };

  return (
    <View style={styles.homeMenuInfoContainer}>
      <Text style={styles.text}>Seguimiento de Plan de Vigilancia</Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={goToSecAnnPlan} activeOpacity={0.5}>
          <HomeMenuItem
            menuItemName="Dar Seguimiento al Plan"
            backColor="#0aa2c0"
            icon="list-circle"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeMenuInfoContainer: {
    marginVertical: 15,
    flexDirection: "column",
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 19,
    fontWeight: "bold",
  },
  container: {
    marginVertical: 17,
  },
});
