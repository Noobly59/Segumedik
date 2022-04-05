import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Text } from "react-native-rapi-ui";
import HomeMenuItem from "./HomeMenuItem";
import HomeMenuNumberItem from "./HomeMenuNumberItem";

export default function HomeSubConSection(props) {
  const { numberOfActAndInc } = props;
  const navigation = useNavigation();

  const goToSubCon = () => {
    navigation.navigate("SubConNavigation");
  };

  const goToAdd = () => {
    navigation.navigate("SubConNavigation", {
      screen: "AddSubstandarCondition",
    });
  };

  return (
    <View style={styles.homeMenuInfoContainer}>
      <Text style={styles.subConText}>Condiciones Subestándar</Text>
      <View style={styles.container}>
        <View style={styles.homeMenuItem}>
          <TouchableWithoutFeedback onPress={goToSubCon}>
            <HomeMenuNumberItem
              menuItemName={numberOfActAndInc[0]}
              backColor="#ffcd39"
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.homeMenuItem}>
          <TouchableWithoutFeedback onPress={goToSubCon}>
            <HomeMenuNumberItem
              menuItemName={numberOfActAndInc[1]}
              backColor="#ffcd39"
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.addSubMenuItem}>
        <TouchableWithoutFeedback onPress={goToAdd}>
          <HomeMenuItem
            menuItemName="Agregar Condición Subestándar"
            backColor="#ffcd39"
            icon="add-circle"
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
    flexDirection: "row",
    alignSelf: "center",
  },
  homeMenuItem: {
    marginHorizontal: 5,
    flex: 1,
  },
  addSubMenuItem: {
    marginHorizontal: 5,
    marginVertical: 3,
  },
  subConText: {
    marginBottom: 7,
    fontWeight: "bold",
  },
});
