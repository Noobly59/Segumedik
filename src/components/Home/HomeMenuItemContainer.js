import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
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
        <TouchableWithoutFeedback onPress={goToSecAnnPlan}>
          <HomeMenuItem
            menuItemName="Dar Seguimiento al Plan"
            backColor="#0aa2c0"
            icon="list-circle"
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeMenuInfoContainer: {
    marginVertical: 5,
    flexDirection: "column",
    paddingHorizontal: 12,
  },
  container: {
    marginVertical: 5,
  },
  text: {
    fontWeight: "bold",
  },
});
