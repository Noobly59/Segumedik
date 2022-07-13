import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-rapi-ui";
import HomeMenuItem from "./HomeMenuItem";
import { COLORS } from "../../utils/constants";

export default function HomeMenuItemContainer() {
  const navigation = useNavigation();

  const goToSecAnnPlan = () => {
    navigation.navigate("SecAnnPlanNavigation");
  };

  return (
    <View style={styles.homeMenuInfoContainer}>
      <Text style={styles.text}>
        Seguimiento de Cronograma de Gestión Anual
      </Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={goToSecAnnPlan} activeOpacity={0.5}>
          <HomeMenuItem
            menuItemName="Dar Seguimiento al Cronograma"
            backColor={COLORS.primary}
            icon="list-circle"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeMenuInfoContainer: {
    marginVertical: 12,
    flexDirection: "column",
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
  },
  container: {
    marginVertical: 17,
  },
});
