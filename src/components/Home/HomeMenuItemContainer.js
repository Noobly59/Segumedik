import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import HomeMenuItem from "./HomeMenuItem";

export default function HomeMenuItemContainer(props) {
  const { numberOfActAndInc } = props;
  const navigation = useNavigation();
  const goToSubCon = () => {
    navigation.navigate("SubConNavigation");
  };
  const goToSecAnnPlan = () => {
    navigation.navigate("SecAnnPlanNavigation");
  };
  return (
    <View style={styles.homeMenuInfoContainer}>
      <View style={styles.container}>
        <View style={styles.homeMenuItem}>
          <TouchableWithoutFeedback onPress={goToSubCon}>
            <HomeMenuItem menuItemName="Condición Subestándar"></HomeMenuItem>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.homeMenuItem}>
          <TouchableWithoutFeedback onPress={goToSecAnnPlan}>
            <HomeMenuItem menuItemName="Seguimiento de Plan de Viglancia"></HomeMenuItem>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.homeMenuItem}>
          <TouchableWithoutFeedback onPress={goToSubCon}>
            <HomeMenuItem
              menuItemName={`${numberOfActAndInc[0]} condiciones sub.`}
            ></HomeMenuItem>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.homeMenuItem}>
          <TouchableWithoutFeedback onPress={goToSecAnnPlan}>
            <HomeMenuItem
              menuItemName={`${numberOfActAndInc[1]} act. este mes`}
            ></HomeMenuItem>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeMenuInfoContainer: {
    marginVertical: 12,
  },
  container: {
    paddingHorizontal: 12,
    marginVertical: 5,
    flexDirection: "row",
    alignSelf: "center",
  },
  homeMenuItem: {
    marginHorizontal: 5,
    width: "50%",
  },
});
